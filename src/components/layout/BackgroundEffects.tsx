'use client'

export function BackgroundEffects() {
  return (
    <>
      {/* Ambient gradient blobs - grayscale */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] rounded-full bg-zinc-700/10 blur-[120px]" />
        {/* Bottom-right glow */}
        <div className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full bg-zinc-600/10 blur-[120px]" />
        {/* Center subtle glow */}
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-neutral-800/20 blur-[100px]" />
      </div>
      {/* Noise overlay to eliminate gradient banding on 8-bit displays */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }} />
    </>
  )
}
