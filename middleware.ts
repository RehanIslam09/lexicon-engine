/**
 * middleware.ts — Root Next.js Middleware
 *
 * Responsibilities:
 * 1. Refresh the Supabase session on every request.
 * 2. Enforce route protection:
 *    - Public:    /login, /sign-up, /auth/callback, /auth/auth-error
 *    - Protected: /editor, /map, /settings, all API routes → redirect to /login
 *    - Root (/):  Authenticated → /editor | Unauthenticated → /login
 */
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

/** Routes that do NOT require authentication */
const PUBLIC_ROUTES = ["/login", "/sign-up", "/auth/callback", "/auth/auth-error"];

/** Prefixes that require authentication */
const PROTECTED_PREFIXES = ["/editor", "/map", "/settings", "/write", "/api"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Refresh the session and retrieve the verified user
  const { supabaseResponse, user } = await updateSession(request);

  const isAuthenticated = !!user;
  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r));
  const isProtectedRoute = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  // 2. Root route: smart redirect based on auth state
  if (pathname === "/") {
    const destination = isAuthenticated ? "/editor" : "/login";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // 3. Protected route and unauthenticated: redirect to /login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Public auth route and already authenticated: redirect to /editor
  if (isPublicRoute && isAuthenticated && pathname !== "/auth/callback") {
    return NextResponse.redirect(new URL("/editor", request.url));
  }

  // 5. Pass through — always return supabaseResponse to keep cookies intact
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT static files and Next.js internals.
     * This ensures session refresh runs on every page navigation.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
