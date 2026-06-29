import React from 'react';
import { BackgroundEffects } from '@/components/layout/BackgroundEffects';

function TrainerOrangeOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 animate-pulse-glow from-orange-500/10 via-white/5 to-transparent opacity-50 w-[500px] h-[500px] rounded-full top-1/4 left-1/4 blur-3xl" />
      <div className="absolute translate-x-1/2 translate-y-1/2 animate-pulse-glow from-orange-500/10 via-white/5 to-transparent opacity-50 w-[500px] h-[500px] rounded-full bottom-1/4 right-1/4 blur-3xl" />
      <div className="absolute -translate-x-1/2 animate-pulse-glow from-orange-500/8 via-white/5 to-transparent opacity-40 w-[420px] h-[420px] rounded-full top-[62%] left-[68%] blur-3xl" />
      <div className="absolute translate-x-1/2 -translate-y-1/2 animate-pulse-glow from-orange-500/8 via-white/5 to-transparent opacity-35 w-[460px] h-[460px] rounded-full top-[18%] right-[18%] blur-3xl" />
    </div>
  );
}

/** Main site background plus Ear Mastery orange orbs. */
export const TrainerAmbientBackground: React.FC = () => (
  <>
    <BackgroundEffects />
    <TrainerOrangeOrbs />
  </>
);
