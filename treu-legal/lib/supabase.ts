import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente de Supabase para el servidor.
 *
 * Guarda las solicitudes del formulario. Se usa la service role key y sólo
 * desde Route Handlers: nunca se expone al cliente. Si las variables no están
 * configuradas, devuelve null y el endpoint lo reporta como no disponible en
 * lugar de romperse.
 */
let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    cached = null;
    return null;
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const SOLICITUDES_TABLE = 'solicitudes';
