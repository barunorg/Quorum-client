'use client'

import { useState } from 'react'
import { Pill, SecLabel } from '@/components/primitives'
import { Inbox } from '@/components/icons'
import { DecisionCard } from './DecisionCard'
import type { Decision } from '../types'

type DecisionQueueProps = {
  queue: Decision[]
  onDismiss: (id: string) => void
  onGo: (item: Decision) => void
}

/** The one cross-department inbox — collapses past 3 items. */
export function DecisionQueue({ queue, onDismiss, onGo }: DecisionQueueProps) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? queue : queue.slice(0, 3)

  return (
    <div className="flex flex-col gap-[14px]">
      <SecLabel
        icon={<Inbox size={16} />}
        right={queue.length > 0 ? <Pill tone="accent">{queue.length} waiting</Pill> : null}
      >
        Needs your decision
      </SecLabel>

      {queue.length === 0 ? (
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-[var(--r-lg)] p-10 text-center">
          <div className="text-[34px] mb-[10px]">✓</div>
          <div className="font-[var(--font-serif)] text-2xl font-normal mb-[6px]">Inbox zero.</div>
          <div className="text-sm text-[color:var(--muted)]">
            Your crews have everything under control. Go run the business.
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[11px]">
          {visible.map(item => (
            <DecisionCard key={item.id} item={item} onDismiss={onDismiss} onGo={onGo} />
          ))}
          {queue.length > 3 && (
            <button
              onClick={() => setShowAll(s => !s)}
              className="self-start text-[12.5px] text-[color:var(--muted)] font-[var(--font-mono)] bg-transparent border-none cursor-pointer py-[2px]"
            >
              {showAll ? '− Show less' : `+ ${queue.length - 3} more waiting`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
