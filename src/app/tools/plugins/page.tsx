import { Container } from '@/components/ui/Container'
import { BundleBanner, PluginShop } from '@/components/tools/PluginCards'
import { PLUGIN_PRICE_NOTE, PLUGIN_SHARED_FACTS } from '@/lib/tools/plugins'

export default function PluginsPage() {
  return (
    <>
      <Container bordered className="pb-10 pt-28 sm:pt-32">
        <h1 className="mb-3 font-display text-4xl uppercase tracking-normal text-gold md:text-6xl">Plugins</h1>
        <p className="max-w-xl text-base text-zinc-400 md:text-lg">
          Instruments, effects, EQs and compressors for the way you make music.
        </p>
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 py-12 md:py-16">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Bundles</h2>
          <span className="text-xs text-zinc-600">{PLUGIN_PRICE_NOTE}</span>
        </div>
        <BundleBanner />
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 py-12 md:py-16">
        <PluginShop />
      </Container>

      <Container bordered className="border-t border-[#d8aa67]/15 pb-24 pt-12">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
          {PLUGIN_SHARED_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{fact.label}</dt>
              <dd className="text-sm leading-relaxed text-zinc-400">{fact.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  )
}
