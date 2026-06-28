import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools — Sample Packs, Plugins & Producer Toolbox',
  description:
    'Premium production tools by ISIATA. Sample packs, plugins, presets, utilities, and the Producer Toolbox.',
  openGraph: {
    title: 'ISIATA Tools — Sample Packs, Plugins & Producer Toolbox',
    description:
      'Browse sample packs, plugins, presets, and production tools from ISIATA.',
  },
  alternates: { canonical: '/tools' },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
