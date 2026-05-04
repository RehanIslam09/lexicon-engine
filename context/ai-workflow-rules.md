# AI Workflow Rules: Lexicon Engine

## Approach

Build this project using a **Spec-Driven, Local-First priority workflow**. Every implementation must prioritize the **Client-Side Data Integrity** before considering cloud sync. Context files (Architecture, Schema, and Progress Tracker) are the "Source of Truth." Implementation must follow the "Deterministic Logic" principle: functionality is derived from clear data relationships, never from probabilistic inference (AI).

## Scoping Rules

- **One State Layer at a Time:** Work on UI (Zustand), Text (Yjs), or Persistence (Dexie) in isolation.
- **Verification First:** Every increment must be verified by a "Stress Test" (e.g., ensuring a feature works with a 10k-word paragraph before moving on).
- **No Shadow Logic:** Do not hide data processing in UI components; move heavy logic strictly to Web Workers or dedicated utility classes.

## When to Split Work

Split an implementation step if it combines:

- **Editor UI and CRDT Logic:** Separation between TipTap extensions and Yjs sync logic is mandatory.
- **Canvas Rendering and Data Schema:** Defining a node’s visual look is separate from defining its relational data in Dexie.
- **Local Persistence and Cloud Sync:** Get it working in IndexedDB perfectly before touching Supabase sync.
- **Prose Logic and Heavy Scanning:** UI updates for typing are separate from Web Worker background scanning.

## Handling Missing Requirements

- **Ambiguity Rule:** If the relationship between an "Entity" (Character) and "Prose" (Text) is unclear, stop and update `schema.md` first.
- **Open Questions:** Log any performance concerns regarding large-document handling as "Open Questions" in `progress-tracker.md`.
- **Slop Prevention:** If a proposed feature feels like "AI Slop" or replaces user intent with automation, it must be flagged and rejected.

## Protected Files

Do not modify the following unless explicitly instructed:

- `components/ui/*`: These are core **shadcn/ui** components.
- `lib/yjs-internal/*`: Core CRDT sync logic.
- `node_modules/*`: Third-party internals.
- `.lucide/*`: Icon library definitions.

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- **`architecture.md`**: If a new Web Worker or service is added.
- **`schema.md`**: If a new property is added to Characters, Scenes, or Projects.
- **`progress-tracker.md`**: This must be updated at the end of every successful feature unit.

## Before Moving to the Next Unit

1. **The "Snappiness" Test:** Typing remains at 60fps in the editor.
2. **The "Persistence" Test:** Page refresh retains 100% of the state from IndexedDB.
3. **The "Build" Test:** `npm run build` passes with zero TypeScript errors.
4. **Documentation:** The `progress-tracker.md` is updated and the "Current State" is summarized for the next session.

---

### We are grounded.
