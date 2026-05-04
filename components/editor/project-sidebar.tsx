'use client';

/**
 * project-sidebar.tsx — HIGH-FIDELITY REFACTOR
 * Cyber-Monolith Standard: overlay panel, GPU-accelerated, zero-radius.
 *
 * Design upgrades:
 * - Tabs: invert-on-active physical toggle feel
 * - EmptyPlaceholder: SVG grid + terminal-style message
 * - New Project: ghost outline → solid fill transition
 */

import { X, Plus, FolderOpen, Users, Terminal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          transition-opacity duration-200
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      />

      {/* ── Sidebar panel ── */}
      <aside
        aria-label="Project sidebar"
        className={`
          fixed top-12 left-0 bottom-0
          w-72
          z-50
          flex flex-col
          border-r border-[--border-default]
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        {/* ── Header ── */}
        <div
          className="
            flex items-center justify-between
            h-10
            px-4
            border-b border-[--border-default]
            flex-shrink-0
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-mono tracking-[0.35em] uppercase"
              style={{ color: 'var(--accent-primary)' }}
            >
              Projects
            </span>
            <span
              className="text-[9px] font-mono px-1 py-0.5 border"
              style={{
                color: 'var(--text-muted)',
                borderColor: 'var(--border-default)',
              }}
            >
              LOCAL
            </span>
          </div>
          <button
            aria-label="Close sidebar"
            onClick={onClose}
            className="
              flex items-center justify-center
              h-6 w-6
              text-[--text-muted]
              hover:bg-[--accent-primary] hover:text-[--bg-base]
              transition-colors duration-100
            "
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="my-projects" className="flex flex-col flex-1 overflow-hidden">
          <TabsList
            className="
              flex w-full
              rounded-none px-0
              flex-shrink-0
              border-b border-[--border-default]
              h-9
            "
            style={{ backgroundColor: 'transparent' }}
          >
            <TabsTrigger
              value="my-projects"
              className="
                flex-1 flex items-center justify-center gap-1.5
                h-full
                text-[9px] font-mono tracking-[0.25em] uppercase
                rounded-none border-0
                transition-colors duration-100
                data-[state=active]:bg-[--accent-primary] data-[state=active]:text-[--bg-base]
                data-[state=inactive]:text-[--text-muted] data-[state=inactive]:hover:bg-[--accent-muted] data-[state=inactive]:hover:text-[--accent-primary]
              "
            >
              <FolderOpen className="h-3 w-3" strokeWidth={1.5} />
              My Projects
            </TabsTrigger>
            <div
              className="w-px self-stretch"
              style={{ backgroundColor: 'var(--border-default)' }}
            />
            <TabsTrigger
              value="shared"
              className="
                flex-1 flex items-center justify-center gap-1.5
                h-full
                text-[9px] font-mono tracking-[0.25em] uppercase
                rounded-none border-0
                transition-colors duration-100
                data-[state=active]:bg-[--accent-primary] data-[state=active]:text-[--bg-base]
                data-[state=inactive]:text-[--text-muted] data-[state=inactive]:hover:bg-[--accent-muted] data-[state=inactive]:hover:text-[--accent-primary]
              "
            >
              <Users className="h-3 w-3" strokeWidth={1.5} />
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex-1 overflow-hidden m-0">
            <ScrollArea className="h-full">
              <EmptyBuffer
                code="ERR_NO_PROJECTS"
                message="No projects in local buffer."
                hint="Initialize a new project to begin writing."
              />
            </ScrollArea>
          </TabsContent>

          <TabsContent value="shared" className="flex-1 overflow-hidden m-0">
            <ScrollArea className="h-full">
              <EmptyBuffer
                code="ERR_NO_SHARED"
                message="Collaboration buffer empty."
                hint="Projects shared with you will sync here."
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* ── Footer ── */}
        <div className="flex-shrink-0 p-3 border-t border-[--border-default]">
          <button
            className="
              group
              w-full h-9
              flex items-center justify-center gap-2
              border border-[--accent-primary]
              text-[--accent-primary] bg-transparent
              hover:bg-[--accent-primary] hover:text-[--bg-base]
              transition-colors duration-100
              text-[10px] font-mono tracking-[0.25em] uppercase
            "
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            New Project
          </button>
        </div>
      </aside>
    </>
  );
}

/* ── EmptyBuffer: Terminal-style empty state with SVG dot grid ── */

function EmptyBuffer({ code, message, hint }: { code: string; message: string; hint: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-64 overflow-hidden">
      {/* SVG dot grid background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#EDEDED" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Terminal icon */}
      <div
        className="relative flex items-center justify-center w-8 h-8 border mb-4"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <Terminal className="h-4 w-4" strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
      </div>

      {/* Error code */}
      <p
        className="relative text-[9px] font-mono tracking-[0.25em] uppercase mb-2"
        style={{ color: 'var(--accent-primary)' }}
      >
        {code}
      </p>

      {/* Message */}
      <p
        className="relative text-xs font-mono mb-1 text-center px-6"
        style={{ color: 'var(--text-primary)' }}
      >
        {message}
      </p>

      {/* Hint */}
      <p
        className="relative text-[10px] font-mono text-center px-6 leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        {hint}
      </p>
    </div>
  );
}
