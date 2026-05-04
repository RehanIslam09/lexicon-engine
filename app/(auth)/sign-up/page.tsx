'use client';

/**
 * app/(auth)/sign-up/page.tsx
 * Cyber-Monolith / Industrial Brutalism — split-screen sign-up.
 * Full-viewport layout. PKCE email confirmation flow.
 * Success state renders as a brutalist terminal system notice.
 * No Framer Motion. Pure CSS transitions.
 */

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { AlertCircle, Loader2 } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

/* ─────────────────────────────────────────────
   Shared left-panel SVG grid background
───────────────────────────────────────────── */
function GridBackground({ id }: { id: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1F1F1F" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <line
        x1="64"
        y1="0"
        x2="64"
        y2="100%"
        stroke="#FF4D00"
        strokeWidth="1"
        strokeOpacity="0.12"
      />
    </svg>
  );
}

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [error, setError] = useState<string | null>(null);

  const isLoading = formState === 'loading';

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFormState('loading');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setFormState('error');
      return;
    }

    setFormState('success');
  }

  /* ══════════════════════════════════════════
     SUCCESS — System Notice / Terminal Readout
  ══════════════════════════════════════════ */
  if (formState === 'success') {
    return (
      <main className="h-screen min-h-screen overflow-hidden grid lg:grid-cols-2 bg-[--bg-base]">
        {/* LEFT — Secure Handshake Manifest */}
        <section
          className="relative hidden lg:flex flex-col h-full overflow-hidden border-r border-[--border-default]"
          aria-hidden="true"
        >
          <GridBackground id="success-grid" />

          <div className="relative z-10 flex flex-col h-full px-16 pt-20 pb-16">
            {/* Top wordmark */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border border-[--state-success] flex items-center justify-center">
                {/* Checkmark */}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <polyline
                    points="1.5,5 4,7.5 8.5,2.5"
                    stroke="#00E676"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[--state-success] font-mono">
                Lexicon Engine
              </span>
            </div>

            <div className="mt-auto max-w-lg">
              {/* System tag */}
              <div className="flex items-center gap-2 mb-8">
                <div className="h-px w-8 bg-[--state-success]" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-[--state-success] font-mono">
                  SEC.HANDSHAKE // PKCE
                </span>
              </div>

              <h1
                className="text-[--text-primary] uppercase leading-[0.88] tracking-[-0.02em] mb-8"
                style={{
                  fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                  fontSize: 'clamp(52px, 6vw, 80px)',
                  fontWeight: 400,
                }}
              >
                Auth Token
                <br />
                Dispatched.
              </h1>

              <p className="text-[11px] font-mono text-[--text-muted] leading-[1.8] tracking-wider mb-10 max-w-sm">
                PKCE verification sequence initiated.
                <br />
                Awaiting client-side token redemption
                <br />
                to finalize workspace provisioning.
              </p>

              <div className="flex items-center gap-4 mb-7">
                <div className="h-px flex-1 bg-[--border-default]" />
                <span className="text-[8px] tracking-[0.25em] uppercase text-[--text-muted] font-mono">
                  Security Parameters
                </span>
                <div className="h-px w-8 bg-[--border-default]" />
              </div>

              <ul className="flex flex-col gap-3" role="list">
                {[
                  ['SEC.01', 'Token TTL', 'expires in 3600 seconds'],
                  ['SEC.02', 'Dispatch Method', 'single-use PKCE email link'],
                  ['SEC.03', 'Transit Encryption', 'TLS 1.3 end-to-end'],
                  ['SEC.04', 'Storage Encoding', 'AES-256 at rest'],
                ].map(([tag, title, desc]) => (
                  <li key={tag} className="flex items-baseline gap-4 font-mono">
                    <span className="text-[--state-success] text-[9px] tracking-wider shrink-0 w-14">
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

            <div className="mt-16 flex items-center gap-3 border-t border-[--border-default] pt-5">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[--state-success]"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}
              />
              <span className="text-[8px] tracking-[0.25em] uppercase text-[--text-muted] font-mono">
                Token dispatched — awaiting confirmation
              </span>
            </div>
          </div>
        </section>

        {/* RIGHT — Terminal System Notice */}
        <section className="flex items-center justify-center h-full bg-[--bg-surface] px-8 py-12 overflow-y-auto">
          <div className="w-full max-w-[380px]">
            {/* System Notice Card */}
            <div className="border border-[--state-success] p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#0d2a1a]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <rect
                    x="0.75"
                    y="0.75"
                    width="14.5"
                    height="14.5"
                    stroke="#00E676"
                    strokeWidth="1"
                  />
                  <polyline
                    points="3.5,8 6.5,11 12.5,4.5"
                    stroke="#00E676"
                    strokeWidth="1.25"
                    strokeLinecap="square"
                  />
                </svg>
                <div>
                  <p
                    className="text-[8px] tracking-[0.3em] uppercase font-mono"
                    style={{ color: 'var(--state-success)' }}
                  >
                    System Notice
                  </p>
                  <p className="text-[10px] font-mono text-[--text-primary] tracking-wider mt-0.5">
                    Authentication token dispatched
                  </p>
                </div>
              </div>

              {/* Terminal readout table */}
              <div className="flex flex-col gap-2 font-mono mb-6">
                {[
                  [
                    'STATUS',
                    <span style={{ color: 'var(--state-success)' }}>CONFIRMATION_SENT</span>,
                  ],
                  ['RECIPIENT', <span className="text-[--text-primary] truncate">{email}</span>],
                  ['PROTOCOL', <span className="text-[--text-primary]">PKCE / EMAIL_LINK</span>],
                  ['TOKEN_TTL', <span className="text-[--text-primary]">3600s</span>],
                  ['ENCODING', <span className="text-[--text-primary]">BASE64_URL_SAFE</span>],
                  [
                    'NEXT_STEP',
                    <span className="text-[--text-primary]">Click link → activate</span>,
                  ],
                ].map(([key, val]) => (
                  <div
                    key={key as string}
                    className="flex gap-4 items-start text-[9px] tracking-wide"
                  >
                    <span
                      className="text-[--accent-primary] shrink-0 uppercase"
                      style={{ minWidth: '88px' }}
                    >
                      {key}
                    </span>
                    <span className="text-[--text-muted]">{val}</span>
                  </div>
                ))}
              </div>

              {/* Blinking cursor row */}
              <div className="flex items-center gap-2 font-mono text-[9px] text-[--text-muted] tracking-wider">
                <span style={{ color: 'var(--state-success)' }}>›</span>
                <span>Awaiting token redemption</span>
                <span
                  className="inline-block w-1.5 h-3.5 ml-0.5"
                  style={{
                    background: 'var(--state-success)',
                    animation: 'blink 1.2s step-end infinite',
                  }}
                />
              </div>
            </div>

            {/* Below-card link */}
            <div className="flex items-center gap-2 mt-5 px-1">
              <p className="text-[10px] font-mono text-[--text-muted]">
                Already confirmed?{' '}
                <Link
                  href="/login"
                  className="text-[--accent-primary] underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Sign in
                </Link>
              </p>
              <div className="h-px flex-1 bg-[--border-default]" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ══════════════════════════════════════════
     DEFAULT — Sign-Up Form
  ══════════════════════════════════════════ */
  return (
    <main className="h-screen min-h-screen overflow-hidden grid lg:grid-cols-2 bg-[--bg-base]">
      {/* LEFT — Workspace Init Manifest */}
      <section
        className="relative hidden lg:flex flex-col h-full overflow-hidden border-r border-[--border-default]"
        aria-hidden="true"
      >
        <GridBackground id="signup-grid" />

        <div className="relative z-10 flex flex-col h-full px-16 pt-20 pb-16">
          {/* Top wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-[--accent-primary] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[--accent-primary]" />
            </div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[--accent-primary] font-mono">
              Lexicon Engine
            </span>
          </div>

          <div className="mt-auto max-w-lg">
            {/* System tag */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-px w-8 bg-[--accent-primary]" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-[--accent-primary] font-mono">
                WORKSPACE.INIT // NEW
              </span>
            </div>

            <h1
              className="text-[--text-primary] uppercase leading-[0.88] tracking-[-0.02em] mb-8"
              style={{
                fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                fontSize: 'clamp(52px, 6vw, 80px)',
                fontWeight: 400,
              }}
            >
              Initialize
              <br />
              Your
              <br />
              Workspace.
            </h1>

            <p className="text-[11px] font-mono text-[--text-muted] leading-[1.8] tracking-wider mb-10 max-w-sm">
              Provisioning a new authoring environment.
              <br />
              Your data stays local until you decide
              <br />
              otherwise. Always.
            </p>

            <div className="flex items-center gap-4 mb-7">
              <div className="h-px flex-1 bg-[--border-default]" />
              <span className="text-[8px] tracking-[0.25em] uppercase text-[--text-muted] font-mono">
                Workspace Defaults
              </span>
              <div className="h-px w-8 bg-[--border-default]" />
            </div>

            <ul className="flex flex-col gap-3" role="list">
              {[
                ['INIT.01', 'Isolated Namespace', 'no data cross-contamination'],
                ['INIT.02', 'PKCE Auth Flow', 'cryptographic token exchange'],
                ['INIT.03', 'Encrypted Storage', 'AES-256 at rest by default'],
                ['INIT.04', 'Instant Editor Access', 'post-confirmation redirect'],
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

          <div className="mt-16 flex items-center gap-3 border-t border-[--border-default] pt-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[--state-success] animate-pulse" />
            <span className="text-[8px] tracking-[0.25em] uppercase text-[--text-muted] font-mono">
              Registration endpoint active
            </span>
            <div className="ml-auto text-[8px] tracking-wider text-[--text-muted] font-mono">
              PKCE READY
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT — Auth Panel */}
      <section className="flex items-center justify-center h-full bg-[--bg-surface] px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-[380px]">
          {/* Mobile wordmark */}
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
                Create account
              </h2>
              <p className="text-[10px] font-mono text-[--text-muted] mt-1 tracking-wider">
                Initialize a new operator workspace.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} noValidate className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="signup-email"
                  className="text-[9px] uppercase tracking-[0.2em] text-[--text-muted] font-mono"
                >
                  Email address
                </label>
                <input
                  id="signup-email"
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
                <label
                  htmlFor="signup-password"
                  className="text-[9px] uppercase tracking-[0.2em] text-[--text-muted] font-mono"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  aria-label="Password, minimum 8 characters"
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
                      Registration Error
                    </p>
                    <p className="text-[10px] font-mono text-[--state-error]">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                id="signup-submit"
                type="submit"
                disabled={isLoading}
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
                {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />}
                {isLoading ? 'Initializing workspace…' : 'Create account'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[--border-default]">
              <p className="text-[10px] font-mono text-[--text-muted]">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-[--accent-primary] underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Sign in
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
