-- ============================================================
-- Punta Mita Homes — tabla de leads
-- Ejecutar en el SQL Editor del proyecto de Supabase.
-- ============================================================

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  -- Contacto
  nombre       text,
  email        text,
  telefono     text,
  pais         text,
  notas        text,

  -- Respuestas del calificador
  objetivo     text,
  zonas        text,
  tipo         text,
  presupuesto  text,
  tiempo       text,
  pago         text,
  conoce_zona  text,
  propiedad    text,   -- id de la ficha desde la que envió, si aplica

  -- Calificación automática
  score        integer,
  tier         text,   -- A = prioritario, B = seguimiento, C = nutrir

  -- Contexto
  idioma       text,
  origen       text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  utm_term     text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_tier_idx       on public.leads (tier);

-- El sitio es público: la llave publicable SOLO debe poder insertar.
-- Los leads se leen desde el dashboard de Supabase (Table Editor → leads).
alter table public.leads enable row level security;

drop policy if exists "sitio puede insertar leads" on public.leads;
create policy "sitio puede insertar leads"
  on public.leads for insert to anon
  with check (true);

-- Nota: no se crea ninguna policy de SELECT a propósito.
-- Sin ella, la llave publicable no puede leer la tabla.
