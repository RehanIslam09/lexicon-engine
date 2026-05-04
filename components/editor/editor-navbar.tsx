"use client";

/**
 * editor-navbar.tsx
 * Fixed-height top navbar that frames every editor screen.
 * Owns the sidebar toggle — the only entry point for the overlay sidebar.
 *
 * Z-index: z-50  (must sit above sidebar backdrop z-40)
 * Border:  1px solid --border-default  (brutalist, no shadows)
 */

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";

export function EditorNavbar() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <header
      className="
        fixed top-0 inset-x-0
        h-12
        flex items-center justify-between
        bg-[--bg-surface]
        border-b border-[--border-default]
        z-50
        px-3
      "
    >
      {/* ── Left section: sidebar toggle ── */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={toggleSidebar}
          className="
            h-8 w-8
            text-[--text-muted]
            hover:bg-[--accent-muted]
            hover:text-[--accent-primary]
            transition-colors duration-150
          "
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <PanelLeftOpen className="h-5 w-5" strokeWidth={1.5} />
          )}
        </Button>
      </div>

      {/* ── Center section ── */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        {/* Reserved for document title / breadcrumb in future chapters */}
      </div>

      {/* ── Right section: empty (reserved for future actions) ── */}
      <div className="flex items-center gap-2" />
    </header>
  );
}
