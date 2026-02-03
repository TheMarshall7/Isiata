'use client'

export function BackgroundEffects() {
  return (
    <>
      {/* Ambient gradient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[120px]" />
        {/* Bottom-right glow */}
        <div className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]" />
        {/* Center subtle glow */}
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-zinc-800/20 blur-[100px]" />
      </div>
    </>
  )
}
