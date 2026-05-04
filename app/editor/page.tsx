/**
 * app/editor/page.tsx — REFINED COMING SOON
 * Server Component: auth guard + clean centered placeholder.
 */

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function EditorPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <main className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-6" style={{ maxWidth: '320px' }}>
        {/* Phase tag */}
        <div
          className="flex items-center gap-2"
          style={{
            border: '1px solid var(--border-default)',
            padding: '4px 10px',
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          />
          <span
            className="font-mono uppercase"
            style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'var(--text-muted)' }}
          >
            Phase 04 — Pending
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1
            className="font-semibold tracking-tight"
            style={{ fontSize: '20px', color: 'var(--text-primary)', lineHeight: 1.2 }}
          >
            Smart Editor
          </h1>
          <p
            className="font-mono leading-relaxed"
            style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '260px' }}
          >
            TipTap + Yjs CRDT engine initializing. Local-first manuscript layer coming next.
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full"
          style={{ height: '1px', backgroundColor: 'var(--border-default)' }}
        />

        {/* Signed in as */}
        <div className="flex items-center gap-2">
          <span
            className="font-mono uppercase"
            style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--text-muted)' }}
          >
            Authenticated as
          </span>
          <span
            className="font-mono px-1.5 py-0.5"
            style={{
              fontSize: '9px',
              color: 'var(--accent-primary)',
              backgroundColor: 'rgba(255,77,0,0.08)',
              border: '1px solid rgba(255,77,0,0.25)',
            }}
          >
            {user.email}
          </span>
        </div>
      </div>
    </main>
  );
}
