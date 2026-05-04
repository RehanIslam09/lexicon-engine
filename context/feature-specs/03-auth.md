# auth.md

Supabase Auth is the identity backbone. Wire it into the Next.js App Router using `@supabase/ssr`. This setup must handle session persistence, PKCE flows, and protect the narrative workspace.

## Design

Custom auth pages must follow the **Cyber-Monolith** aesthetic. Do not use pre-built Supabase UI components.

- **Theme**: Force dark mode. Use `--bg-base` and `--bg-surface`.
- **Layout**:
  - Minimalist centered form on all screen sizes.
  - No hero images. No "Sign up to start your journey" marketing fluff.
  - Border-radius: `rounded-none` on all inputs and buttons.
  - Accent: Focus states and primary buttons use `--accent-primary` (Hazard Orange).
- **Feedback**: Use inline error messages (no toast popups for auth) styled with `--state-error`.

## Implementation

### 1. Client & Server Logic

- Use `utils/supabase/server.ts` for Server Components and Actions.
- Use `utils/supabase/client.ts` for Client Components.
- Use `utils/supabase/middleware.ts` to refresh sessions and protect routes.

### 2. Route Protection

- **Public Routes**: `/login`, `/sign-up`, `/auth/callback`, `/auth/auth-error`.
- **Protected Routes**: `/editor`, `/map`, `/settings`, and all API routes.
- **Root (`/`) Logic**:
  - Authenticated users: Redirect to `/editor`.
  - Unauthenticated users: Redirect to `/login`.

### 3. Auth Flow (PKCE)

- Implement `app/auth/callback/route.ts` to handle the code-to-session exchange.
- **Security**: Always use `supabase.auth.getUser()` in server-side checks, never just `getSession()`.

### 4. User Integration

- Add a custom "User Menu" in the `EditorNavbar` (Right Section).
- Menu items: `Profile Settings`, `Logout`.
- Trigger a full state clear in **Zustand** upon logout to prevent data leakage between sessions.

## Dependencies

- `@supabase/ssr`
- `@supabase/supabase-js`
- `lucide-react` (for icons)

## Check When Done

- [ ] `middleware.ts` exists and correctly handles session refreshes.
- [ ] `/auth/callback` successfully exchanges PKCE codes.
- [ ] Login/Sign-up forms use CSS variables (no hardcoded hex).
- [ ] Attempting to access `/editor` while logged out redirects to `/login`.
- [ ] `npm run build` passes with zero TypeScript errors.

---

### Progress Tracker Update

| Status          | Task                                                     |
| :-------------- | :------------------------------------------------------- |
| **Complete**    | Auth Documentation & Design Strategy (`auth.md`)         |
| **In Progress** | Implementation of Auth Plumbing (`utils/supabase/*`)     |
| **Next Up**     | Creating `app/(auth)/login/page.tsx` (The Monolith Form) |

### Session Note

"We have successfully swapped the Clerk-specific requirements for a robust Supabase SSR implementation. The agent is now instructed to build the UI manually rather than relying on external UI libraries, ensuring the **Lexicon Engine** maintains its brutalist identity."
