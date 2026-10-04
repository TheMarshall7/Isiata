'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-display uppercase tracking-normal mb-3">
            Something went wrong
          </h2>
          <p className="text-sm text-zinc-400 mb-8">
            We hit an unexpected error. Try again or refresh the page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn-primary"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
