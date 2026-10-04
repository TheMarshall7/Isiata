'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-display uppercase tracking-normal text-gold mb-3">
          Something went wrong
        </h2>
        <p className="text-sm text-zinc-400 mb-8">
          We hit an unexpected error loading this page. Try again or refresh.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
