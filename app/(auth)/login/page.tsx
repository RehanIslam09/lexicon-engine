'use client';

/**
 * app/(auth)/login/page.tsx
 * Cyber-Monolith / Industrial Brutalism — split-screen login.
 * Full-viewport layout. No Framer Motion. Pure CSS transitions.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/editor');
    router.refresh();
  }

  return (
    <main className="h-screen min-h-screen overflow-hidden grid lg:grid-cols-2 bg-[--bg-base]">
      {/* ══════════════════════════════════════════
          LEFT — System Manifest Panel
      ══════════════════════════════════════════ */}
      <section
        className="relative hidden lg:flex flex-col h-full overflow-hidden border-r border-[--border-default]"
        aria-hidden="true"
      >
        {/* SVG grid texture */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="login-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1F1F1F" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-grid)" />
          {/* Vertical accent line */}
          <line
            x1="64"
            y1="0"
            x2="64"
            y2="100%"
            stroke="#FF4D00"
            strokeWidth="1"
            strokeOpacity="0.15"
          />
        </svg>

        {/* Diagonal slash overlay — brutalist geometry */}
        <div
          className="absolute bottom-0 right-0 w-px h-full bg-[--border-default] origin-bottom-right"
          style={{ transform: 'rotate(-12deg) translateX(120px)', opacity: 0.3 }}
        />

        {/* Content — anchored to bottom third */}
        <div className="relative z-10 flex flex-col h-full px-16 pt-20 pb-16">
          {/* Top: wordmark badge */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-[--accent-primary] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[--accent-primary]" />
            </div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[--accent-primary] font-mono">
              Lexicon Engine
            </span>
          </div>

          {/* Main content — pushed to vertical center-bottom */}
          <div className="mt-auto max-w-lg">
            {/* System tag */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-px w-8 bg-[--accent-primary]" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-[--accent-primary] font-mono">
                SYS.AUTH // v2.4.1
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[--text-primary] uppercase leading-[0.88] tracking-[-0.02em] mb-8"
              style={{
                fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                fontSize: 'clamp(52px, 6vw, 80px)',
                fontWeight: 400,
              }}
            >
              Narrative
              <br />
              Systems
              <br />
              at Machine
              <br />
              Speed.
            </h1>

            {/* Subtext */}
            <p className="text-[11px] font-mono text-[--text-muted] leading-[1.8] tracking-wider mb-10 max-w-sm">
              High-fidelity local-first text processing.
              <br />
              Zero-latency sync. Industrial-grade authoring
              <br />
              stack built for production at scale.
            </p>

            {/* Divider with label */}
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px flex-1 bg-[--border-default]" />
              <span className="text-[8px] tracking-[0.25em] uppercase text-[--text-muted] font-mono">
                System Capabilities
              </span>
              <div className="h-px w-8 bg-[--border-default]" />
            </div>

            {/* Feature terminal list */}
            <ul className="flex flex-col gap-3" role="list">
              {[
                ['SYS.01', 'Zero-Latency Sync', 'write without network dependency'],
                ['SYS.02', 'Deterministic Versioning', 'every keystroke immutably tracked'],
                ['SYS.03', 'Structured Semantic Layer', 'machine-readable document output'],
                ['SYS.04', 'Conflict-Free CRDT Merge', 'collaborative by default, always'],
              ].map(([tag, title, desc]) => (
                <li key={tag} className="flex items-baseline gap-4 font-mono">
                  <span className="text-[--accent-primary] text-[9px] tracking-wider shrink-0 w-14">
                    [{tag}]
                  </span>
                  <span className="text-[10px] text-[--text-primary] tracking-wide">{title}</span>
                  <span className="text-[9px] text-[--text-muted] tracking-wide hidden xl:block">
                    — {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom status bar */}
          <div className="mt-16 flex items-center gap-3 border-t border-[--border-default] pt-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[--state-success] animate-pulse" />
            <span className="text-[8px] tracking-[0.25em] uppercase text-[--text-muted] font-mono">
              All systems operational
            </span>
            <div className="ml-auto text-[8px] tracking-wider text-[--text-muted] font-mono">
              UPTIME 99.97%
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RIGHT — Auth Panel
      ══════════════════════════════════════════ */}
      <section className="flex items-center justify-center h-full bg-[--bg-surface] px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-[380px]">
          {/* Mobile wordmark — hidden on desktop */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-4 h-4 border border-[--accent-primary] flex items-center justify-center">
              <div className="w-1 h-1 bg-[--accent-primary]" />
            </div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[--accent-primary] font-mono">
              Lexicon Engine
            </span>
          </div>

          {/* Form card */}
          <div className="border border-[--border-default] p-10">
            {/* Top accent line */}
            <div className="h-px w-12 bg-[--accent-primary] mb-8" />

            {/* Wordmark */}
            <div className="mb-10">
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-[--text-muted] font-mono mb-2"
                aria-hidden="true"
              >
                Lexicon Engine
              </p>
              <h2 className="text-2xl font-semibold text-[--text-primary] tracking-tight">
                Sign in
              </h2>
              <p className="text-[10px] font-mono text-[--text-muted] mt-1 tracking-wider">
                Authenticate to access the editor.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} noValidate className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="login-email"
                  className="text-[9px] uppercase tracking-[0.2em] text-[--text-muted] font-mono"
                >
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="
                    h-11 w-full rounded-none
                    bg-[--bg-base]
                    border border-[--border-default]
                    text-[--text-primary] text-sm font-mono
                    px-4 outline-none
                    placeholder:text-[--text-muted]
                    focus:border-[--accent-primary]
                    transition-colors duration-150
                  "
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-[9px] uppercase tracking-[0.2em] text-[--text-muted] font-mono"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  aria-label="Password"
                  className="
                    h-11 w-full rounded-none
                    bg-[--bg-base]
                    border border-[--border-default]
                    text-[--text-primary] text-sm font-mono
                    px-4 outline-none
                    placeholder:text-[--text-muted]
                    focus:border-[--accent-primary]
                    transition-colors duration-150
                  "
                />
              </div>

              {/* Inline error */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 border border-[--state-error] bg-[--bg-base] px-4 py-3"
                >
                  <AlertCircle
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[--state-error]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-[--state-error] mb-0.5">
                      Auth Error
                    </p>
                    <p className="text-[10px] font-mono text-[--state-error]">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="
                  h-11 w-full rounded-none mt-1
                  bg-[--bg-surface] text-[--text-primary]
                  border border-[--border-default]
                  text-[10px] font-semibold uppercase tracking-[0.2em] font-mono
                  flex items-center justify-center gap-2.5
                  transition-all duration-150
                  hover:bg-[--accent-primary] hover:text-black hover:border-[--accent-primary]
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />}
                {loading ? 'Authenticating…' : 'Sign in'}
              </button>
            </form>

            {/* Bottom accent */}
            <div className="mt-8 pt-6 border-t border-[--border-default]">
              <p className="text-[10px] font-mono text-[--text-muted]">
                No account?{' '}
                <Link
                  href="/sign-up"
                  className="text-[--accent-primary] underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Initialize workspace
                </Link>
              </p>
            </div>
          </div>

          {/* Below-card system note */}
          <div className="flex items-center gap-2 mt-5 px-1">
            <span className="text-[8px] font-mono text-[--text-muted] tracking-widest uppercase">
              [SEC] TLS 1.3 encrypted
            </span>
            <div className="h-px flex-1 bg-[--border-default]" />
            <span className="text-[8px] font-mono text-[--text-muted] tracking-widest uppercase">
              PKCE enabled
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
