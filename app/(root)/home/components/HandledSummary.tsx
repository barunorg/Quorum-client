'use client'

import { useState } from 'react'
import { Check, ChevronRight } from '@/components/icons'
import { Panel } from '@/components/primitives'
import type { HandledItem } from '../types'

type HandledSummaryProps = {
  count: number
  items: HandledItem[]
}

/** Collapsible "handled automatically" feed — no action, just transparency. */
export function HandledSummary({ count, items }: HandledSummaryProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(s => !s)}
        className="flex items-center gap-[9px] px-4 py-3 bg-[var(--panel)] border border-[var(--border)] rounded-[var(--r-lg)] cursor-pointer w-full text-left"
      >
        <span className="text-[var(--up)] flex">
          <Check size={16} />
        </span>
        <span className="text-[13px] text-[color:var(--ink-2)]">
          <span className="font-medium text-[color:var(--ink)]">{count} tasks</span> handled automatically in the last
          24h — no action needed.
        </span>
        <span
          className="ml-auto text-[var(--muted-2)] flex transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : 'none' }}
        >
          <ChevronRight size={16} />
        </span>
      </button>

      {open && (
        <Panel padding={0}>
          {items.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-[11px]"
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}
            >
              <span className="w-2 h-2 rounded-[3px] shrink-0" style={{ background: r.color }} />
              <span className="text-[13px] text-[color:var(--ink-2)]">
                <span className="font-medium text-[color:var(--ink)]">{r.agent}</span> · {r.summary}
              </span>
            </div>
          ))}
        </Panel>
      )}
    </>
  )
}
