"use client";

/**
 * app/(auth)/auth-error/page.tsx
 * Shown when the PKCE callback exchange fails or auth flow is interrupted.
 * Provides a clear error description and a path back to login.
 */

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ShieldAlert } from "lucide-react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const rawError = searchParams.get("error");

  // Map known error codes to human-readable messages
  const errorMessages: Record<string, string> = {
    auth_code_exchange_failed:
      "The confirmation link has expired or was already used. Please sign in again to request a new one.",
  };

  const message =
    (rawError && errorMessages[rawError]) ??
    "An unexpected authentication error occurred. Please try again.";

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-4 border border-[--state-error] bg-[--bg-surface] px-4 py-5">
        <div className="flex items-center gap-2">
          <ShieldAlert
            className="h-5 w-5 text-[--state-error]"
            strokeWidth={1.5}
          />
          <p className="text-sm font-semibold text-[--text-primary]">
            Authentication failed
          </p>
        </div>
        <p className="text-xs text-[--text-muted] leading-relaxed">{message}</p>
      </div>
      <p className="mt-4 text-xs text-[--text-muted]">
        <Link
          href="/login"
          className="text-[--accent-primary] underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Back to sign in
        </Link>
      </p>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorContent />
    </Suspense>
  );
}
