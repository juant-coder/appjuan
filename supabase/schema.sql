-- =====================================================================
-- Grana+ | Schema de autenticação e progresso
-- Rode este arquivo inteiro no Supabase > SQL Editor > New query
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. PROFILES — dados públicos do usuário (1:1 com auth.users)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  nome       text,
  avatar     text default '🤑',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using ( (select auth.uid()) = id );

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using ( (select auth.uid()) = id )
  with check ( (select auth.uid()) = id );

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check ( (select auth.uid()) = id );

-- ---------------------------------------------------------------------
-- 2. TRIGGER — cria o profile automaticamente a cada novo cadastro
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nome)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nome', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- 3. USER_PROGRESS — progresso da trilha sincronizado na nuvem
-- ---------------------------------------------------------------------
create table if not exists public.user_progress (
  user_id          uuid primary key references auth.users(id) on delete cascade,
  xp               integer     not null default 0,
  streak           integer     not null default 0,
  last_active_date date,
  hearts           integer     not null default 5,
  hearts_updated_at timestamptz,
  progress         jsonb       not null default '{}'::jsonb,
  badges           jsonb       not null default '[]'::jsonb,
  history          jsonb       not null default '[]'::jsonb,
  focus            jsonb       not null default '[]'::jsonb,
  unlocked_up_to   integer     not null default 0,
  onboarded        boolean     not null default false,
  updated_at       timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "progress_select_own" on public.user_progress;
create policy "progress_select_own"
  on public.user_progress for select
  using ( (select auth.uid()) = user_id );

drop policy if exists "progress_insert_own" on public.user_progress;
create policy "progress_insert_own"
  on public.user_progress for insert
  with check ( (select auth.uid()) = user_id );

drop policy if exists "progress_update_own" on public.user_progress;
create policy "progress_update_own"
  on public.user_progress for update
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

-- ---------------------------------------------------------------------
-- 4. ANALYTICS_EVENTS — eventos usados por lib/analytics.ts
-- ---------------------------------------------------------------------
create table if not exists public.analytics_events (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  event_name text not null,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_user_idx
  on public.analytics_events (user_id, created_at desc);

alter table public.analytics_events enable row level security;

drop policy if exists "analytics_insert_own" on public.analytics_events;
create policy "analytics_insert_own"
  on public.analytics_events for insert
  with check ( (select auth.uid()) = user_id );

drop policy if exists "analytics_select_own" on public.analytics_events;
create policy "analytics_select_own"
  on public.analytics_events for select
  using ( (select auth.uid()) = user_id );

-- ---------------------------------------------------------------------
-- 5. updated_at automático
-- ---------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists user_progress_touch on public.user_progress;
create trigger user_progress_touch
  before update on public.user_progress
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- 6. FEEDBACK — feedback enviado dentro do app, vinculado ao usuário
-- ---------------------------------------------------------------------
create table if not exists public.feedback (
  id                  bigint generated always as identity primary key,
  user_id             uuid not null references auth.users(id) on delete cascade,
  email               text,
  nome                text,
  nota                smallint check (nota between 1 and 5),
  mensagem            text not null check (char_length(trim(mensagem)) >= 3),
  contexto            text not null default 'perfil',
  missoes_concluidas  integer not null default 0,
  xp                  integer not null default 0,
  created_at          timestamptz not null default now()
);

create index if not exists feedback_created_idx
  on public.feedback (created_at desc);

create index if not exists feedback_user_idx
  on public.feedback (user_id, created_at desc);

alter table public.feedback enable row level security;

drop policy if exists "feedback_insert_own" on public.feedback;
create policy "feedback_insert_own"
  on public.feedback for insert
  with check ( (select auth.uid()) = user_id );

drop policy if exists "feedback_select_own" on public.feedback;
create policy "feedback_select_own"
  on public.feedback for select
  using ( (select auth.uid()) = user_id );

-- Visão pronta para você ler no Supabase (Table Editor / SQL Editor).
-- Como você acessa pelo dashboard (service role), a RLS não te bloqueia.
create or replace view public.feedback_com_usuario as
select
  f.id,
  f.created_at,
  f.nome,
  coalesce(f.email, u.email) as email,
  f.nota,
  f.mensagem,
  f.contexto,
  f.missoes_concluidas,
  f.xp
from public.feedback f
left join auth.users u on u.id = f.user_id
order by f.created_at desc;
