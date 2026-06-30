import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Producer Toolbox — BPM, Key Finder, Delay & Reverb Calculator',
  description: 'Free music production tools: tap tempo BPM control, key & scale finder with chord progressions, delay time calculator, reverb pre-delay calculator, Hz/ms/beats converter.',
  openGraph: {
    title: 'Producer Toolbox — Free Music Production Tools',
    description: 'BPM control, key finder, delay calculator, reverb times, and unit converter. Essential production utilities in one place.',
  },
  alternates: { canonical: '/tools/toolbox' },
}

export default function ToolboxLayout({ children }: { children: React.ReactNode }) {
  return <div className="producer-toolbox">{children}</div>
}
