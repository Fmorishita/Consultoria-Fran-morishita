-- Tabla de solicitudes del formulario de Treu Legal & Business.
--
-- Ejecutar una vez en el editor SQL de Supabase.
-- El sitio escribe con la service role key desde un Route Handler; nunca
-- desde el cliente. Row Level Security queda activo y sin políticas
-- públicas, así que la tabla no es legible con la clave anónima.

create table if not exists public.solicitudes (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),

  -- Campos del formulario. La obligatoriedad replica la del sitio actual.
  nombre text not null,
  empresa text not null,
  cargo text not null,
  correo text not null,
  telefono text not null,
  asunto text not null,
  descripcion text,

  -- Trazabilidad.
  origen text,                      -- ruta desde la que se envió
  consentimiento boolean not null,
  consentimiento_texto text not null, -- copia del texto aceptado, para el expediente
  user_agent text
);

comment on table public.solicitudes is
  'Solicitudes de Strategic Legal Session enviadas desde el sitio.';
comment on column public.solicitudes.consentimiento_texto is
  'Copia literal del aviso de privacidad aceptado en el momento del envío.';

-- Consultas habituales: las más recientes primero.
create index if not exists solicitudes_creado_en_idx
  on public.solicitudes (creado_en desc);

-- Búsqueda por empresa o correo al dar seguimiento.
create index if not exists solicitudes_correo_idx on public.solicitudes (correo);

-- RLS activo y sin políticas: sólo la service role key puede leer y escribir.
alter table public.solicitudes enable row level security;
