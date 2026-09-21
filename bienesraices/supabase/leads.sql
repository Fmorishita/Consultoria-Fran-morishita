-- ============================================================
-- Fran Morishita · Bienes raíces — tabla de leads
-- Ejecutar en el SQL Editor del proyecto de Supabase.
-- ============================================================

create table if not exists public.leads_bienes_raices (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Contacto
  nombre        text not null,
  telefono      text not null,
  email         text not null,
  interes       text,
  mensaje       text,

  -- Contexto de la conversión
  proyecto_slug text,
  idioma        text,
  origen        text,
  event_id      text,

  -- Atribución de pauta
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  utm_content    text,
  utm_term       text,
  fbclid         text,
  gclid          text,
  landing        text,
  primer_contacto text
);

create index if not exists leads_br_created_at_idx on public.leads_bienes_raices (created_at desc);
create index if not exists leads_br_proyecto_idx   on public.leads_bienes_raices (proyecto_slug);
create index if not exists leads_br_campana_idx    on public.leads_bienes_raices (utm_campaign);

-- El sitio usa la llave publicable: solo debe poder insertar.
alter table public.leads_bienes_raices enable row level security;

drop policy if exists "sitio puede insertar leads" on public.leads_bienes_raices;
create policy "sitio puede insertar leads"
  on public.leads_bienes_raices for insert to anon
  with check (true);

-- A propósito no se crea policy de SELECT: los leads se leen desde el
-- dashboard de Supabase (Table Editor) o con la llave de servicio.
