import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { ISIATA_LOGO_URL } from '@/lib/constants'

export const metadata: Metadata = buildPageMetadata({
  title: 'Plugins | Drums, Effects, EQ and Compressors',
  description:
    'The Isiata plugin line: the Tsukuyomi Drum Engine, Tsukuyomi Sound, tab plugins, single effects, analog EQ colour and five compressors. VST3, AU and Standalone.',
  path: '/tools/plugins',
  image: ISIATA_LOGO_URL,
  imageAlt: 'Isiata Plugins',
  keywords: [
    'Isiata plugins',
    'Tsukuyomi',
    'VST3 plugins',
    'drum plugin',
    'analog EQ plugin',
    'compressor plugin',
    'parallel compression',
  ],
})

export default function PluginsLayout({ children }: { children: React.ReactNode }) {
  return children
}
