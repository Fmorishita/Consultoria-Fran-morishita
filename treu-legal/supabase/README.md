# Supabase

Guarda las solicitudes del formulario del sitio.

## Puesta en marcha

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. Abrir el **SQL Editor** y ejecutar [`solicitudes.sql`](./solicitudes.sql).
3. En **Project Settings → API**, copiar:
   - *Project URL* → variable `NEXT_PUBLIC_SUPABASE_URL`
   - *service_role* secret → variable `SUPABASE_SERVICE_ROLE_KEY`
4. Añadir las dos variables en Vercel (**Settings → Environment Variables**),
   para los entornos Preview y Production.

## Por qué la service role key

La tabla tiene Row Level Security activo y **ninguna política pública**, así
que la clave anónima no puede leerla ni escribirla. El sitio escribe con la
service role key desde un Route Handler
([`app/api/contacto/route.ts`](../app/api/contacto/route.ts)), que se ejecuta
sólo en el servidor. La clave nunca llega al navegador.

## Comportamiento si no está configurada

El endpoint responde `503 storage_unavailable` y el formulario muestra al
usuario las alternativas de contacto (WhatsApp, teléfono y correo) **sin
perder lo que había escrito**. El sitio no se rompe.

## Consultar las solicitudes

Desde el **Table Editor** de Supabase, o con SQL:

```sql
select creado_en, nombre, empresa, cargo, correo, telefono, asunto, origen
from public.solicitudes
order by creado_en desc
limit 50;
```

## Protección de datos

`consentimiento_texto` guarda una copia literal del aviso aceptado en el
momento del envío, que es lo que permite acreditar el consentimiento ante una
solicitud de derechos ARCO.

Conviene definir con el despacho un plazo de conservación y programar el
borrado de las solicitudes que ya no estén en seguimiento.
