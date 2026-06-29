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
          <h2 className="text-2xl font-oswald uppercase tracking-tight mb-3">
            Something went wrong
          </h2>
          <p className="text-sm text-zinc-400 mb-8">
            We hit an unexpected error. Try again or refresh the page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
