/**
 * app/(auth)/layout.tsx
 * Shared layout for all public auth routes: /login, /sign-up, /auth-error.
 * Minimalist centered container — no navbar, no chrome, just the form.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[--bg-base] px-4">
      {children}
    </div>
  );
}
