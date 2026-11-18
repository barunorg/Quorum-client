'use client'

import { useCallback, useEffect, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'quorum_theme'
const themeListeners = new Set<() => void>()

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    themeListeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

function getThemeSnapshot(): Theme {
  try {
    return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function getServerThemeSnapshot(): Theme {
  return 'light'
}

function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {}
  themeListeners.forEach(listener => listener())
}

/** Light/dark theme with localStorage persistence + <html data-theme>. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const setTheme = useCallback((next: Theme | ((current: Theme) => Theme)) => {
    const updated = typeof next === 'function' ? next(getThemeSnapshot()) : next
    saveTheme(updated)
  }, [])
  const toggle = useCallback(() => setTheme(current => (current === 'dark' ? 'light' : 'dark')), [setTheme])

  return { theme, setTheme, toggle }
}
