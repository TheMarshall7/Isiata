import dynamic from 'next/dynamic'

const EarTrainerApp = dynamic(() => import('@/trainer/EarTrainerApp'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-sm text-zinc-500 uppercase tracking-widest">Loading trainer…</p>
    </div>
  ),
})

export default function EarTrainerPage() {
  return <EarTrainerApp />
}
