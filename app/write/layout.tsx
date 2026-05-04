"use client";

/**
 * app/write/layout.tsx — Editor chrome layout
 *
 * This layout wraps every route under /write (editor, canvas, etc.)
 * It owns the persistent chrome: Navbar + Project Sidebar.
 *
 * Client Component: reads Zustand UI state for sidebar open/close.
 * Children (pages) are Server Components and receive no chrome concerns.
 */

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { useUIStore } from "@/store/ui-store";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  return (
    <div className="relative flex flex-col h-screen bg-[--bg-base] overflow-hidden">
      {/* ── Persistent top navbar ── */}
      <EditorNavbar />

      {/* ── Overlay sidebar (floats above canvas, zero reflow) ── */}
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Page content pushed below navbar ── */}
      <div className="flex-1 mt-12 overflow-auto">
        {children}
      </div>
    </div>
  );
}
