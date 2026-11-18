'use client'

import { useSyncExternalStore } from 'react'

/**
 * What a visitor told us while exploring the page. It travels with the
 * application form as JSON so the CRM knows their assets, numbers and fit.
 * Kept in sessionStorage so a refresh does not wipe their answers.
 */
export type CalculatorState = {
  visitors: number
  optInRate: number
  conversionRate: number
  averageOrderValue: number
  paidInFull: boolean
  monthlyRevenue: number
  yearlyRevenue: number
}

export type SelectionState = {
  assets: string[]
  calculator: CalculatorState | null
  fit: Record<string, boolean>
}

const KEY = 'isiata-artist-business-selection'
const DEFAULT_ASSETS = ['music', 'merch', 'audience']

let state: SelectionState = { assets: DEFAULT_ASSETS, calculator: null, fit: {} }
let hydrated = false
const listeners = new Set<() => void>()

function hydrate() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  try {
    const raw = window.sessionStorage.getItem(KEY)
    if (raw) state = { ...state, ...JSON.parse(raw) }
  } catch {
    // Storage blocked or corrupt: keep defaults.
  }
}

function persist() {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Ignore: answers still live in memory for this page view.
  }
}

export function updateSelection(patch: Partial<SelectionState> | ((prev: SelectionState) => Partial<SelectionState>)) {
  hydrate()
  const next = typeof patch === 'function' ? patch(state) : patch
  state = { ...state, ...next }
  persist()
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const serverSnapshot: SelectionState = { assets: DEFAULT_ASSETS, calculator: null, fit: {} }

export function useSelection(): SelectionState {
  return useSyncExternalStore(
    subscribe,
    () => {
      hydrate()
      return state
    },
    () => serverSnapshot
  )
}
