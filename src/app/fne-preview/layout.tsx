import type { Metadata } from 'next'
import { ExperienceProvider } from '@/lib/experience/store'
import { Atmosphere, Toaster } from '@/components/experience/Motion'

// Unreleased. Unlisted, never indexed, never in the sitemap.
export const metadata: Metadata = {
  title: 'Feel No Evil',
  description: 'An ISIATA experience.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: { title: 'ISIATA', description: '', images: [] },
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return (
    <ExperienceProvider>
      <div className="fne-root relative min-h-screen bg-[#020202] text-[#ece3d7]">
        {children}
        <Atmosphere />
        <Toaster />
      </div>
    </ExperienceProvider>
  )
}
