-- SQL Schema Migration for RA Fragrance Supabase Database

-- 1. Create perfumes table
create table if not exists public.perfumes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null check (category in ('Unisex', 'For Him', 'For Her')),
  tagline text,
  top_notes text,
  heart_notes text,
  base_notes text,
  image_url text not null,
  badge text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.perfumes enable row level security;

-- 3. Allow public read access to perfumes
create policy "Allow public read access to perfumes"
  on public.perfumes for select
  using (true);

-- 4. Allow authenticated/all write access for Admin dashboard
create policy "Allow insert access to perfumes"
  on public.perfumes for insert
  with check (true);

create policy "Allow update access to perfumes"
  on public.perfumes for update
  using (true);

create policy "Allow delete access to perfumes"
  on public.perfumes for delete
  using (true);
