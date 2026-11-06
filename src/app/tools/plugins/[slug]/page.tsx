import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Price } from '@/components/ui/Price'
import { JsonLd } from '@/components/seo/JsonLd'
import { PluginNotifyButton } from '@/components/tools/PluginNotifyButton'
import { PluginCard } from '@/components/tools/PluginCards'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { productSchema } from '@/lib/seo/json-ld'
import { ISIATA_LOGO_URL } from '@/lib/constants'
import {
  PLUGINS,
  PLUGINS_HREF,
  PLUGIN_BUNDLES,
  PLUGIN_SHARED_FACTS,
  bundleHref,
  getBundlePlugins,
  getPlugin,
} from '@/lib/tools/plugins'

type Params = { slug: string }

// The drum engine keeps its own dedicated page.
const detailPlugins = () => PLUGINS.filter((p) => !p.href)

export function generateStaticParams(): Params[] {
  return detailPlugins().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const plugin = getPlugin(params.slug)
  if (!plugin || plugin.href) return {}
  return buildPageMetadata({
    title: `${plugin.name} | ${plugin.kind}`,
    description: plugin.short,
    path: `${PLUGINS_HREF}/${plugin.slug}`,
    image: plugin.image?.src ?? ISIATA_LOGO_URL,
    imageAlt: plugin.name,
    keywords: [plugin.name, 'Isiata', 'VST3', 'AU', plugin.kind],
  })
}

export default function PluginPage({ params }: { params: Params }) {
  const plugin = getPlugin(params.slug)
  if (!plugin || plugin.href) notFound()

  const related = detailPlugins()
    .filter((p) => p.group === plugin.group && p.slug !== plugin.slug)
    .slice(0, 3)
  const bundles = PLUGIN_BUNDLES.filter((b) => getBundlePlugins(b).some((p) => p.slug === plugin.slug))
  const formats = PLUGIN_SHARED_FACTS[0].body

  return (
    <Container bordered className="pb-24 pt-28 sm:pt-32">
      <JsonLd
        data={productSchema({
          name: plugin.name,
          description: plugin.short,
          image: plugin.image?.src ?? ISIATA_LOGO_URL,
          url: `${PLUGINS_HREF}/${plugin.slug}`,
          price: plugin.price,
          category: 'Music Production > Plugins',
          availability: 'PreOrder',
        })}
      />

      <Link
        href={PLUGINS_HREF}
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
      >
        <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
        All plugins
      </Link>

      <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
        <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">{plugin.kind}</p>
        <h1 className="mb-6 font-display text-4xl uppercase tracking-normal text-gold md:text-6xl">{plugin.name}</h1>
        <p className="mb-6 max-w-2xl text-xl leading-relaxed text-[#ece3d7] md:text-2xl">{plugin.hero}</p>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-400">{plugin.short}</p>

        <div className="mb-12 flex flex-wrap items-center gap-6">
          <span className="text-3xl text-white">
            <Price value={plugin.price} />
          </span>
          <PluginNotifyButton productName={plugin.name} source={`plugin_${plugin.slug}`} />
        </div>
        </div>
        <div className="w-full lg:justify-self-end">
          {plugin.image ? (
            <figure
              className="overflow-hidden border border-[#d8aa67]/25 bg-black/40"
              style={{ maxWidth: plugin.image.width }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={plugin.image.src}
                width={plugin.image.width}
                height={plugin.image.height}
                alt={`${plugin.name} faceplate`}
                className="h-auto w-full"
              />
            </figure>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mb-14 max-w-2xl space-y-4 text-center">
        {plugin.about.map((p) => (
          <p key={p} className="text-base leading-relaxed text-zinc-300">
            {p}
          </p>
        ))}
      </div>

      {plugin.features.length > 0 ? (
        <section className="mb-14">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">What is inside</h2>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {plugin.features.map((c) => (
              <div key={c.label} className="border-t border-[#d8aa67]/15 pt-4">
                <dt className="mb-1 text-sm font-medium text-[#f0dfc8]">{c.label}</dt>
                <dd className="text-sm leading-relaxed text-zinc-400">{c.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {plugin.notes?.length || plugin.whoFor ? (
        <section className="mb-14 grid gap-10 md:grid-cols-2">
          {plugin.notes?.length ? (
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">Good to know</h2>
              <ul className="space-y-2 text-sm leading-relaxed text-zinc-400">
                {plugin.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {plugin.whoFor ? (
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">Who it is for</h2>
              <p className="text-sm leading-relaxed text-zinc-400">{plugin.whoFor}</p>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="mb-14">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">Specs</h2>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Formats</dt>
            <dd className="mt-1 text-zinc-300">{formats}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Install</dt>
            <dd className="mt-1 text-zinc-300">{PLUGIN_SHARED_FACTS[1].body}</dd>
          </div>
        </dl>
      </section>

      {bundles.length > 0 ? (
        <section className="mb-14">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">Also in</h2>
          <div className="flex flex-wrap gap-3">
            {bundles.map((b) => (
              <Link
                key={b.slug}
                href={bundleHref(b)}
                className="border border-[#d8aa67]/30 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-[#d8aa67]/70 hover:text-white"
              >
                {b.name} · <Price value={b.launchPrice} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section>
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">More like this</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PluginCard key={p.slug} plugin={p} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  )
}
