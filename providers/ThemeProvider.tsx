'use client'

import React, { createContext, useContext } from 'react'
import { useTheme } from '@/hooks/useTheme'

type ThemeCtx = ReturnType<typeof useTheme>
const Ctx = createContext<ThemeCtx | null>(null)

/** Makes one theme instance available app-wide (sets <html data-theme>). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useTheme()
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useThemeContext() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useThemeContext must be used within <ThemeProvider>')
  return ctx
}
