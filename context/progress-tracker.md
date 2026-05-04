# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Design System — **COMPLETE** ✓
- Editor Chrome — **COMPLETE** ✓
- Next: Smart Editor Core (TipTap + Yjs)

## Current Goal

- Begin `03-smart-editor` when the spec is created.
- Next step: initialize TipTap + ProseMirror in the `/write` route (Client Component).

## Completed

- [01-design-system] ✅ **Design System Implementation**
  - `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge). Confirmed working.
  - `lucide-react` — installed (v1.14.0). Stroke-based icons, 1.5px width per spec.
  - `components/ui/button.tsx` — shadcn Button, installed.
  - `components/ui/card.tsx` — shadcn Card, installed.
  - `components/ui/dialog.tsx` — shadcn Dialog, installed.
  - `components/ui/input.tsx` — shadcn Input, installed.
  - `components/ui/tabs.tsx` — shadcn Tabs, installed.
  - `components/ui/textarea.tsx` — shadcn Textarea, installed.
  - `components/ui/scroll-area.tsx` — shadcn ScrollArea, installed.
  - `app/globals.css` — Full **Cyber-Monolith** dark theme applied:
    - All shadcn semantic tokens (`--background`, `--primary`, `--accent`, etc.) remapped to Cyber-Monolith values.
    - `--radius: 0px` enforces zero border-radius across all shadcn components without touching their source files.
    - Brand tokens defined: `--bg-base`, `--bg-surface`, `--text-primary`, `--text-muted`, `--accent-primary` (`#FF4D00`), `--accent-muted`, `--border-default`, `--state-error`, `--state-success`.
    - `color-scheme: dark` forced — no light mode exists.
    - Custom scrollbars, selection highlight, and utility classes added.
  - `npm run build` — ✅ passes with zero TypeScript errors.
  - `npx tsc --noEmit` — ✅ zero errors.

- [02-editor] ✅ **Editor Chrome Implementation**
  - `zustand` — installed. `persist` middleware wired for localStorage survival across refresh.
  - `store/ui-store.ts` — Zustand slice (`sidebarOpen`, `setSidebarOpen`, `toggleSidebar`) with `persist` middleware. Key: `lexicon-ui-state`.
  - `components/editor/editor-navbar.tsx` — Fixed `h-12` navbar, `z-50`, `bg-[--bg-surface]`, 1px brutalist bottom border. Sidebar toggle uses `PanelLeftOpen`/`PanelLeftClose` icons (Lucide, `1.5px` stroke). Reads/writes Zustand directly.
  - `components/editor/project-sidebar.tsx` — Overlay sidebar (`w-72`, `z-50`, `top-12`). Slides via `translateX` (GPU-accelerated, zero reflow). Backdrop at `z-40`. shadcn `Tabs` with "My Projects" / "Shared" tabs, Hazard Orange active indicator. Empty placeholder states in both tabs. Full-width "New Project" button with `Plus` icon at footer.
  - `app/write/page.tsx` — `/write` Client Component shell. Wires `EditorNavbar` + `ProjectSidebar`. Editor canvas placeholder ready for TipTap.
  - `npx tsc --noEmit` — ✅ zero errors.
  - `npm run build` — ✅ clean. Route `/write` appears in build output.

## In Progress

- None.

## Next Up

- [03-smart-editor] Smart Editor Core:
  - TipTap + ProseMirror setup in `/write` route (Client Component).
  - Yjs CRDT binding via `y-prosemirror`.
  - Fragmented chapter loading (`Y.Map` of chapters, only active chapter mounted).
  - Local persistence via Dexie.js (binary `Uint8Array` Yjs updates in IndexedDB).

## Open Questions

- Tailwind CSS v4 compatibility with shadcn/ui CLI — **Resolved**. shadcn v4.6.0 + Tailwind v4 work together via `@import "shadcn/tailwind.css"`.
- Zero border-radius strategy — **Resolved**. Achieved via `--radius: 0px` CSS variable and `border-radius: 0 !important` in `@layer base`, keeping `components/ui/*` files unmodified per workflow rules.

## Architecture Decisions

- **Cyber-Monolith Theme**: Strictly dark mode, zero border radius, hazard orange accents (`#FF4D00`). Applied entirely via CSS variables in `globals.css`. Hardcoded hex values are forbidden in component files.
- **Local-First CSS**: All colors reference CSS custom properties. Tailwind `@theme inline` block bridges CSS vars to Tailwind utility classes.
- **Protected UI Files**: `components/ui/*` are left unmodified after shadcn CLI generation. Theme overrides are applied globally through `globals.css` variables.

## Session Notes (2026-05-04)

- Design system spec `01-design-system.md` fully implemented and verified.
- All 7 shadcn components import cleanly; `cn()` works correctly.
- No default light styling — `globals.css` forces dark mode exclusively.
- Build is clean: `next build` succeeds, TypeScript strict mode passes.
- Editor chrome spec `02-editor.md` fully implemented and verified.
- `zustand` installed. Sidebar state persists to `localStorage` across page refresh.
- Sidebar uses `translateX` — GPU-accelerated, no DOM reflow on toggle.
- `/write` route registered; appears in `next build` output as static route.
- `npx tsc --noEmit` — zero errors. `npm run build` — clean.
