create extension if not exists "uuid-ossp";
BEGIN;
create table skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  category text,
  proficiency integer check (proficiency between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_skills_category on skills(category);

create table companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  website text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table roles (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references companies(id) on delete cascade,
  title text not null,
  start_date date not null,
  end_date date,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date)
);
create index idx_roles_start_date on roles(start_date desc);

create table role_skills (
  role_id uuid not null references roles(id) on delete cascade,
  skill_id uuid not null references skills(id) on delete cascade,
  primary key (role_id, skill_id)
);

create table projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  summary text not null,
  description text,
  url text,
  repo_url text,
  start_date date,
  end_date date,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date)
);
create index idx_projects_featured on projects(featured);

create table project_skills (
  project_id uuid not null references projects(id) on delete cascade,
  skill_id uuid not null references skills(id) on delete cascade,
  primary key (project_id, skill_id)
);

create table pages (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
insert into pages (slug, title) values ('home', 'Home');

create table blocks (
  id uuid primary key default uuid_generate_v4(),
  page_id uuid not null references pages(id) on delete cascade,
  type text not null,
  position integer not null,
  config jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_id, position)
);
create index idx_blocks_page_position
on blocks(page_id, position asc);

insert into blocks (page_id, type, position, config)
select
  id,
  unnest(array['hero','skills','projects','experience']),
  generate_series(1,4),
  '{}'::jsonb
from pages
where slug = 'home';

create table profile (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  headline text not null,
  summary text,
  location text,
  email text,
  github_url text,
  linkedin_url text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
insert into profile (
  full_name,
  headline,
  location,
  summary
) values (
  'Your Name',
  'Fullstack Engineer',
  'Lisbon, Portugal',
  'I build scalable web applications with TypeScript, React, Node, and PostgreSQL.'
);

create table profile_links (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profile(id) on delete cascade,
  type text not null, -- 'github', 'linkedin', etc.
  url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  unique (profile_id, type)
);
commit;
