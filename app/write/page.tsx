/**
 * /write — Editor canvas
 *
 * Chrome (Navbar + Sidebar) is inherited from app/write/layout.tsx.
 * This page owns only the canvas content area.
 * TipTap editor will be mounted here in the next spec (03-smart-editor).
 */

export default function WritePage() {
  return (
    <main className="flex h-full items-center justify-center">
      <p className="text-[--text-muted] text-sm tracking-widest uppercase">
        Editor canvas — coming next
      </p>
    </main>
  );
}
