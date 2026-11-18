export type Department = 'marketing' | 'hiring' | 'finance' | 'support'
export type Priority = 'high' | 'med' | 'low'
export type Tone = 'up' | 'down' | 'neutral'

export interface DecisionTarget {
  dept?: Department
  external?: string
}

export interface Decision {
  id: string
  dept: Department
  deptLabel: string
  color: string
  glyph: string
  agent: string
  title: string
  impact: string
  impactTone: Tone
  priority: Priority
  cta: string
  goto: DecisionTarget
}

export interface Snapshot {
  dept: Department
  label: string
  color: string
  glyph: string
  external?: string
  metricLabel: string
  metricValue: string
  metricTone: Tone
  delta: string
  series: number[]
  now: string
}

export interface HandledItem {
  color: string
  agent: string
  summary: string
}
