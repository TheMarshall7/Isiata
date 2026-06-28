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

  return (
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
  )
}
