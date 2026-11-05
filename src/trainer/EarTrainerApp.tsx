'use client'

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import { Home } from './pages/Home'
import { Train } from './pages/Train'
import { Locked } from './pages/Locked'
import { Success } from './pages/Success'
import { Stats } from './pages/Stats'
import { Resources } from './pages/Resources'
import { PlatinumGift } from './pages/PlatinumGift'
import { PaymentSuccess } from './pages/PaymentSuccess'
import { PaymentCancel } from './pages/PaymentCancel'
import { DebugConsole } from './components/DebugConsole'
import { ScrollbarVisibility } from '@/components/layout/ScrollbarVisibility'
import { audioEngine } from './audio/audioEngine'
import { attachGlobalAudioUnlock, setupVisibilityResumeHandler } from './audio/unlockAudio'

const BASE_PATH = '/tools/training/ear-trainer'

export default function EarTrainerApp() {
  useEffect(() => {
    const setupAudio = async () => {
      try {
        const ctx = await audioEngine.init()

        attachGlobalAudioUnlock({
          audioContext: ctx,
          onUnlock: () => {
            localStorage.setItem('audioUnlocked', 'true')
            sessionStorage.setItem('audioUnlocked', 'true')
          },
        })

        setupVisibilityResumeHandler(ctx)
      } catch (err) {
        console.warn('Audio setup failed:', err)
      }
    }

    setupAudio()
  }, [])

  // When a Next bar appears, scroll just far enough that it sits in its natural
  // place below the answers, so nothing it shares the screen with is covered.
  useEffect(() => {
    const reveal = (bar: HTMLElement) => {
      const host = bar.parentElement
      if (!host) return
      const hostBottom = host.getBoundingClientRect().bottom + window.scrollY
      const target = hostBottom - window.innerHeight
      if (target > window.scrollY + 4) window.scrollTo({ top: target, behavior: 'smooth' })
    }
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return
          const bar = n.classList.contains('trainer-next-bar') ? n : n.querySelector<HTMLElement>('.trainer-next-bar')
          if (bar) setTimeout(() => reveal(bar), 60)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [])

  // Enter advances to the next question in every mode (clicks the bottom bar's button).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || e.repeat) return
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
      const btn = document.querySelector<HTMLButtonElement>('.trainer-next-bar button:not([disabled])')
      if (btn) {
        e.preventDefault()
        btn.click()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="ear-trainer min-h-screen">
    <ScrollbarVisibility />
    <BrowserRouter basename={BASE_PATH}>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/train" element={<Train />} />
          <Route path="/locked" element={<Locked />} />
          <Route path="/success" element={<Success />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:category" element={<Resources />} />
          <Route path="/platinum-gift" element={<PlatinumGift />} />
          <Route path="/%2Fplatinum-gift" element={<PlatinumGift />} />
        </Routes>
        <DebugConsole />
      </GameProvider>
    </BrowserRouter>
    </div>
  )
}
