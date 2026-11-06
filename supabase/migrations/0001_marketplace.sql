-- Run in your Supabase project's SQL editor; no service-role key in frontend.
create extension if not exists pgcrypto;
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default 'Reader' check (char_length(display_name) between 1 and 60),
 city text not null default '' check (char_length(city)<=80),
 created_at timestamptz not null default now()
);
create or replace function public.on_user_created() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,display_name)
 values(new.id,left(coalesce(nullif(new.raw_user_meta_data ->> 'display_name',''),split_part(coalesce(new.email,'Reader'),'@',1)),60))
 on conflict(id) do nothing;
 return new;
end;
$$;
create trigger create_reader_profile after insert on auth.users for each row execute function public.on_user_created();
create table public.listings (
 id uuid primary key default gen_random_uuid(),
 seller_id uuid not null references public.profiles(id) on delete cascade,
 title text not null check (char_length(title) between 3 and 120),
 author text not null check (char_length(author) between 2 and 100),
 isbn text check (isbn is null or char_length(isbn)<=20),
 description text not null default '' check (char_length(description)<=1500),
 category text not null check (category in ('Fiction','Non-fiction','Academic','Self-help','Comics','Other')),
 condition text not null check (condition in ('Like new','Good','Fair')),
 price integer not null check (price between 0 and 100000),
 city text not null check (char_length(city) between 2 and 80),
 delivery_mode text not null default 'shipping' check (delivery_mode in ('shipping','pickup','both')),
 image_url text,
 status text not null default 'active' check (status in ('active','reserved','sold')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index listings_active_date_idx on public.listings(status,created_at desc);
create index listings_seller_idx on public.listings(seller_id,created_at desc);
create table public.requests (
 id uuid primary key default gen_random_uuid(),
 listing_id uuid not null references public.listings(id) on delete cascade,
 buyer_id uuid not null references public.profiles(id) on delete cascade,
 seller_id uuid not null references public.profiles(id) on delete cascade,
 offered_listing_id uuid references public.listings(id) on delete set null,
 kind text not null check(kind in ('buy','swap')),
 status text not null default 'pending' check(status in ('pending','accepted','declined','cancelled')),
 note text not null default '' check (char_length(note)<=500),
 created_at timestamptz not null default now(),
 constraint distinct_trade_participants check(buyer_id<>seller_id)
);
create index requests_seller_idx on public.requests(seller_id,created_at desc);
create index requests_buyer_idx on public.requests(buyer_id,created_at desc);
create unique index unique_pending_intent on public.requests(buyer_id,listing_id,kind) where status='pending';
create table public.favorites (
 user_id uuid not null references public.profiles(id) on delete cascade,
 listing_id uuid not null references public.listings(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(user_id,listing_id)
);
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.requests enable row level security;
alter table public.favorites enable row level security;
create policy "authenticated readers can see profile names" on public.profiles for select to authenticated using(true);
create policy "users can edit their own profiles" on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
create policy "public listings" on public.listings for select using(status='active' or seller_id=auth.uid());
create policy "create own listings" on public.listings for insert to authenticated with check(seller_id=auth.uid());
create policy "edit own listings" on public.listings for update to authenticated using(seller_id=auth.uid()) with check(seller_id=auth.uid());
create policy "delete own listings" on public.listings for delete to authenticated using(seller_id=auth.uid());
create policy "participants read requests" on public.requests for select to authenticated using(buyer_id=auth.uid() or seller_id=auth.uid());
create policy "buyers create requests" on public.requests for insert to authenticated with check(buyer_id=auth.uid() and buyer_id<>seller_id and status='pending');
create policy "read own favorites" on public.favorites for select to authenticated using(user_id=auth.uid());
create policy "save favorites" on public.favorites for insert to authenticated with check(user_id=auth.uid());
create policy "unsave favorites" on public.favorites for delete to authenticated using(user_id=auth.uid());
-- Trust the database listing's seller, not user-supplied seller_id.
create or replace function public.validate_book_request() returns trigger language plpgsql security definer set search_path=public as $$
declare target record;
begin
 select seller_id,status into target from public.listings where id=new.listing_id;
 if not found or target.status<>'active' then raise exception 'Book unavailable'; end if;
 new.seller_id:=target.seller_id;
 if new.buyer_id<>auth.uid() or new.buyer_id=new.seller_id then raise exception 'Invalid buyer'; end if;
 if new.kind='swap' then
  if new.offered_listing_id is null or not exists(
   select 1 from public.listings where id=new.offered_listing_id and seller_id=new.buyer_id and status='active'
  ) then raise exception 'Swap requires an active book you own'; end if;
 elsif new.offered_listing_id is not null then raise exception 'Purchase cannot include a swap book';
 end if;
 return new;
end;
$$;
create trigger validate_intent before insert on public.requests for each row execute function public.validate_book_request();
-- Requests cannot be manually accepted by a client; use transactional RPC.
create or replace function public.respond_to_request(p_request_id uuid,p_accept boolean)
returns void language plpgsql security definer set search_path=public as $$
declare target public.requests%rowtype;
begin
 select * into target from public.requests where id=p_request_id for update;
 if not found or target.seller_id<>auth.uid() or target.status<>'pending' then
  raise exception 'Request unavailable or not authorized';
 end if;
 if p_accept then
  update public.listings set status='reserved',updated_at=now()
  where id=target.listing_id and seller_id=auth.uid() and status='active';
  if not found then raise exception 'Listing unavailable'; end if;
 end if;
 update public.requests set status=case when p_accept then 'accepted' else 'declined' end where id=p_request_id;
 if p_accept then update public.requests set status='declined'
  where listing_id=target.listing_id and id<>p_request_id and status='pending'; end if;
end;
$$;
revoke all on function public.respond_to_request(uuid,boolean) from public,anon;
grant execute on function public.respond_to_request(uuid,boolean) to authenticated;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('book-covers','book-covers',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
create policy "public cover reads" on storage.objects for select using(bucket_id='book-covers');
create policy "users upload own covers" on storage.objects for insert to authenticated
 with check(bucket_id='book-covers' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "users delete own covers" on storage.objects for delete to authenticated
 using(bucket_id='book-covers' and (storage.foldername(name))[1]=auth.uid()::text);
