import React from 'react'

/**
 * Full-bleed Overlay 4 bookends — top and bottom, soft-masked into black.
 */
export const TrainerOverlayTextures: React.FC = () => (
  <>
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[1] w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, black 0%, black 48%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 48%, transparent 100%)',
      }}
    >
      <img
        src="/brand/overlays/overlay-4.png"
        alt=""
        className="block h-auto w-full max-h-[92vh] object-cover object-top opacity-90 mix-blend-screen sm:max-h-none sm:object-contain sm:object-center"
      />
    </div>

    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 48%, transparent 100%)',
      }}
    >
      <img
        src="/brand/overlays/overlay-4.png"
        alt=""
        className="block h-auto w-full max-h-[92vh] scale-y-[-1] object-cover object-top opacity-90 mix-blend-screen sm:max-h-none sm:object-contain sm:object-center"
      />
    </div>
  </>
)
