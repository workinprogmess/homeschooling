-- supabase schema for mira's books
-- run this in supabase sql editor to set up the tables

-- books table - main collection
create table if not exists books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author text,
  isbn text,
  cover_url text,

  -- status: current_favorite, currently_reading, outgrown, classic, other
  status text default 'other',

  -- reading stats
  read_count integer default 0,

  -- mira's name for the book (e.g., "apple go", "kevin")
  mira_name text,

  -- notes about the book
  notes text,

  -- is this a recommendation (not owned yet)?
  is_recommendation boolean default false,

  -- for recommendations: yay (want it), nay (don't want), null (undecided)
  recommendation_status text, -- 'yay', 'nay', null

  -- notes about why we want/don't want this recommendation
  recommendation_notes text,

  -- series name if part of a series
  series text,

  -- tags for filtering
  tags text[], -- e.g., ['interactive', 'nature', 'lifecycle']

  -- timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- index for common queries
create index if not exists books_status_idx on books(status);
create index if not exists books_is_recommendation_idx on books(is_recommendation);

-- function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- trigger to auto-update updated_at
drop trigger if exists update_books_updated_at on books;
create trigger update_books_updated_at
  before update on books
  for each row
  execute function update_updated_at_column();

-- enable row level security (optional, for public access)
-- alter table books enable row level security;
-- create policy "allow all" on books for all using (true);
