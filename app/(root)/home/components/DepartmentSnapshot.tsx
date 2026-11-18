import { ChevronRight } from '@/components/icons'
import { Panel, Sparkline } from '@/components/primitives'
import type { Snapshot } from '../types'

type DepartmentSnapshotProps = {
  data: Snapshot
  onOpen: (snap: Snapshot) => void
}

/** Right-rail at-a-glance card per crew: metric + sparkline + live status. */
export function DepartmentSnapshot({ data: s, onOpen }: DepartmentSnapshotProps) {
  return (
    <Panel
      padding={15}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(s)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(s)
      }}
      className="cursor-pointer transition-colors duration-150 hover:border-[var(--border-2)] focus:outline-none focus-visible:border-[var(--accent)]"
      style={{ borderTop: `2px solid ${s.color}` }}
    >
      <div className="flex items-center gap-[9px]">
        <span
          className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold font-[var(--font-mono)]"
          style={{ background: `color-mix(in srgb, ${s.color} 20%, transparent)`, color: s.color }}
        >
          {s.glyph}
        </span>
        <span className="text-[14px] font-semibold">{s.label}</span>
        <span className="text-[var(--muted-2)] flex ml-auto">
          <ChevronRight size={16} />
        </span>
      </div>

      <div className="flex items-end justify-between gap-[10px] mt-3">
        <div className="min-w-0">
          <div
            className="text-[22px] font-semibold tracking-[-0.02em] leading-none"
            style={{ color: s.metricTone === 'up' ? 'var(--up)' : 'var(--ink)' }}
          >
            {s.metricValue}
          </div>
          <div className="flex items-center gap-[6px] mt-[5px]">
            <span className="text-[10px] font-[var(--font-mono)] text-[color:var(--muted)] uppercase tracking-[0.05em]">
              {s.metricLabel}
            </span>
            <span className="text-[10.5px] font-[var(--font-mono)] font-medium" style={{ color: s.color }}>
              {s.delta}
            </span>
          </div>
        </div>
        <Sparkline data={s.series} color={s.color} />
      </div>

      <div className="flex items-center gap-[6px] mt-3 pt-[11px] border-t border-[var(--border)]">
        <span className="w-[7px] h-[7px] rounded-full animate-pulse" style={{ background: s.color }} />
        <span className="text-[11.5px] text-[color:var(--muted)]">{s.now}</span>
      </div>
    </Panel>
  )
}
