'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import {
  DEFAULT_LENS_ID,
  getLens,
  type SystemLens,
  type SystemLensId,
} from '@/lib/systems/lens'

type SystemsLensContextValue = {
  lensId: SystemLensId
  setLensId: (id: SystemLensId) => void
  lens: SystemLens
}

const SystemsLensContext = createContext<SystemsLensContextValue | null>(null)

export function SystemsLensProvider({ children }: { children: React.ReactNode }) {
  const [lensId, setLensId] = useState<SystemLensId>(DEFAULT_LENS_ID)
  const lens = useMemo(() => getLens(lensId), [lensId])

  return (
    <SystemsLensContext.Provider value={{ lensId, setLensId, lens }}>
      {children}
    </SystemsLensContext.Provider>
  )
}

export function useSystemsLens() {
  const value = useContext(SystemsLensContext)
  if (!value) {
    throw new Error('useSystemsLens must be used within SystemsLensProvider')
  }
  return value
}
