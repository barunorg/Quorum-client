'use client'

import { useCallback, useMemo, useState } from 'react'
import type { Decision, HandledItem, Snapshot } from '../types'

// In the real app these come from the API (tRPC / api-client). The prototype's
// sample data lives here so the hook's shape is the contract the UI relies on.
const INITIAL_QUEUE: Decision[] = [
  {
    id: 'q1',
    dept: 'marketing',
    deptLabel: 'Marketing',
    color: '#E0673F',
    glyph: 'M',
    agent: 'Volt',
    title: 'Shift $1,800/wk from YouTube → TikTok',
    impact: '+86 leads/wk',
    impactTone: 'up',
    priority: 'high',
    cta: 'Review in Marketing',
    goto: { external: '/app' },
  },
  {
    id: 'q2',
    dept: 'hiring',
    deptLabel: 'Hiring',
    color: '#8B7FE8',
    glyph: 'H',
    agent: 'Onboarder',
    title: 'Send offer to Marcus Webb — Senior Barista',
    impact: 'scored 95/100',
    impactTone: 'neutral',
    priority: 'high',
    cta: 'Review offer',
    goto: { dept: 'hiring' },
  },
  {
    id: 'q3',
    dept: 'finance',
    deptLabel: 'Finance',
    color: '#3FC79A',
    glyph: 'F',
    agent: 'Warden',
    title: 'Approve $2,400 Meta ad-spend bill',
    impact: 'within cap',
    impactTone: 'neutral',
    priority: 'med',
    cta: 'Review in Finance',
    goto: { dept: 'finance' },
  },
  {
    id: 'q4',
    dept: 'finance',
    deptLabel: 'Finance',
    color: '#3FC79A',
    glyph: 'F',
    agent: 'Biller',
    title: 'Summit Tours is 38 days late on $9,500',
    impact: 'escalate?',
    impactTone: 'down',
    priority: 'high',
    cta: 'Review in Finance',
    goto: { dept: 'finance' },
  },
  {
    id: 'q5',
    dept: 'support',
    deptLabel: 'Support',
    color: '#58A6FF',
    glyph: 'S',
    agent: 'Echo',
    title: 'Aisha K. — refund status (high priority)',
    impact: 'reply drafted',
    impactTone: 'neutral',
    priority: 'med',
    cta: 'Review in Support',
    goto: { dept: 'support' },
  },
]

const SNAPSHOTS: Snapshot[] = [
  {
    dept: 'marketing',
    label: 'Marketing',
    color: '#E0673F',
    glyph: 'M',
    external: '/app',
    metricLabel: 'Leads (7d)',
    metricValue: '1,284',
    metricTone: 'up',
    delta: '+22%',
    series: [38, 41, 39, 46, 52, 49, 61],
    now: 'Volt is optimizing spend',
  },
  {
    dept: 'hiring',
    label: 'Hiring',
    color: '#8B7FE8',
    glyph: 'H',
    metricLabel: 'In pipeline',
    metricValue: '7',
    metricTone: 'neutral',
    delta: '1 offer',
    series: [2, 3, 3, 5, 4, 6, 7],
    now: '1 offer awaiting',
  },
  {
    dept: 'finance',
    label: 'Finance',
    color: '#3FC79A',
    glyph: 'F',
    metricLabel: 'Cash',
    metricValue: '$48.2k',
    metricTone: 'up',
    delta: '+6.1k',
    series: [40, 39, 42, 41, 44, 46, 48],
    now: '7.2 mo runway',
  },
  {
    dept: 'support',
    label: 'Support',
    color: '#58A6FF',
    glyph: 'S',
    metricLabel: 'Open tickets',
    metricValue: '12',
    metricTone: 'neutral',
    delta: '−25%',
    series: [22, 20, 19, 17, 16, 14, 12],
    now: '68% auto-resolved',
  },
]

const HANDLED: HandledItem[] = [
  { color: '#E0673F', agent: 'Volt', summary: 'Paused 3 underperforming ad sets' },
  { color: '#58A6FF', agent: 'Echo', summary: 'Auto-resolved 18 support tickets' },
  { color: '#3FC79A', agent: 'Ledger', summary: 'Reconciled 47 transactions' },
  { color: '#8B7FE8', agent: 'Sourcer', summary: 'Screened 9 new applicants' },
]

const HANDLED_COUNT = 78

/**
 * Owner's Home data + actions. Swap the constants above for a real query
 * (e.g. api.home.decisions.useQuery()) — the returned shape stays the same.
 */
export function useDecisionQueue() {
  const [queue, setQueue] = useState<Decision[]>(INITIAL_QUEUE)

  const dismiss = useCallback((id: string) => {
    setQueue(q => q.filter(x => x.id !== id))
  }, [])

  const highCount = useMemo(() => queue.filter(q => q.priority === 'high').length, [queue])

  return {
    queue,
    dismiss,
    highCount,
    snapshots: SNAPSHOTS,
    handled: HANDLED,
    handledCount: HANDLED_COUNT,
  }
}
