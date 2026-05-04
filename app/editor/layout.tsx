'use client';

/**
 * app/editor/layout.tsx — HIGH-FIDELITY REFACTOR
 *
 * Adds a subtle SVG noise/grid texture over bg-base for industrial depth.
 * Navbar height is h-12 (48px); mt-12 offsets the content precisely.
 */

import { EditorNavbar } from '@/components/editor/editor-navbar';
import { ProjectSidebar } from '@/components/editor/project-sidebar';
import { useUIStore } from '@/store/ui-store';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore(s => s.sidebarOpen);
  const setSidebarOpen = useUIStore(s => s.setSidebarOpen);

  return (
    <div
      className="relative flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* ── Subtle grid texture overlay (non-interactive) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(255,255,255,0.015) 47px, rgba(255,255,255,0.015) 48px), repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(255,255,255,0.015) 47px, rgba(255,255,255,0.015) 48px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Persistent top navbar ── */}
      <EditorNavbar />

      {/* ── Overlay sidebar ── */}
      <ProjectSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Page content (below fixed navbar) ── */}
      <div className="relative z-10 flex-1 mt-12 overflow-auto">{children}</div>
    </div>
  );
}
