'use client'

import React, { useEffect, useCallback, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogoMark, Check } from '@/components/icons'
import { CREW, PROBLEMS, STEPS, FAQS } from './LandingPage.data'
import HeaderComponent from '@/components/partial/HeaderComponent'
type ThemeType = 'light' | 'dark'

// Theme store (client-only localStorage, SSR-safe via useSyncExternalStore)
const THEME_KEY = 'quorum_theme'
const themeListeners = new Set<() => void>()

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    themeListeners.delete(callback)
    window.removeEventListener('storage', callback)
  }
}
function getThemeSnapshot(): ThemeType {
  try {
    return (localStorage.getItem(THEME_KEY) as ThemeType) || 'light'
  } catch {
    return 'light'
  }
}

// Server (and first client paint) always assumes light, so hydration matches.
function getThemeServerSnapshot(): ThemeType {
  return 'light'
}

export default function LandingPage() {
  const router = useRouter()
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const goSignup = useCallback(
    (e?: React.SubmitEvent<HTMLFormElement>) => {
      if (e) {
        e.preventDefault()
      }
      router.push('/sign-in')
    },
    [router],
  )

  return (
    <div className="min-h-screen leading-normal antialiased">
      <HeaderComponent />

      <main id="top">
        <section className="pt-23 pb-18">
          <div className="mx-auto max-w-280 px-7 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
            <div>
              <h1 className="font-serif font-normal text-[54px] leading-[1.16] tracking-[-0.02em] my-[16px_0_32px]">
                It runs your business. You just <em className="italic text-accent">approve.</em>
              </h1>
              <p className="text-[19px] text-ink-2 leading-[1.55] max-w-130">
                It buys the ads, screens the hires, chases the invoices, answers the customers — and learns your
                business as it goes. You just approve the calls that matter.
              </p>
              <form className="flex gap-2.5 mt-7.5 max-w-115" onSubmit={goSignup}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="flex-1 px-4 py-3.25 rounded-[11px] border-2 bg-panel text-[15px] text-ink outline-none focus"
                />
                <button
                  className="inline-flex items-center gap-2 font-medium border cursor-pointer transition-all duration-150 whitespace-nowrap text-accent-ink hover:brightness-95 px-6 py-3.5 text-[15px] rounded-xl"
                  type="submit"
                >
                  Get started
                </button>
              </form>
              <div className="mt-3.5 text-[13px] text-muted flex items-center gap-2">
                <Check /> Free 7-day audit · connect read-only · no card required
              </div>
            </div>

            {/* product preview */}
            <div
              className="border rounded-[18px] overflow-hidden shadow-[0_30px_70px_-24px_rgba(35,32,25,0.28)] bg-panel"
              aria-hidden="true"
            >
              <div className="flex items-center gap-1.75 px-4 py-3 border-b bg-bg-2">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full bg-border-2" />
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
                    <div key={l} className="border rounded-[9px] p-2.5 bg-bg">
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-muted">{l}</div>
                      <div className="text-[18px] font-medium tracking-[-0.02em] mt-1.25">
                        {v}
                        <span className="font-mono text-[10px] text-up ml-1">{d}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border rounded-[10px] p-3 bg-bg">
                  <div className="flex items-center gap-1.75 mb-2">
                    <span className="w-5.5 h-5.5 rounded-full inline-flex items-center justify-center font-mono text-[11px] font-semibold shrink-0 bg-[color-mix(in_srgb,var(--atlas)_22%,var(--panel))] text-atlas border border-[color-mix(in_srgb,var(--atlas)_40%)]">
                      H
                    </span>
                    <span className="text-xs font-medium text-atlas">Hiring</span>
                    <span className="ml-auto font-mono text-[10px] text-muted">needs approval</span>
                  </div>
                  <div className="text-[13px] font-medium mb-2.25">Send offer to Marcus Webb — Senior Barista</div>
                  <div className="flex gap-1.75">
                    <span className="flex-1 text-accent-ink rounded-lg p-2 text-center text-xs font-medium bg-accent">
                      Approve &amp; send offer
                    </span>
                    <span className="bg-transparent text-ink-2 border-2 rounded-lg px-3.5 py-2 text-xs">Adjust</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-22 text-dk-ink bg-dk-bg">
          <div className="mx-auto max-w-280 px-7">
            <div className="max-w-165 mb-12">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium">
                The founder&apos;s dilemma
              </div>
              <h2 className="font-serif font-normal text-[44px] leading-[1.08] tracking-[-0.02em] my-[14px_0_16px] text-dk-ink">
                You&apos;re the CEO, the marketer, the recruiter and the bookkeeper.
              </h2>
              <p className="text-[17px] text-dk-ink2 leading-[1.55]">
                Running a small business means wearing every hat — and the usual fixes are slow, expensive, or
                don&apos;t talk to each other.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PROBLEMS.map((p, i) => (
                <div key={i} className="border border-dk-border rounded-[14px] p-6 bg-dk-panel">
                  <div className="text-accent text-[22px] mb-3">✕</div>
                  <h3 className="text-[17px] font-medium mb-2 text-dk-ink">{p.h}</h3>
                  <p className="text-sm text-[#B7B1A4] leading-normal">{p.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-22" id="crew">
          <div className="mx-auto max-w-280 px-7">
            <div className="max-w-165 mb-12">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium">
                Why it&apos;s different
              </div>
              <h2 className="font-serif font-normal text-[44px] leading-[1.08] tracking-[-0.02em] my-[14px_0_16px]">
                It does the work — and learns your whole business.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CREW.map((c, i) => (
                <div
                  key={i}
                  className="border rounded-2xl p-6 transition-all duration-150 hover-2 hover:-translate-y-0.5 bg-panel"
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
                  <p className="text-sm text-ink-2 leading-[1.55]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-22 bg-panel" id="how">
          <div className="mx-auto max-w-280 px-7">
            <div className="max-w-165 mb-12">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium">How it works</div>
              <h2 className="font-serif font-normal text-[44px] leading-[1.08] tracking-[-0.02em] my-[14px_0_16px]">
                You set the goals. The crews do the work.
              </h2>
              <p className="text-[17px] text-ink-2 leading-[1.55]">
                Quorum runs the day-to-day across every department and brings only the big calls to you — so you manage
                decisions, not people.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((s, i) => (
                <div key={i}>
                  <div className="font-mono text-[13px] text-accent mb-3.5 pb-3.5 border-b">{s.n}</div>
                  <h3 className="text-[18px] font-medium mb-2 tracking-[-0.01em]">{s.h}</h3>
                  <p className="text-sm text-ink-2 leading-[1.55]">{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-22" id="control">
          <div className="mx-auto max-w-280 px-7 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium">
                You&apos;re always in charge
              </div>
              <h2 className="font-serif font-normal text-[44px] tracking-[-0.02em] leading-[1.08] my-[14px_0_16px]">
                Autonomy with a seatbelt.
              </h2>
              <p className="text-[17px] text-ink-2 leading-[1.55]">
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
                    <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 text-accent bg-[color-mix(in_srgb,var(--accent)_12%,var(--panel))]">
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
              className="rounded-[18px] p-6.5 text-dk-ink shadow-[0_24px_60px_-20px_var(--shadow)] bg-dk-bg"
              aria-hidden="true"
            >
              <div className="flex items-center gap-3 p-3.5 border border-dk-border rounded-xl mb-3 bg-dk-panel">
                <span className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-dk-good bg-[color-mix(in_srgb,var(--up)_22%)]">
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
                  className={`flex items-center gap-3 px-3.5 py-3 border border-dk-border rounded-[10px] text-[13px] bg-dk-panel ${idx === arr.length - 1 ? '' : 'mb-2'}`}
                >
                  <span className="text-[#D7D2C8]">{dept}</span>
                  <div className="ml-auto flex gap-0.75 rounded-lg p-0.5 bg-dk-inset">
                    {['Ask', 'Approve big', 'Autopilot'].map((seg, si) => (
                      <span
                        key={seg}
                        className={`text-[10.5px] px-2 py-1 rounded-md font-mono ${si === on ? 'bg-accent text-accent-ink' : 'text-dk-muted'}`}
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

        <section className="py-22 bg-panel" id="pricing">
          <div className="mx-auto max-w-280 px-7">
            <div className="max-w-165 mx-auto text-center mb-12">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium">Pricing</div>
              <h2 className="font-serif font-normal text-[44px] leading-[1.08] tracking-[-0.02em] my-[14px_0_16px]">
                Less than a junior hire. More than a whole team.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-215 mx-auto">
              <div className="rounded-[18px] p-8 border bg-bg">
                <div className="font-mono text-xs uppercase tracking-[0.08em] mb-4 text-muted">The old way</div>
                <div className="font-serif text-[50px] tracking-[-0.02em] leading-none">
                  $25k+<small className="text-base opacity-60">/ mo</small>
                </div>
                <ul className="list-none my-5.5 flex flex-col gap-2.75">
                  {[
                    'Marketer + recruiter + bookkeeper + support',
                    'Plus agency retainers on top',
                    'Months to hire & ramp each role',
                    "A dozen tools that don't talk",
                    'Still lands back on your plate',
                  ].map((li, i) => (
                    <li key={i} className="text-sm flex gap-2.5 items-start text-ink-2">
                      <span className="text-accent shrink-0">✕</span> {li}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[18px] p-8 text-dk-ink shadow-[0_24px_60px_-20px_var(--shadow)] bg-dk-bg">
                <div className="font-mono text-xs uppercase tracking-[0.08em] mb-4 text-dk-ink2">Quorum</div>
                <div className="font-serif text-[50px] tracking-[-0.02em] leading-none">
                  $499<small className="text-base opacity-60">/ mo</small>
                </div>
                <ul className="list-none my-5.5 flex flex-col gap-2.75">
                  {[
                    'All four crews — Marketing, Hiring, Finance, Support',
                    'One inbox to run the whole business',
                    'Hard limits, approvals & full audit log',
                    'AI search across all your docs & data',
                    'Live in minutes, not months',
                  ].map((li, i) => (
                    <li key={i} className="text-sm flex gap-2.5 items-start text-dk-ink2">
                      <span className="text-dk-accent shrink-0">✓</span> {li}
                    </li>
                  ))}
                </ul>
                <Link
                  className="inline-flex items-center gap-2 font-medium border cursor-pointer transition-all duration-150 whitespace-nowrap text-accent-ink hover:brightness-95 px-6 py-3.5 text-[15px] rounded-xl w-full justify-center"
                  href="/sign-in"
                >
                  Start free 7-day trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-22">
          <div className="mx-auto max-w-280 px-7">
            <div className="max-w-165 mb-12">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium">Questions</div>
              <h2 className="font-serif font-normal text-[44px] leading-[1.08] tracking-[-0.02em] my-[14px_0_16px]">
                The things founders ask.
              </h2>
            </div>
            <div className="max-w-180">
              {FAQS.map((f, i) => (
                <details key={i} className="faq-item border-b">
                  <summary className="cursor-pointer py-4.5 px-0.5 text-base font-medium text-ink flex items-center">
                    {f.q}
                  </summary>
                  <p className="text-[14.5px] text-ink-2 leading-[1.6] px-0.5 pb-4.5">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-10">
        <div className="mx-auto max-w-280 px-7 flex items-center gap-4 flex-wrap">
          <Link href="#top" className="flex items-center gap-2.25 text-base font-semibold">
            <LogoMark size={18} /> Quorum
          </Link>
          <span className="text-muted text-[13px]">© 2026 Quorum. The AI operator for independent brands.</span>
          <div className="ml-auto flex gap-5.5">
            <Link href="/app" className="text-[13px] text-muted hover:text-ink">
              Live demo
            </Link>
            <a href="#crew" className="text-[13px] text-muted hover:text-ink">
              Departments
            </a>
            <a href="#pricing" className="text-[13px] text-muted hover:text-ink">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
