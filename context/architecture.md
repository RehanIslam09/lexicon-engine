# Architecture Context

## Stack

| Layer             | Technology               | Role                                                                                                |
| :---------------- | :----------------------- | :-------------------------------------------------------------------------------------------------- |
| Framework         | Next.js 16 + TypeScript  | App Router, Server/Client component separation, API routes for metadata.                            |
| UI                | Tailwind CSS + shadcn/ui | Utility-first styling, accessible and headless component foundations.                               |
| Editor Core       | TipTap + ProseMirror     | Headless rich-text editing environment handling complex nested nodes.                               |
| Text State        | Yjs + `y-prosemirror`    | CRDT-based operational transformation, handling collaborative and local document state.             |
| Local Persistence | Dexie.js (IndexedDB)     | Primary data layer. Stores Yjs binary updates, manuscript fragments, and relational graphs offline. |
| Cloud Database    | Supabase (PostgreSQL)    | Secondary data layer. Stores user profiles, auth, project metadata, and permission models.          |
| Narrative Map     | React Flow               | Node-based canvas rendering for branching timelines and game logic visualization.                   |
| UI State          | Zustand                  | Global UI state management (sidebar toggles, active themes, selected node IDs).                     |
| Heavy Logic       | Web Workers              | Background thread execution for entity extraction, consistency checking, and search indexing.       |

## System Boundaries

- `src/app/` — Owns routing, layout boundaries, and Server Components for dashboard/settings.
- `src/components/` — Owns presentation. Strictly pure UI components. Contains `ui/` (shadcn) and feature-specific views.
- `src/store/` — Owns Zustand slices. Strictly manages transient UI state.
- `src/lib/yjs/` — Owns CRDT logic. Responsible for binding Yjs documents to TipTap and managing memory fragments.
- `src/lib/dexie/` — Owns the local IndexedDB schema, transaction wrappers, and offline data persistence.
- `src/services/` — Owns pure domain logic (e.g., parsing narrative branches, resolving conflicting timelines).
- `src/workers/` — Owns CPU-intensive background tasks (regex scanning, graph traversal) to keep the main thread unblocked.

## Storage Model

- **IndexedDB (Dexie)**: The **Ground Truth** for the user session. Stores binary Yjs updates, active project schemas, local auto-saves, entity definitions, and the World Bible.
- **PostgreSQL (Supabase)**: The **Metadata Cloud**. Stores user identities, workspace memberships, project IDs, timestamps, subscription tiers, and backup checkpoint indexes.
- **Blob/File Storage (Supabase Storage)**: Stores static assets, user-uploaded cover art, exported `.docx`/`.pdf` manuscripts, and compiled JSON game exports.
- **Memory (Y.Doc)**: The **Runtime State**. Holds only the actively loaded manuscript chapters (via fragments) and active canvas graph.

## Auth and Access Model

- **Authentication**: Managed via Supabase Auth. Supports secure Email/Password and OAuth. Local sessions are cached to allow offline work to continue if the token is valid.
- **Ownership**: Every `Project` has a single, definitive `owner_id`.
- **Local-First Access**: An unauthenticated user can use the app entirely in "Local Mode" (saving strictly to IndexedDB). Upon authentication, local projects can be claimed and synchronized to the cloud.
- **Collaboration (Future)**: Only the `owner_id` or explicitly invited `collaborator_ids` can join the Yjs sync room (Hocuspocus) or mutate cloud metadata.

## Invariants

1. **The Main Thread is Sacred**: Heavy text scanning, entity extraction, and consistency checking must **never** run on the main UI thread. They must execute inside Web Workers.
2. **Separation of State**: React State (Zustand) must **never** store the actual text content of the manuscript. Text is exclusively managed by Yjs.
3. **Local Before Cloud**: Every keystroke or data mutation must be successfully persisted to the local IndexedDB _before_ any attempt is made to synchronize it to Supabase.
4. **Fragmented Loading**: The system must never load an entire 1M+ word manuscript into the editor DOM at once. `Y.Doc` must be structured as a `Y.Map` of chapters, mounting only the active chapter to `TipTap`.
