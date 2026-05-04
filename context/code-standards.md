This is the final structural pillar. Since **Lexicon Engine** relies on complex data synchronization (CRDTs) and high-performance rendering, these standards ensure the code remains predictable and "Zero Lag."

---

# Code Standards: Lexicon Engine

## General

- **Modular Logic:** Keep business logic (story branching, character links) outside of React components. Use pure TypeScript classes or functions.
- **Fail Fast:** Validate data at the edge of the system (e.g., when loading from IndexedDB).
- **No Side Effects in Render:** Components should be pure projections of state. All data mutations must happen via Zustand actions or Yjs transactions.
- **Deterministic naming:** Use clear, narrative-focused naming (e.g., `SceneNode`, `EntityLink`, `ManuscriptFragment`) rather than generic terms like `DataContainer`.

## TypeScript

- **Strict Mode:** Required. No `any` types allowed.
- **Zod for Boundaries:** Use Zod to schema-validate every object coming from `IndexedDB` or `Supabase`.
- **Discriminated Unions:** Use for complex states (e.g., a node on the canvas can be `type: 'SCENE' | 'CHOICE' | 'NOTE'`).
- **Opaque IDs:** Use strong typing for IDs (`ProjectId`, `ChapterId`) to prevent passing a Chapter ID into a Project function.

## Next.js (App Router)

- **Server by Default:** Use Server Components for the Dashboard, Project List, and Settings.
- **Client for Performance:** The Editor (`/write`) and Canvas (`/map`) are Client Components to handle local-first state.
- **Lean Actions:** Server Actions should only handle metadata and auth. They must never handle the real-time prose stream.

## Styling

- **Utility First:** Use Tailwind CSS exclusively.
- **Design System:** Use `shadcn/ui` variables for colors (`--primary`, `--accent`) and spacing. Hardcoded hex values are forbidden.
- **Accessibility:** High contrast and variable font sizes are mandatory for a writing tool.

## API Routes & Sync

- **Metadata Only:** API routes handle "Who owns this project?" and "Is the user subscribed?"
- **Ownership Verification:** Every Supabase call must verify the `user_id` matches the `project_owner`.
- **Stateless Logic:** Do not store session data in memory on the server.

## Data and Storage (The Local-First Rule)

- **Local is Primary:** The "Ground Truth" for the user is the **Y.Doc** in memory and **Dexie** on disk.
- **Binary storage:** Store Yjs update fragments as `Uint8Array` in IndexedDB for maximum speed.
- **No Large Blobs in SQL:** Postgres (Supabase) stores metadata and snapshots; raw manuscript history stays in binary Yjs storage.

## File Organization

- `src/app/` — Next.js App Router (Pages and Layouts).
- `src/components/` — React UI components (shadcn/ui + custom).
- `src/hooks/` — Custom hooks for local-first sync (`useEditor`, `useMap`).
- `src/lib/` — Third-party configurations (Supabase client, Dexie setup).
- `src/services/` — Pure TS logic (Branching logic, Consistency checker).
- `src/workers/` — Web Workers for background text analysis.
- `src/store/` — Zustand state slices.
- `src/types/` — Shared TypeScript interfaces and Zod schemas.

---

### The Foundation is Complete.

We have mapped the tech, the architecture, the project scope, the workflow, and the code standards.
