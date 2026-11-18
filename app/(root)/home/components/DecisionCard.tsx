import { ArrowRight } from '@/components/icons'
import { Panel, Pill, Button } from '@/components/primitives'
import type { Decision, Priority, Tone } from '../types'

const PRIORITY_TONE: Record<Priority, 'down' | 'warn' | 'neutral'> = {
  high: 'down',
  med: 'warn',
  low: 'neutral',
}

const TONE_COLOR: Record<Tone, string> = {
  up: 'var(--up)',
  down: 'var(--down)',
  neutral: 'var(--ink-2)',
}

type DecisionCardProps = {
  item: Decision
  onDismiss: (id: string) => void
  onGo: (item: Decision) => void
}

/** Single "needs you" item with a department-colored left rail. */
export function DecisionCard({ item, onDismiss, onGo }: DecisionCardProps) {
  return (
    <Panel padding={16} style={{ borderLeft: `3px solid ${item.color}` }}>
      <div className="flex items-start gap-[13px]">
        <span
          className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[13px] font-bold font-[var(--font-mono)] shrink-0"
          style={{ background: `color-mix(in srgb, ${item.color} 20%, transparent)`, color: item.color }}
        >
          {item.glyph}
        </span>
        <div className="flex flex-col gap-[7px] flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-[var(--font-mono)] font-medium" style={{ color: item.color }}>
              {item.deptLabel}
            </span>
            <Pill tone={PRIORITY_TONE[item.priority]} className="ml-auto">
              {item.priority}
            </Pill>
          </div>
          <div className="text-[14.5px] font-medium text-[color:var(--ink)] leading-[1.35]">{item.title}</div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-[var(--font-mono)]" style={{ color: TONE_COLOR[item.impactTone] }}>
              {item.impact}
            </span>
            <span className="ml-auto flex gap-2">
              <Button kind="ghost" size="sm" onClick={() => onDismiss(item.id)}>
                Dismiss
              </Button>
              <Button kind="primary" size="sm" iconRight={<ArrowRight size={14} />} onClick={() => onGo(item)}>
                {item.cta}
              </Button>
            </span>
          </div>
        </div>
      </div>
    </Panel>
  )
}
