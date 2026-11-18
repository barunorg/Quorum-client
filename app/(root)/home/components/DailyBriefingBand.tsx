import { Settings } from '@/components/icons'
import { Button } from '@/components/primitives'

type DailyBriefingBandProps = {
  greeting: string
  dateStr: string
  pending: number
  highCount: number
  handledCount: number
  onAutonomy?: () => void
}

/** Editorial "Daily Briefing" header at the top of Owner's Home. */
export function DailyBriefingBand({
  greeting,
  dateStr,
  pending,
  highCount,
  handledCount,
  onAutonomy,
}: DailyBriefingBandProps) {
  return (
    <div
      className="px-7 pt-[34px] pb-[30px] border-b border-[var(--border)]"
      style={{
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 5%, var(--panel)) 0%, transparent 100%)',
      }}
    >
      <div className="flex items-end justify-between gap-5 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-[10px] mb-3">
            <span className="text-[11px] font-[var(--font-mono)] text-[var(--accent)] uppercase tracking-[0.14em]">
              The Daily Briefing
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--muted-2)]" />
            <span className="text-[11px] font-[var(--font-mono)] text-[color:var(--muted)] tracking-[0.04em]">
              {dateStr}
            </span>
          </div>
          <h1 className="font-[var(--font-serif)] font-normal text-[38px] tracking-[-0.02em] leading-[1.05] m-0">
            {greeting}, Sam.
          </h1>
          <p className="text-[15.5px] text-[color:var(--ink-2)] mt-3 max-w-[560px] leading-[1.5]">
            {pending === 0 ? (
              <>
                Your crews ran the business overnight and{' '}
                <strong className="text-[color:var(--ink)]">nothing needs you</strong>. Everything&apos;s handled.
              </>
            ) : (
              <>
                Overnight your crews handled <strong className="text-[color:var(--ink)]">{handledCount} tasks</strong>.{' '}
                {pending} {pending === 1 ? 'decision is' : 'decisions are'} left for you
                {highCount > 0 ? (
                  <>
                    {' '}
                    — <strong className="text-[var(--down)]">{highCount} urgent</strong>
                  </>
                ) : null}
                .
              </>
            )}
          </p>
        </div>
        <Button kind="ghost" icon={<Settings size={15} />} onClick={onAutonomy}>
          Autonomy
        </Button>
      </div>
    </div>
  )
}
