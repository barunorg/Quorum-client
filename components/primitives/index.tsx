'use client'

import * as React from 'react'
import { toast as sonnerToast } from 'sonner'
import { Button as UIButton, type ButtonProps as UIButtonProps } from '@/components/ui/button'

type ButtonProps = Omit<UIButtonProps, 'variant' | 'size'> & {
  kind?: 'primary' | 'ghost'
  size?: 'default' | 'sm'
  icon?: React.ReactNode
  iconRight?: React.ReactNode
}

export function Button({ kind = 'primary', size = 'default', icon, iconRight, children, ...props }: ButtonProps) {
  return (
    <UIButton variant={kind === 'ghost' ? 'ghost' : 'default'} size={size} {...props}>
      {icon}
      {children}
      {iconRight}
    </UIButton>
  )
}

type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: number
}

export function Panel({ padding = 16, style, ...props }: PanelProps) {
  return (
    <div
      className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--panel)]"
      style={{ padding, ...style }}
      {...props}
    />
  )
}

type PillProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone: 'accent' | 'down' | 'neutral' | 'warn'
}

const PILL_COLORS: Record<PillProps['tone'], string> = {
  accent: 'var(--accent)',
  down: 'var(--down)',
  neutral: 'var(--muted)',
  warn: 'var(--warn)',
}

export function Pill({ tone, className, style, ...props }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-[var(--font-mono)] uppercase tracking-wide ${className ?? ''}`}
      style={{
        color: PILL_COLORS[tone],
        borderColor: `color-mix(in srgb, ${PILL_COLORS[tone]} 35%, transparent)`,
        background: `color-mix(in srgb, ${PILL_COLORS[tone]} 10%, transparent)`,
        ...style,
      }}
      {...props}
    />
  )
}

type SecLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode
  right?: React.ReactNode
}

export function SecLabel({ icon, right, children, className, ...props }: SecLabelProps) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] font-[var(--font-mono)] uppercase tracking-[0.12em] text-[color:var(--muted)] ${className ?? ''}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
      {right ? <span className="ml-auto">{right}</span> : null}
    </div>
  )
}

type SparklineProps = {
  data: number[]
  color: string
}

export function Sparkline({ data, color }: SparklineProps) {
  const min = Math.min(...data)
  const range = Math.max(...data) - min || 1
  const points = data
    .map((value, index) => {
      const x = data.length > 1 ? (index / (data.length - 1)) * 72 : 36
      const y = 24 - ((value - min) / range) * 20
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg aria-hidden="true" viewBox="0 0 72 28" className="h-7 w-[72px] shrink-0" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

export function useToast() {
  return { toast: sonnerToast }
}
