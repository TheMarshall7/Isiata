import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Price } from '@/components/ui/Price'
import { PluginNotifyButton } from '@/components/tools/PluginNotifyButton'
import { PluginGrid } from '@/components/tools/PluginCards'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { ISIATA_LOGO_URL } from '@/lib/constants'
import {
  ISI_CREATE_SUBSCRIPTION,
  PLUGINS_HREF,
  PLUGIN_GROUPS,
  PLUGIN_SHARED_FACTS,
  SUBSCRIPTION_HREF,
  getSubscriptionPlugins,
} from '@/lib/tools/plugins'

export const metadata: Metadata = buildPageMetadata({
  title: `${ISI_CREATE_SUBSCRIPTION.name} | Every Isiata Plugin`,
  description: ISI_CREATE_SUBSCRIPTION.description,
  path: SUBSCRIPTION_HREF,
  image: ISIATA_LOGO_URL,
  imageAlt: ISI_CREATE_SUBSCRIPTION.name,
  keywords: ['Isi Access', 'Isiata', 'plugin subscription', 'VST3', 'AU'],
})

export default function SubscriptionPage() {
  const plugins = getSubscriptionPlugins()
  const groups = PLUGIN_GROUPS.map((g) => ({ ...g, items: plugins.filter((p) => p.group === g.id) })).filter(
    (g) => g.items.length > 0
  )
  const stats = [
    { label: 'Plugins', value: String(plugins.length), note: 'Instruments, effects, saturation, EQ and compressors.' },
    { label: 'Formats', value: 'VST3 · AU', note: 'Plus Standalone, and AAX for the Drum Engine.' },
  ]

  return (
    <Container bordered className="pb-24 pt-28 sm:pt-32">
      <Link
        href={PLUGINS_HREF}
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
      >
        <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
        All plugins
      </Link>

      <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
        Subscription · {plugins.length} plugins
      </p>
      <h1 className="mb-6 font-display text-4xl uppercase tracking-normal text-gold md:text-6xl">
        {ISI_CREATE_SUBSCRIPTION.name}
      </h1>
      <p className="mb-6 max-w-2xl text-xl leading-relaxed text-[#ece3d7] md:text-2xl">
        {ISI_CREATE_SUBSCRIPTION.tagline}
      </p>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-zinc-400">{ISI_CREATE_SUBSCRIPTION.description}</p>

      <div className="mb-14 flex flex-wrap items-center gap-6">
        <span className="text-4xl text-white">
          <Price value={ISI_CREATE_SUBSCRIPTION.price} />
        </span>
        <PluginNotifyButton
          productName={ISI_CREATE_SUBSCRIPTION.name}
          source="subscription_isi_access"
          label="Notify me on launch"
        />
      </div>

      <section className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-[#d8aa67]/25 p-6">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{stat.label}</p>
            <p className="mb-3 text-3xl text-white">{stat.value}</p>
            <p className="text-sm leading-relaxed text-zinc-400">{stat.note}</p>
          </div>
        ))}
      </section>

      <section className="mb-14">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">What is inside</h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.id} className="border-t border-[#d8aa67]/15 pt-4">
              <h3 className="mb-1 text-sm font-medium text-[#f0dfc8]">
                {g.label} <span className="text-zinc-600">· {g.items.length}</span>
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{g.items.map((p) => p.name).join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">Every plugin</h2>
        <PluginGrid plugins={plugins} />
      </section>

      <section>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Formats</dt>
            <dd className="mt-1 text-zinc-300">{PLUGIN_SHARED_FACTS[0].body}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Install</dt>
            <dd className="mt-1 text-zinc-300">{PLUGIN_SHARED_FACTS[1].body}</dd>
          </div>
        </dl>
      </section>
    </Container>
  )
}
