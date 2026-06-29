'use client'

import React, { useState } from 'react';
import { setEarTrainerEmail } from '../lib/access';
import { TrainerAmbientBackground } from './TrainerAmbientBackground';
import { BrandLogo } from './BrandLogo';
import { trainerLogoSrc } from '../lib/logo';

interface EarTrainerEmailGateProps {
  onUnlock: (email: string) => void;
}

const BENEFITS = [
  'Hear intervals, chords, and progressions before you touch a keyboard',
  'Instant feedback that builds real recall, not guesswork',
  'A guided path from first listen to confident creation',
];

export const EarTrainerEmailGate: React.FC<EarTrainerEmailGateProps> = ({ onUnlock }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes('@')) {
      setError('Enter a valid email to start.');
      return;
    }

    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          source: 'ear_trainer_gate',
        }),
      });
    } catch {
      // Still unlock locally if the network call fails — training should not block.
    }

    setEarTrainerEmail(trimmed);
    onUnlock(trimmed);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-white relative flex flex-col">
      <TrainerAmbientBackground />

      <div className="absolute top-6 left-4 lg:top-8 lg:left-8 z-50">
        <BrandLogo />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center p-4 py-24">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <img
              src={trainerLogoSrc}
              alt="ISIATA"
              className="w-16 h-16 mx-auto mb-6 object-contain opacity-90"
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400/90 mb-3">
              Free · Ear Mastery
            </p>
            <h1 className="text-4xl md:text-5xl font-oswald uppercase tracking-tight text-white leading-[0.95] mb-4">
              Tune your ear.
              <span className="block text-zinc-400">Create without guessing.</span>
            </h1>
            <p className="text-zinc-400 leading-relaxed">
              Enter your email to start your journey. No card. No catch. Just training that
              sharpens how you hear music.
            </p>
          </div>

          <div className="glass-card mb-6">
            <ul className="space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="text-orange-400 mt-0.5 shrink-0">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              disabled={loading}
              className="w-full bg-white text-black text-sm px-5 py-4 outline-none placeholder:text-black/40 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-4 text-sm uppercase tracking-wide hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'Starting...' : "Start training. It's free"}
            </button>
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
            <p className="text-[11px] text-zinc-600 text-center leading-relaxed">
              We&apos;ll email you about Ear Mastery updates. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
