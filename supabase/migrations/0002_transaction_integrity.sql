-- Harden accepted swaps: reserve BOTH physical copies atomically and permit
-- requesters to view books they have requested after a seller reserves them.
drop policy if exists "public listings" on public.listings;
create policy "public listings" on public.listings for select
using (
 status='active'
 or seller_id=auth.uid()
 or exists(select 1 from public.requests r where r.listing_id=listings.id and r.buyer_id=auth.uid())
);

-- Existing Supabase Auth users need profiles if migration 0001 is added late.
insert into public.profiles (id, display_name)
select id, left(coalesce(nullif(raw_user_meta_data ->> 'display_name',''),split_part(coalesce(email,'Reader'),'@',1)),60)
from auth.users
on conflict (id) do nothing;

create or replace function public.respond_to_request(p_request_id uuid,p_accept boolean)
returns void language plpgsql security definer set search_path=public as $$
declare target public.requests%rowtype;
begin
 select * into target from public.requests where id=p_request_id for update;
 if not found or target.seller_id<>auth.uid() or target.status<>'pending' then
  raise exception 'Request unavailable or not authorized';
 end if;
 if p_accept then
  -- Lock in stable ID order to avoid conflicting cross-swap acceptances.
  perform id from public.listings
    where id=target.listing_id or (target.kind='swap' and id=target.offered_listing_id)
    order by id for update;
  update public.listings set status='reserved',updated_at=now()
   where id=target.listing_id and seller_id=target.seller_id and status='active';
  if not found then raise exception 'Requested book no longer available'; end if;
  if target.kind='swap' then
   update public.listings set status='reserved',updated_at=now()
    where id=target.offered_listing_id and seller_id=target.buyer_id and status='active';
   if not found then raise exception 'Exchange book no longer available'; end if;
  end if;
 end if;
 update public.requests set status=case when p_accept then 'accepted' else 'declined' end
  where id=p_request_id;
 if p_accept then
  update public.requests set status='declined'
   where listing_id in (target.listing_id,target.offered_listing_id)
   and id<>p_request_id and status='pending';
 end if;
end;
$$;
revoke all on function public.respond_to_request(uuid,boolean) from public,anon;
grant execute on function public.respond_to_request(uuid,boolean) to authenticated;
