'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { SecLabel, useToast } from '@/components/primitives'
import { Chart } from '@/components/icons'
import { useDecisionQueue } from './hooks/use-decision-queue'
import { DailyBriefingBand } from './components/DailyBriefingBand'
import { DecisionQueue } from './components/DecisionQueue'
import { HandledSummary } from './components/HandledSummary'
import { DepartmentSnapshot } from './components/DepartmentSnapshot'
import type { Decision, DecisionTarget, Snapshot } from './types'

/** Owner's Home — run the whole business from one screen. */
export default function HomeScreen() {
  const router = useRouter()
  const { toast } = useToast()
  const { queue, dismiss, highCount, snapshots, handled, handledCount } = useDecisionQueue()

  const { greet, dateStr } = useMemo(() => {
    const now = new Date()
    const h = now.getHours()
    return {
      greet: h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening',
      dateStr: now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    }
  }, [])

  const navigate = (t: DecisionTarget) => {
    if (t.external) router.push(t.external)
    else if (t.dept) router.push(`/${t.dept}`)
  }

  const onDismiss = (id: string) => {
    dismiss(id)
    toast("Handed back to the crew — they'll proceed.")
  }

  const onGo = (item: Decision) => navigate(item.goto)
  const onOpenSnapshot = (s: Snapshot) => navigate(s.external ? { external: s.external } : { dept: s.dept })

  return (
    <div>
      <DailyBriefingBand
        greeting={greet}
        dateStr={dateStr}
        pending={queue.length}
        highCount={highCount}
        handledCount={handledCount}
        onAutonomy={() => toast('Autonomy: crews act on routine work; anything above your thresholds comes here.')}
      />

      <div className="px-7 pt-6 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* LEFT — the one inbox */}
        <div className="flex flex-col gap-[14px]">
          <DecisionQueue queue={queue} onDismiss={onDismiss} onGo={onGo} />
          <HandledSummary count={handledCount} items={handled} />
        </div>

        {/* RIGHT — department snapshots */}
        <div className="flex flex-col gap-[14px]">
          <SecLabel icon={<Chart size={16} />}>At a glance</SecLabel>
          {snapshots.map(s => (
            <DepartmentSnapshot key={s.dept} data={s} onOpen={onOpenSnapshot} />
          ))}
        </div>
      </div>
    </div>
  )
}
