'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogoMark, Check, SunIcon, MoonIcon } from '@/components/icons'
import { CREW, PROBLEMS, STEPS, FAQS } from './LandingPage.data'

const SIGN_IN = '/sign-in'
const DEMO = '/app'

const WRAP = 'mx-auto max-w-280 px-7'
const KICKER = 'font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium'
const BTN =
  'inline-flex items-center gap-2 rounded-[10px] px-4.5 py-2.5 text-sm font-medium border border-transparent cursor-pointer transition-all duration-150 whitespace-nowrap'
const BTN_PRIMARY = `${BTN} btn-primary text-(--accent-ink) border-accent hover:brightness-95`
const BTN_GHOST = `${BTN} btn-ghost text-(--ink) border-(--border-2)`
const BTN_LG = 'px-6 py-3.5 text-[15px] rounded-xl'
const SEC_H2 = 'font-serif font-normal text-[44px] leading-[1.08] tracking-[-0.02em] my-[14px_0_16px]'

export default function LandingPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      return (localStorage.getItem('quorum_theme') as 'light' | 'dark') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('quorum_theme', theme)
    } catch {}
  }, [theme])

  const toggleTheme = () => setTheme(p => (p === 'dark' ? 'light' : 'dark'))

  const goSignup = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      let email = ''
      if (e) {
        e.preventDefault()
        email = (e.currentTarget.querySelector('input')?.value || '').trim()
      }
      router.push(SIGN_IN + (email ? '?email=' + encodeURIComponent(email) : ''))
    },
    [router],
  )

  return (
    <div
      className="quorum-landing min-h-screen text-(--ink) font-(family-name:--font-sans) leading-normal antialiased"
      style={{ background: 'var(--bg)' }}
    >
      <style>{TOKENS}</style>

      {/* ── Nav ── */}
      <header
        className="sticky top-0 z-50 border-b border-border backdrop-blur-md [backdrop-filter:blur(12px)_saturate(150%)]"
        style={{ background: 'color-mix(in srgb,var(--bg) 86%,transparent)' }}
      >
        <div className={`${WRAP} flex items-center gap-3 h-16`}>
          <Link href="#top" className="flex items-center gap-2.25 text-lg font-semibold tracking-[-0.01em]">
            <LogoMark /> Quorum
          </Link>
          <nav className="hidden md:flex gap-7 ml-9">
            {[
              ['#crew', 'Departments'],
              ['#how', 'How it works'],
              ['#control', 'Control'],
              ['#pricing', 'Pricing'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-sm text-(--ink-2) transition-colors hover:text-(--ink)">
                {label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <button className={`${BTN_GHOST} px-2.75! py-2.25!`} onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link className={`${BTN_GHOST} hidden sm:inline-flex`} href={`${SIGN_IN}?mode=login`}>
              Log in
            </Link>
            <Link className={BTN_PRIMARY} href={SIGN_IN}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ── */}
        <section className="pt-23 pb-18">
          <div className={`${WRAP} grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center`}>
            <div>
              <h1 className="font-serif font-normal text-[54px] leading-[1.16] tracking-[-0.02em] my-[16px_0_32px]">
                It runs your business. You just <em className="italic text-accent">approve.</em>
              </h1>
              <p className="text-[19px] text-(--ink-2) leading-[1.55] max-w-130">
                It buys the ads, screens the hires, chases the invoices, answers the customers — and learns your
                business as it goes. You just approve the calls that matter.
              </p>
              <form className="flex gap-2.5 mt-7.5 max-w-115" onSubmit={goSignup}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="flex-1 px-4 py-3.25 rounded-[11px] border border-(--border-2) text-[15px] text-(--ink) outline-none focus:border-accent"
                  style={{ background: 'var(--panel)' }}
                />
                <button className={`${BTN_PRIMARY} ${BTN_LG}`} type="submit">
                  Get started
                </button>
              </form>
              <div className="mt-3.5 text-[13px] text-muted flex items-center gap-2">
                <Check /> Free 7-day audit · connect read-only · no card required
              </div>
            </div>

            {/* product preview */}
            <div
              className="border border-border rounded-[18px] overflow-hidden shadow-[0_30px_70px_-24px_rgba(35,32,25,0.28)]"
              style={{ background: 'var(--panel)' }}
              aria-hidden="true"
            >
              <div
                className="flex items-center gap-1.75 px-4 py-3 border-b border-border"
                style={{ background: 'var(--bg-2)' }}
              >
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--border-2)' }} />
                ))}
              </div>
              <div className="p-4.5">
                <div className="font-serif text-[22px] mb-0.75">Good morning, Sam.</div>
                <div className="text-xs text-muted mb-4">
                  Your crews ran the business overnight. 3 things need your decision.
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3.5">
                  {[
                    ['Leads 7d', '1,284', '+22%'],
                    ['Cash', '$48k', '+6.1k'],
                    ['Tickets', '12', '−5'],
                  ].map(([l, v, d]) => (
                    <div
                      key={l}
                      className="border border-border rounded-[9px] p-2.5"
                      style={{ background: 'var(--bg)' }}
                    >
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-muted">{l}</div>
                      <div className="text-[18px] font-medium tracking-[-0.02em] mt-1.25">
                        {v}
                        <span className="font-mono text-[10px] text-(--up) ml-1">{d}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border border-border rounded-[10px] p-3" style={{ background: 'var(--bg)' }}>
                  <div className="flex items-center gap-1.75 mb-2">
                    <span
                      className="w-5.5 h-5.5 rounded-full inline-flex items-center justify-center font-mono text-[11px] font-semibold shrink-0"
                      style={{
                        background: 'color-mix(in srgb,var(--atlas) 22%,var(--panel))',
                        color: 'var(--atlas)',
                        border: '1px solid color-mix(in srgb,var(--atlas) 40%,transparent)',
                      }}
                    >
                      H
                    </span>
                    <span className="text-xs font-medium text-(--atlas)">Hiring</span>
                    <span className="ml-auto font-mono text-[10px] text-muted">needs approval</span>
                  </div>
                  <div className="text-[13px] font-medium mb-2.25">Send offer to Marcus Webb — Senior Barista</div>
                  <div className="flex gap-1.75">
                    <span
                      className="flex-1 text-(--accent-ink) rounded-lg p-2 text-center text-xs font-medium"
                      style={{ background: 'var(--accent)' }}
                    >
                      Approve &amp; send offer
                    </span>
                    <span className="bg-transparent text-(--ink-2) border border-(--border-2) rounded-lg px-3.5 py-2 text-xs">
                      Adjust
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem ── */}
        <section className="py-22 text-(--dk-ink)" style={{ background: 'var(--dk-bg)' }}>
          <div className={WRAP}>
            <div className="max-w-165 mb-12">
              <div className={KICKER}>The founder&apos;s dilemma</div>
              <h2 className={`${SEC_H2} text-(--dk-ink)`}>
                You&apos;re the CEO, the marketer, the recruiter and the bookkeeper.
              </h2>
              <p className="text-[17px] text-(--dk-ink2) leading-[1.55]">
                Running a small business means wearing every hat — and the usual fixes are slow, expensive, or
                don&apos;t talk to each other.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PROBLEMS.map((p, i) => (
                <div
                  key={i}
                  className="border border-(--dk-border) rounded-[14px] p-6"
                  style={{ background: 'var(--dk-panel)' }}
                >
                  <div className="text-accent text-[22px] mb-3">✕</div>
                  <h3 className="text-[17px] font-medium mb-2 text-(--dk-ink)">{p.h}</h3>
                  <p className="text-sm text-[#B7B1A4] leading-normal">{p.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Departments ── */}
        <section className="py-22" id="crew">
          <div className={WRAP}>
            <div className="max-w-165 mb-12">
              <div className={KICKER}>Why it&apos;s different</div>
              <h2 className={SEC_H2}>It does the work — and learns your whole business.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CREW.map((c, i) => (
                <div
                  key={i}
                  className="border border-border rounded-2xl p-6 transition-all duration-150 hover:border-(--border-2) hover:-translate-y-0.5"
                  style={{ background: 'var(--panel)' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-xl font-semibold mb-4"
                    style={{ background: `color-mix(in srgb,${c.color} 18%,var(--panel))`, color: c.color }}
                  >
                    {c.glyph}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.07em] mb-2.5" style={{ color: c.color }}>
                    {c.role}
                  </div>
                  <h3 className="text-[21px] font-medium tracking-[-0.01em] mb-2">{c.title}</h3>
                  <p className="text-sm text-(--ink-2) leading-[1.55]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How ── */}
        <section className="py-22" id="how" style={{ background: 'var(--panel)' }}>
          <div className={WRAP}>
            <div className="max-w-165 mb-12">
              <div className={KICKER}>How it works</div>
              <h2 className={SEC_H2}>You set the goals. The crews do the work.</h2>
              <p className="text-[17px] text-(--ink-2) leading-[1.55]">
                Quorum runs the day-to-day across every department and brings only the big calls to you — so you manage
                decisions, not people.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((s, i) => (
                <div key={i}>
                  <div className="font-mono text-[13px] text-accent mb-3.5 pb-3.5 border-b border-border">{s.n}</div>
                  <h3 className="text-[18px] font-medium mb-2 tracking-[-0.01em]">{s.h}</h3>
                  <p className="text-sm text-(--ink-2) leading-[1.55]">{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Control ── */}
        <section className="py-22" id="control">
          <div className={`${WRAP} grid grid-cols-1 lg:grid-cols-2 gap-14 items-center`}>
            <div>
              <div className={KICKER}>You&apos;re always in charge</div>
              <h2 className="font-serif font-normal text-[44px] tracking-[-0.02em] leading-[1.08] my-[14px_0_16px]">
                Autonomy with a seatbelt.
              </h2>
              <p className="text-[17px] text-(--ink-2) leading-[1.55]">
                Quorum is built for trust. Set hard limits the crews can never cross, decide how much rope each one
                gets, and reverse anything with one click.
              </p>
              <div className="flex flex-col gap-4.5 mt-6.5">
                {[
                  {
                    ic: (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="10" cy="10" r="7" />
                        <path d="M10 6v4l3 2" />
                      </svg>
                    ),
                    h: 'Hard limits & caps',
                    p: 'Spend ceilings, approval thresholds and budgets the crews physically cannot exceed without you.',
                  },
                  {
                    ic: (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="7" cy="8" r="3" />
                        <path d="M2.5 17c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" />
                      </svg>
                    ),
                    h: 'Per-crew autonomy',
                    p: 'Dial each department from "ask me everything" to "full autopilot."',
                  },
                  {
                    ic: (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 17V4M3 17h14" />
                        <path d="M6 14V9M10 14V6M14 14v-4" />
                      </svg>
                    ),
                    h: 'Full audit log',
                    p: 'Every autonomous action recorded, explained, and reversible in one click.',
                  },
                  {
                    ic: (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="6" y="4" width="3" height="12" rx="1" />
                        <rect x="11" y="4" width="3" height="12" rx="1" />
                      </svg>
                    ),
                    h: 'One-tap kill switch',
                    p: 'Pause every crew instantly — no spend, no posts, no payments, no messages.',
                  },
                ].map((f, i) => (
                  <div key={i} className="flex gap-3.5">
                    <div
                      className="w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 text-accent"
                      style={{ background: 'color-mix(in srgb,var(--accent) 12%,var(--panel))' }}
                    >
                      {f.ic}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-medium mb-0.75">{f.h}</h4>
                      <p className="text-[13.5px] text-muted leading-normal">{f.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-[18px] p-6.5 text-(--dk-ink) shadow-[0_24px_60px_-20px_var(--shadow)]"
              style={{ background: 'var(--dk-bg)' }}
              aria-hidden="true"
            >
              <div
                className="flex items-center gap-3 p-3.5 border border-(--dk-border) rounded-xl mb-3"
                style={{ background: 'var(--dk-panel)' }}
              >
                <span
                  className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-(--dk-good)"
                  style={{ background: 'color-mix(in srgb,var(--up) 22%,transparent)' }}
                >
                  <Check stroke="currentColor" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">All systems within limits</div>
                  <div className="text-xs text-[#9b958a]">Within caps · 4 crews active</div>
                </div>
              </div>
              {[
                ['Marketing', 1],
                ['Hiring', 0],
                ['Finance', 1],
                ['Support', 2],
              ].map(([dept, on], idx, arr) => (
                <div
                  key={dept as string}
                  className={`flex items-center gap-3 px-3.5 py-3 border border-(--dk-border) rounded-[10px] text-[13px] ${idx === arr.length - 1 ? '' : 'mb-2'}`}
                  style={{ background: 'var(--dk-panel)' }}
                >
                  <span className="text-[#D7D2C8]">{dept}</span>
                  <div className="ml-auto flex gap-0.75 rounded-lg p-0.5" style={{ background: 'var(--dk-inset)' }}>
                    {['Ask', 'Approve big', 'Autopilot'].map((seg, si) => (
                      <span
                        key={seg}
                        className={`text-[10.5px] px-2 py-1 rounded-md font-mono ${si === on ? 'text-(--accent-ink)' : 'text-(--dk-muted)'}`}
                        style={si === on ? { background: 'var(--accent)' } : undefined}
                      >
                        {seg}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="py-22" id="pricing" style={{ background: 'var(--panel)' }}>
          <div className={WRAP}>
            <div className="max-w-165 mx-auto text-center mb-12">
              <div className={KICKER}>Pricing</div>
              <h2 className={SEC_H2}>Less than a junior hire. More than a whole team.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-215 mx-auto">
              <div className="rounded-[18px] p-8 border border-border" style={{ background: 'var(--bg)' }}>
                <div className="font-mono text-xs uppercase tracking-[0.08em] mb-4 text-muted">The old way</div>
                <div className="font-serif text-[50px] tracking-[-0.02em] leading-none">
                  $25k+<small className="text-base font-(family-name:--font-sans) opacity-60">/ mo</small>
                </div>
                <ul className="list-none my-5.5 flex flex-col gap-2.75">
                  {[
                    'Marketer + recruiter + bookkeeper + support',
                    'Plus agency retainers on top',
                    'Months to hire & ramp each role',
                    "A dozen tools that don't talk",
                    'Still lands back on your plate',
                  ].map((li, i) => (
                    <li key={i} className="text-sm flex gap-2.5 items-start text-(--ink-2)">
                      <span className="text-accent shrink-0">✕</span> {li}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-[18px] p-8 text-(--dk-ink) shadow-[0_24px_60px_-20px_var(--shadow)]"
                style={{ background: 'var(--dk-bg)' }}
              >
                <div className="font-mono text-xs uppercase tracking-[0.08em] mb-4 text-(--dk-ink2)">Quorum</div>
                <div className="font-serif text-[50px] tracking-[-0.02em] leading-none">
                  $499<small className="text-base font-(family-name:--font-sans) opacity-60">/ mo</small>
                </div>
                <ul className="list-none my-5.5 flex flex-col gap-2.75">
                  {[
                    'All four crews — Marketing, Hiring, Finance, Support',
                    'One inbox to run the whole business',
                    'Hard limits, approvals & full audit log',
                    'AI search across all your docs & data',
                    'Live in minutes, not months',
                  ].map((li, i) => (
                    <li key={i} className="text-sm flex gap-2.5 items-start text-(--dk-ink2)">
                      <span className="text-(--dk-accent) shrink-0">✓</span> {li}
                    </li>
                  ))}
                </ul>
                <Link className={`${BTN_PRIMARY} ${BTN_LG} w-full justify-center`} href={SIGN_IN}>
                  Start free 7-day trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-22">
          <div className={WRAP}>
            <div className="max-w-165 mb-12">
              <div className={KICKER}>Questions</div>
              <h2 className={SEC_H2}>The things founders ask.</h2>
            </div>
            <div className="max-w-180">
              {FAQS.map((f, i) => (
                <details key={i} className="faq-item border-b border-border">
                  <summary className="cursor-pointer py-4.5 px-0.5 text-base font-medium text-(--ink) flex items-center">
                    {f.q}
                  </summary>
                  <p className="text-[14.5px] text-(--ink-2) leading-[1.6] px-0.5 pb-4.5">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className={`${WRAP} flex items-center gap-4 flex-wrap`}>
          <Link href="#top" className="flex items-center gap-2.25 text-base font-semibold">
            <LogoMark size={18} /> Quorum
          </Link>
          <span className="text-muted text-[13px]">© 2026 Quorum. The AI operator for independent brands.</span>
          <div className="ml-auto flex gap-5.5">
            <Link href={DEMO} className="text-[13px] text-muted hover:text-(--ink)">
              Live demo
            </Link>
            <a href="#crew" className="text-[13px] text-muted hover:text-(--ink)">
              Departments
            </a>
            <a href="#pricing" className="text-[13px] text-muted hover:text-(--ink)">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── Design tokens + un-inlinable rules (scoped to .quorum-landing) ────
const TOKENS = `
.quorum-landing {
  --bg:#ECE7DE; --bg-2:#E3DDD1; --panel:#F8F5EF; --panel-2:#EFEAE0;
  --ink:#221F18; --ink-2:#514B3F; --muted:#8B8475; --muted-2:#ABA290;
  --border:#D9D2C4; --border-2:#C8BFAD; --accent:#BD4B2C; --accent-ink:#FBF7F0;
  --up:#1F8A4C; --atlas:#5A4BC2; --volt:#B26A1B; --mira:#BC3B6E; --cipher:#2D72A8; --scout:#1F8A6B;
  --font-sans:'Montserrat',ui-sans-serif,system-ui,sans-serif;
  --font-mono:'Geist Mono',ui-monospace,Menlo,monospace;
  --font-serif:'Instrument Serif',Georgia,serif;
  --dk-bg:#221F18; --dk-panel:#2C281F; --dk-border:#3A3528; --dk-ink:#EDEAE2;
  --dk-ink2:#C2BCAF; --dk-muted:#9b958a; --dk-inset:#211E17; --dk-accent:#e8855f; --dk-good:#5fd99a;
  --shadow:rgba(35,32,25,0.3);
  font-feature-settings:'ss01','cv11';
}
[data-theme="dark"] .quorum-landing {
  --bg:#0B0E14; --bg-2:#0E131B; --panel:#141A23; --panel-2:#1A212B;
  --ink:#E6EDF3; --ink-2:#ADB7C2; --muted:#7B8694; --muted-2:#586170;
  --border:#232B36; --border-2:#2F3A47; --accent:#E0673F; --accent-ink:#160C07;
  --up:#3FB950; --atlas:#8B7FE8; --volt:#E0973A; --mira:#E85C92; --cipher:#58A6FF; --scout:#3FC79A;
  --dk-bg:#0E131B; --dk-panel:#141A23; --dk-border:#232B36; --dk-ink:#E6EDF3;
  --dk-ink2:#ADB7C2; --dk-muted:#7B8694; --dk-inset:#0B0E14; --dk-accent:#E0673F; --dk-good:#3FB950;
  --shadow:rgba(0,0,0,0.5); color-scheme:dark;
}
.quorum-landing ::selection { background:var(--accent); color:var(--accent-ink); }
.quorum-landing .btn-primary { background:var(--accent); }
.quorum-landing .btn-ghost { background:transparent; }
.quorum-landing .btn-ghost:hover { background:var(--panel); }
.quorum-landing .faq-item summary { list-style:none; }
.quorum-landing .faq-item summary::-webkit-details-marker { display:none; }
.quorum-landing .faq-item summary::after { content:'+'; margin-left:auto; font-size:20px; color:var(--muted); font-weight:400; }
.quorum-landing .faq-item[open] summary::after { content:'−'; }
`
