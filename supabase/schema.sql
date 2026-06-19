-- QueueGo Database Schema
-- Run this in: Supabase Dashboard > SQL Editor

-- =====================
-- TABLES
-- =====================

create table places (
  id         uuid default gen_random_uuid() primary key,
  name       text not null,
  category   text not null,
  emoji      text,
  rating     numeric(2,1) default 4.0,
  created_at timestamptz default now()
);

create table queue_reports (
  id         uuid default gen_random_uuid() primary key,
  place_id   uuid references places(id) on delete cascade not null,
  user_id    uuid references auth.users(id) on delete cascade not null,
  level      text check (level in ('low', 'medium', 'high')) not null,
  notes      text,
  created_at timestamptz default now()
);

create table favorites (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  place_id   uuid references places(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, place_id)
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

alter table places       enable row level security;
alter table queue_reports enable row level security;
alter table favorites    enable row level security;

-- Places: anyone can read
create policy "places_public_read"
  on places for select using (true);

-- Queue reports: anyone can read, only authenticated users can insert their own
create policy "reports_public_read"
  on queue_reports for select using (true);

create policy "reports_auth_insert"
  on queue_reports for insert
  with check (auth.uid() = user_id);

-- Favorites: users can only read/write their own
create policy "favorites_owner_all"
  on favorites for all
  using (auth.uid() = user_id);

-- =====================
-- SEED DATA
-- =====================

insert into places (name, category, emoji, rating) values
  ('משרד הפנים - תל אביב',         'Government',  '🏛️', 3.2),
  ('ביטוח לאומי - תל אביב',        'Government',  '🏢', 3.5),
  ('מס הכנסה - רמת גן',            'Government',  '🏦', 3.8),
  ('מרפאת כללית - דיזנגוף',        'Health',      '🏥', 4.2),
  ('מרפאת מכבי - תל אביב',         'Health',      '⚕️', 4.0),
  ('בית חולים איכילוב',            'Health',      '🏨', 4.5),
  ('דואר ישראל - תל אביב מרכז',   'Post Office', '📮', 3.6),
  ('דואר ישראל - גבעתיים',         'Post Office', '📮', 3.9),
  ('רשות הרישוי - תל אביב',        'DMV',         '🚗', 2.8),
  ('בנק הפועלים - דיזנגוף',        'Banks',       '🏦', 4.1),
  ('בנק לאומי - אבן גבירול',       'Banks',       '💳', 4.0),
  ('ספריית שרת - תל אביב',         'Education',   '📚', 4.8);

-- =====================
-- REALTIME
-- =====================

-- Enable realtime for queue_reports (in Supabase Dashboard > Database > Replication)
-- Add "queue_reports" table to the replication publication
