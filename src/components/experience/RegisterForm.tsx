'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useExperience } from '@/lib/experience/store'
import { EXPERIENCE_API, exp } from '@/lib/experience/config'
import { Btn } from './ui'

export function RegisterForm() {
  const { register } = useExperience()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Add the name you want on your card.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('That email does not look right.')
    setBusy(true)
    const member = register({ displayName: name, email, emailConsent: consent })
    try {
      // CRM sync is best effort. Membership never depends on it (brief 11.1).
      await fetch(`${EXPERIENCE_API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: member.displayName,
          email: member.email,
          memberNumber: member.memberNumber,
          emailConsent: member.emailConsent,
          founding: member.founding,
        }),
      })
    } catch {
      /* offline or blocked: the profile already exists locally */
    }
    router.push(exp('/card?new=1'))
  }

  const field =
    'w-full rounded-xl border border-[#d8aa67]/25 bg-[#020202] px-4 py-3.5 text-[#ece3d7] placeholder:text-[#ece3d7]/30 focus:border-[#d8aa67] focus:outline-none'

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="fne-name" className="mb-2 block text-xs tracking-[0.14em] text-[#ece3d7]/60">
          Name on your card
        </label>
        <input id="fne-name" className={field} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} autoComplete="nickname" placeholder="A name or alias" />
      </div>
      <div>
        <label htmlFor="fne-email" className="mb-2 block text-xs tracking-[0.14em] text-[#ece3d7]/60">
          Email
        </label>
        <input id="fne-email" type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#ece3d7]/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#d8aa67]"
        />
        <span>
          Email me weekly transmission reminders and the premiere details. Optional. Your membership and premiere
          access do not depend on this, and you can unsubscribe at any time.
        </span>
      </label>
      {error && (
        <p role="alert" className="text-sm text-[#F0A35E]">
          {error}
        </p>
      )}
      <Btn type="submit" disabled={busy} className="w-full">
        {busy ? 'Opening…' : 'Join. Free.'}
      </Btn>
      <p className="text-center text-xs leading-relaxed text-[#ece3d7]/40">
        Your email is used to create your membership and, only if you agreed, to send you updates.
      </p>
    </form>
  )
}
