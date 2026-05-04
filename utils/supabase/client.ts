/**
 * utils/supabase/client.ts
 * Supabase client for use in Client Components ("use client").
 * Creates a singleton browser client per the @supabase/ssr pattern.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
