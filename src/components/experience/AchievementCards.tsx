'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { CAMPAIGN } from '@/lib/experience/campaign'
import { achievementsFor, type Achievement, type ExperienceState } from '@/lib/experience/store'
import { Glyph } from './Glyph'
import type { GlyphName } from '@/lib/experience/campaign'
import { Btn } from './ui'

const ICON: Record<string, GlyphName> = {
  crossed: 'threshold',
  first: 'eye',
  returned: 'echo',
  half: 'prism',
  full: 'thread',
  clear: 'mirror',
  present: 'signal',
  voice: 'echo',
  unseen: 'void',
}

/**
 * Shareable achievement cards. Spoiler-free by design (brief 7.2): they show the
 * achievement and the campaign, never a puzzle answer or fragment word.
 */
export function AchievementCards({ state }: { state: ExperienceState }) {
  const list = achievementsFor(state)
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((a) => (
        <AchievementCard key={a.id} a={a} name={state.member?.displayName ?? ''} />
      ))}
    </div>
  )
}

function AchievementCard({ a, name }: { a: Achievement; name: string }) {
  const iconRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  async function render(): Promise<Blob | null> {
    const W = 1080
    const H = 1350
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const display = getComputedStyle(document.querySelector('.font-display') ?? document.body).fontFamily
    const mono = getComputedStyle(document.querySelector('.font-mono') ?? document.body).fontFamily

    ctx.fillStyle = '#020202'
    ctx.fillRect(0, 0, W, H)
    const glow = ctx.createRadialGradient(W / 2, 640, 20, W / 2, 640, 640)
    glow.addColorStop(0, 'rgba(217,119,43,0.32)')
    glow.addColorStop(1, 'rgba(217,119,43,0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = 'rgba(216,170,103,0.6)'
    ctx.lineWidth = 3
    ctx.strokeRect(48, 48, W - 96, H - 96)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#ece3d7'
    ctx.font = `500 44px ${display}`
    ctx.fillText('I S I A T A', W / 2, 170)
    ctx.fillStyle = 'rgba(216,170,103,0.85)'
    ctx.font = `400 26px ${mono}`
    ctx.fillText(CAMPAIGN.name.toUpperCase(), W / 2, 225)

    const svg = iconRef.current?.querySelector('svg')
    if (svg) {
      const clone = svg.cloneNode(true) as SVGSVGElement
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      clone.setAttribute('width', '420')
      clone.setAttribute('height', '420')
      clone.setAttribute('color', '#F0A35E')
      clone.setAttribute('stroke', '#F0A35E')
      clone.setAttribute('stroke-width', '1.4')
      clone.querySelectorAll('[fill="currentColor"]').forEach((n) => n.setAttribute('fill', '#F0A35E'))
      const img = new Image()
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' }))
      await new Promise<void>((res) => {
        img.onload = () => res()
        img.onerror = () => res()
        img.src = url
      })
      ctx.drawImage(img, W / 2 - 210, 360, 420, 420)
      URL.revokeObjectURL(url)
    }

    ctx.fillStyle = '#f7f1e6'
    ctx.font = `500 68px ${display}`
    ctx.fillText(a.title.toUpperCase(), W / 2, 920)
    ctx.fillStyle = 'rgba(236,227,215,0.65)'
    ctx.font = `400 34px ${display}`
    ctx.fillText(a.line, W / 2, 985)
    if (name) {
      ctx.fillStyle = 'rgba(216,170,103,0.8)'
      ctx.font = `400 28px ${mono}`
      ctx.fillText(name.toUpperCase(), W / 2, 1150)
    }
    ctx.fillStyle = 'rgba(236,227,215,0.35)'
    ctx.font = `400 22px ${mono}`
    ctx.fillText('CREATE AND TRANSFORM', W / 2, 1235)

    return new Promise((res) => canvas.toBlob((b) => res(b), 'image/png'))
  }

  async function share() {
    setBusy(true)
    try {
      const blob = await render()
      if (!blob) return
      const file = new File([blob], `isiata-${a.id}.png`, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `${a.title} · ${CAMPAIGN.name}` })
      } else {
        const href = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = href
        link.download = file.name
        link.click()
        URL.revokeObjectURL(href)
      }
    } catch {
      /* share sheet dismissed */
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-2xl border p-7 text-center transition-colors duration-700',
        a.earned ? 'border-[#d8aa67]/40 bg-[#0A0A0A]' : 'border-[#ece3d7]/10 opacity-50'
      )}
    >
      <div ref={iconRef}>
        <Glyph name={ICON[a.id]} size={64} className={a.earned ? 'text-[#F0A35E]' : 'text-[#ece3d7]/30'} />
      </div>
      <h3 className="mt-5 font-display text-lg tracking-[0.08em] text-[#f7f1e6]">{a.title}</h3>
      <p className="mt-2 text-sm text-[#ece3d7]/60">{a.line}</p>
      <Btn
        variant="ghost"
        onClick={share}
        disabled={!a.earned || busy}
        className="mt-6 px-5 py-2.5 text-xs"
      >
        {a.earned ? (busy ? 'Preparing…' : 'Share card') : 'Not yet earned'}
      </Btn>
    </div>
  )
}
