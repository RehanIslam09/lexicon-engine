/**
 * app/page.tsx — Root route
 * Middleware handles the primary redirect (/ → /editor or /login).
 * This server component is a final fallback that should rarely render.
 */
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function RootPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/editor");
  } else {
    redirect("/login");
  }
}
