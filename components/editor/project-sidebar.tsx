"use client";

/**
 * project-sidebar.tsx
 * Overlay sidebar that slides in from the left.
 *
 * Design invariants (from 02-editor.md):
 *  - OVERLAY: floats above editor canvas, does NOT push content.
 *  - GPU-accelerated: uses `translateX` transform, never `left` or `width`.
 *  - Z-index: z-50  (backdrop at z-40)
 *  - Background: solid bg-[--bg-surface]  (no content bleed-through)
 *  - Borders: 1px solid --border-default  (brutalist, no shadows)
 */

import { X, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* ── Backdrop (z-40, below sidebar) ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/60
          transition-opacity duration-200
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Sidebar panel (z-50) ── */}
      <aside
        aria-label="Project sidebar"
        className={`
          fixed top-12 left-0 bottom-0
          w-72
          z-50
          flex flex-col
          bg-[--bg-surface]
          border-r border-[--border-default]
          transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ── Header ── */}
        <div
          className="
            flex items-center justify-between
            h-12
            px-4
            border-b border-[--border-default]
            flex-shrink-0
          "
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-[--text-primary]">
            Projects
          </span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close sidebar"
            onClick={onClose}
            className="
              h-7 w-7
              text-[--text-muted]
              hover:bg-[--accent-muted]
              hover:text-[--accent-primary]
              transition-colors duration-150
            "
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="my-projects" className="flex flex-col flex-1 overflow-hidden">
          <TabsList
            className="
              flex w-full
              bg-transparent
              border-b border-[--border-default]
              rounded-none
              px-0
              flex-shrink-0
            "
          >
            <TabsTrigger
              value="my-projects"
              className="
                flex-1
                text-xs uppercase tracking-widest
                text-[--text-muted]
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-[--accent-primary]
                data-[state=active]:text-[--accent-primary]
                data-[state=active]:bg-transparent
                hover:bg-[--accent-muted]
                hover:text-[--accent-primary]
                transition-colors duration-150
                py-3
              "
            >
              My Projects
            </TabsTrigger>
            <TabsTrigger
              value="shared"
              className="
                flex-1
                text-xs uppercase tracking-widest
                text-[--text-muted]
                rounded-none
                border-b-2 border-transparent
                data-[state=active]:border-[--accent-primary]
                data-[state=active]:text-[--accent-primary]
                data-[state=active]:bg-transparent
                hover:bg-[--accent-muted]
                hover:text-[--accent-primary]
                transition-colors duration-150
                py-3
              "
            >
              Shared
            </TabsTrigger>
          </TabsList>

          {/* ── My Projects — empty placeholder ── */}
          <TabsContent value="my-projects" className="flex-1 overflow-hidden m-0">
            <ScrollArea className="h-full">
              <EmptyPlaceholder message="No projects yet." hint="Create your first project below." />
            </ScrollArea>
          </TabsContent>

          {/* ── Shared — empty placeholder ── */}
          <TabsContent value="shared" className="flex-1 overflow-hidden m-0">
            <ScrollArea className="h-full">
              <EmptyPlaceholder
                message="No shared projects."
                hint="Projects shared with you will appear here."
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* ── Footer: New Project button ── */}
        <div
          className="
            flex-shrink-0
            p-4
            border-t border-[--border-default]
          "
        >
          <Button
            className="
              w-full
              flex items-center justify-center gap-2
              bg-[--accent-primary]
              text-[--bg-base]
              hover:opacity-90
              transition-opacity duration-150
              text-xs font-semibold tracking-widest uppercase
              h-10
            "
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}

/* ── Private sub-component ── */

function EmptyPlaceholder({
  message,
  hint,
}: {
  message: string;
  hint: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-48 px-6 text-center">
      <p className="text-sm text-[--text-primary] mb-1">{message}</p>
      <p className="text-xs text-[--text-muted]">{hint}</p>
    </div>
  );
}
