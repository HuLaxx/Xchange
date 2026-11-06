-- One private thread per accepted purchase/swap request. Never public.
create table public.messages (
 id uuid primary key default gen_random_uuid(),
 request_id uuid not null references public.requests(id) on delete cascade,
 sender_id uuid not null references public.profiles(id) on delete cascade,
 body text not null check(char_length(btrim(body)) between 1 and 1200),
 created_at timestamptz not null default now()
);
create index messages_request_date_idx on public.messages(request_id,created_at,id);
alter table public.messages enable row level security;
create policy "participants see accepted request chat" on public.messages for select to authenticated
using (exists(
 select 1 from public.requests r where r.id=messages.request_id and r.status='accepted'
 and (r.buyer_id=auth.uid() or r.seller_id=auth.uid())
));
create policy "participants message accepted requests" on public.messages for insert to authenticated
with check (
 sender_id=auth.uid()
 and exists(select 1 from public.requests r where r.id=messages.request_id and r.status='accepted'
 and (r.buyer_id=auth.uid() or r.seller_id=auth.uid()))
);
