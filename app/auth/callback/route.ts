/**
 * app/auth/callback/route.ts
 * PKCE code-to-session exchange handler.
 * Supabase redirects here after the user clicks the email confirmation link.
 * The `code` query param is exchanged for a real session via the auth server.
 */
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // `next` is an optional redirect param — defaults to /editor after login
  const next = searchParams.get("next") ?? "/editor";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // Local dev: redirect using the same origin
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // Production behind a proxy: respect the forwarded host
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Exchange failed — redirect to the error page
  return NextResponse.redirect(
    `${origin}/auth/auth-error?error=auth_code_exchange_failed`
  );
}
