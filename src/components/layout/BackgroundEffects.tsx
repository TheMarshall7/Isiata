'use client'

export function BackgroundEffects() {
  return (
    <>
      {/* Diagonal stripe pattern */}
      <div className="fixed inset-0 bg-stripes pointer-events-none z-0" />

      {/* Optional: Add animated background if needed */}
      {/* <div className="fixed top-0 w-full -z-10 h-[800px] opacity-50">
        <div className="absolute w-full h-full left-0 top-0 -z-10" />
      </div> */}
    </>
  )
}
