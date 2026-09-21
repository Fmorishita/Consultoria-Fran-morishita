import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase para guardar leads.
 * Usa la llave publicable: la tabla tiene RLS y solo permite INSERT.
 * Los leads se leen desde el dashboard de Supabase.
 */
let cliente: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const llave = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !llave) return null;
  cliente ??= createClient(url, llave, { auth: { persistSession: false } });
  return cliente;
}

export const TABLA_LEADS = process.env.SUPABASE_TABLA_LEADS ?? "leads_bienes_raices";
