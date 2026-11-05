import type { CSSProperties } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { BundleCard, PluginGroupGrid } from '@/components/tools/PluginCards'
import { PluginNotifyButton } from '@/components/tools/PluginNotifyButton'
import {
  PLUGIN_BUNDLES,
  PLUGIN_COUNT,
  PLUGIN_GROUPS,
  PLUGIN_PRICE_NOTE,
  PLUGIN_SHARED_FACTS,
} from '@/lib/tools/plugins'

export default function PluginsPage() {
  return (
    <>
      <Container bordered className="pb-12 pt-28 sm:pt-32 md:pb-16">
        <Section reveal>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-zinc-500">Isiata Plugins</p>
          <h1
            data-reveal
            style={{ '--d': 0 } as CSSProperties}
            className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold"
          >
            {PLUGIN_COUNT} plugins. One engine.
          </h1>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-gold md:text-xl">
            <p>The drum engine, taken apart and rebuilt as tools for every track.</p>
            <p className="text-[#d5c8b8]">
              The plugins reuse the drum engine’s DSP and panels. A setting sounds the same in a plugin as on a
              Tsukuyomi pad.
            </p>
          </div>
        </Section>
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 py-16 md:py-20">
        <Section reveal>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">Bundles</h2>
          <p className="mb-8 text-sm text-zinc-500">{PLUGIN_PRICE_NOTE}</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {PLUGIN_BUNDLES.map((bundle) => (
              <BundleCard key={bundle.slug} bundle={bundle} />
            ))}
          </div>
          <div className="mt-8">
            <PluginNotifyButton productName="the Isiata plugins" source="isiata_plugins_index" />
          </div>
        </Section>
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 py-16 md:py-20">
        <div className="space-y-16">
          {PLUGIN_GROUPS.map((group) => (
            <PluginGroupGrid key={group.id} group={group.id} />
          ))}
        </div>
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 pb-24 pt-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-zinc-600">The details</h2>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {PLUGIN_SHARED_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{fact.label}</dt>
              <dd className="text-sm leading-relaxed text-zinc-300">{fact.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  )
}
