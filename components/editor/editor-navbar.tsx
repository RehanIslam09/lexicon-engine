'use client';

/**
 * editor-navbar.tsx — POLISHED
 * Cyber-Monolith Standard: brutalist, zero-radius, high-density chrome.
 *
 * Key fix: dropdown is rendered OUTSIDE the header (at fragment root level)
 * with position:fixed and z-index:9999 — eliminates all stacking context issues.
 */

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PanelLeftClose, PanelLeftOpen, ChevronDown, Settings, LogOut, Zap } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { createClient } from '@/utils/supabase/client';

export function EditorNavbar() {
  const sidebarOpen = useUIStore(s => s.sidebarOpen);
  const toggleSidebar = useUIStore(s => s.toggleSidebar);
  const clearAll = useUIStore(s => s.clearAll);
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  async function handleLogout() {
    setMenuOpen(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    clearAll();
    router.push('/login');
    router.refresh();
  }

  return (
    <>
      {/* ════════════════════════════════════════
          NAVBAR BAR
      ════════════════════════════════════════ */}
      <header
        className="fixed top-0 inset-x-0 h-12 flex items-center justify-between z-50 px-0"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        {/* ── Left: Sidebar toggle ── */}
        <div
          className="flex items-center h-full"
          style={{ borderRight: '1px solid var(--border-default)' }}
        >
          <NavButton
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={toggleSidebar}
            className="h-full w-12"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <PanelLeftOpen className="h-4 w-4" strokeWidth={1.5} />
            )}
          </NavButton>
        </div>

        {/* ── Center: wordmark ── */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 select-none pointer-events-none">
          <span
            className="font-mono uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.35em', color: 'var(--text-muted)' }}
          >
            Lexicon
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--border-default)' }}>
            /
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--text-primary)' }}
          >
            Engine
          </span>
        </div>

        {/* ── Right cells ── */}
        <div className="flex items-center h-full">
          {/* Online indicator */}
          <div
            className="hidden sm:flex items-center gap-2 px-4 h-full select-none"
            style={{ borderLeft: '1px solid var(--border-default)' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: '#00E676' }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: '#00E676' }}
              />
            </span>
            <span
              className="font-mono uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#00E676' }}
            >
              Online
            </span>
          </div>

          {/* Version tag */}
          <div
            className="hidden md:flex items-center gap-1.5 px-4 h-full select-none"
            style={{ borderLeft: '1px solid var(--border-default)' }}
          >
            <Zap className="h-3 w-3" strokeWidth={1.5} style={{ color: 'var(--accent-primary)' }} />
            <span
              className="font-mono"
              style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--accent-primary)' }}
            >
              v0.4
            </span>
            <span
              className="font-mono"
              style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.45 }}
            >
              alpha
            </span>
          </div>

          {/* Account trigger */}
          <div
            className="relative h-full"
            style={{ borderLeft: '1px solid var(--border-default)' }}
          >
            <NavButton
              aria-label="User menu"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen(prev => !prev)}
              className="h-full px-4 gap-2"
              active={menuOpen}
            >
              <span
                className="font-mono uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.2em' }}
              >
                Account
              </span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-150 ${menuOpen ? 'rotate-180' : ''}`}
                strokeWidth={1.5}
              />
            </NavButton>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          DROPDOWN — fixed at root, no stacking context issues
      ════════════════════════════════════════ */}
      {menuOpen && (
        <>
          {/* Backdrop: closes menu on outside click */}
          <div
            className="fixed inset-0"
            style={{ zIndex: 9998 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown panel */}
          <div
            role="menu"
            className="fixed"
            style={{
              top: '48px',
              right: '0px',
              width: '208px',
              zIndex: 9999,
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderTop: 'none',
            }}
          >
            {/* Label row */}
            <div
              className="px-3 py-2.5"
              style={{ borderBottom: '1px solid var(--border-default)' }}
            >
              <p
                className="font-mono uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'var(--text-muted)' }}
              >
                Session Active
              </p>
            </div>

            {/* Items */}
            <div className="py-1">
              <Link
                href="/settings"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 transition-colors duration-100"
                style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-primary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--bg-base)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                }}
              >
                <Settings className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.04em' }}>
                  Profile Settings
                </span>
              </Link>

              <div
                className="mx-3 my-1"
                style={{ height: '1px', backgroundColor: 'var(--border-default)' }}
              />

              <button
                role="menuitem"
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 transition-colors duration-100"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--state-error)';
                  (e.currentTarget as HTMLElement).style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                }}
              >
                <LogOut className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.04em' }}>
                  Terminate Session
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/* ── Reusable nav button with invert hover ── */
function NavButton({
  children,
  className = '',
  active = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isActive = active || hovered;

  return (
    <button
      {...props}
      className={`flex items-center justify-center transition-colors duration-100 ${className}`}
      style={{
        backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
        color: isActive ? 'var(--bg-base)' : 'var(--text-muted)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
