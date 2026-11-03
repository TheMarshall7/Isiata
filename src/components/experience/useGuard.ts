'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useExperience } from '@/lib/experience/store'
import { exp } from '@/lib/experience/config'

/** Members only. Sends visitors without a profile back to registration. */
export function useMemberGuard() {
  const { state, hydrated } = useExperience()
  const router = useRouter()
  useEffect(() => {
    if (hydrated && !state.member) router.replace(exp())
  }, [hydrated, state.member, router])
  return hydrated && !!state.member
}
