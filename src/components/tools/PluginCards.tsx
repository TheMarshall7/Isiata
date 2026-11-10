'use client'

import Link from 'next/link'
import { useState } from 'react'
import { JewelHScroll } from '@/components/ui/JewelHScroll'
import { Price } from '@/components/ui/Price'
import {
  PLUGINS,
  PLUGIN_BUNDLES,
  PLUGIN_GROUPS,
  PluginBundle,
  PluginGroupId,
  PluginSpec,
  bundleHref,
  ISI_CREATE_SUBSCRIPTION,
  SUBSCRIPTION_HREF,
  getBundlePlugins,
  getSubscriptionPlugins,
  pluginHref,
} from '@/lib/tools/plugins'

function trackMouse(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

export function PluginCard({ plugin }: { plugin: PluginSpec }) {
  return (
    <Link
      href={pluginHref(plugin)}
      className="group flashlight-card hover-glow hover-depth flex flex-col overflow-hidden border border-[#d8aa67]/25 bg-transparent"
      onMouseMove={trackMouse}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
        {plugin.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={plugin.image.src} alt={plugin.name} className="h-full w-full object-contain object-center p-4" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]">
            <iconify-icon
              icon={plugin.icon}
              width="64"
              height="64"
              className="text-gold/40 transition-colors group-hover:text-gold/70"
            />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-500">{plugin.kind}</p>
        <h3 className="mb-2 text-lg font-semibold text-gold transition-colors group-hover:text-zinc-200">
          {plugin.name}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">{plugin.hero}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            <Price value={plugin.price} />
          </span>
          <iconify-icon
            icon="solar:arrow-right-linear"
            width="18"
            height="18"
            className="text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-gold"
          />
        </div>
      </div>
    </Link>
  )
}

export function PluginGrid({ plugins }: { plugins: PluginSpec[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {plugins.map((plugin) => (
        <PluginCard key={plugin.slug} plugin={plugin} />
      ))}
    </div>
  )
}

export function BundleCard({ bundle }: { bundle: PluginBundle }) {
  const count = getBundlePlugins(bundle).length
  return (
    <Link
      href={bundleHref(bundle)}
      className="group flashlight-card hover-glow hover-depth flex flex-col overflow-hidden border border-[#d8aa67]/35 bg-transparent"
      onMouseMove={trackMouse}
    >
      <div className="relative aspect-video overflow-hidden bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bundle.hero}
          alt={bundle.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {bundle.badge ? (
          <span className="absolute left-3 top-3 rounded-full border border-[#d8aa67]/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-[#f0dfc8] backdrop-blur">
            {bundle.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
        Bundle · {count} plugins
      </p>
      <h3 className="mb-2 text-xl font-semibold text-gold transition-colors group-hover:text-zinc-200">{bundle.name}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-400">{bundle.tagline}</p>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl text-white">
            <Price value={bundle.launchPrice} />
          </span>
          <span className="ml-2 text-sm text-zinc-500">
            <Price value={bundle.regularPrice} strikethrough />
          </span>
        </div>
        <iconify-icon
          icon="solar:arrow-right-linear"
          width="18"
          height="18"
          className="mb-1 text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-gold"
        />
      </div>
      </div>
    </Link>
  )
}

export function BundleBanner() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {PLUGIN_BUNDLES.map((bundle) => (
        <BundleCard key={bundle.slug} bundle={bundle} />
      ))}
    </div>
  )
}

type Filter = 'all' | PluginGroupId

export function PluginShop() {
  const [filter, setFilter] = useState<Filter>('all')

  const instruments = PLUGINS.filter((p) => p.group === 'instrument')
  const rest = PLUGINS.filter((p) => p.group !== 'instrument')
  const filtered = filter === 'all' ? [] : PLUGINS.filter((p) => p.group === filter)
  const tabs: { id: Filter; label: string }[] = [{ id: 'all', label: 'All' }, ...PLUGIN_GROUPS]

  return (
    <div>
      <JewelHScroll thin wrapperClassName="mb-14" className="flex gap-3 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.id
                ? 'border border-[#d8aa67]/40 bg-[#d8aa67]/10 text-[#ece3d7]'
                : 'border border-transparent text-zinc-400 hover:text-[#ece3d7]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </JewelHScroll>

      {filter === 'all' ? (
        <div className="space-y-16">
          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">Instruments</h2>
            <PluginGrid plugins={instruments} />
          </div>
          <div>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">All plugins</h2>
            <PluginGrid plugins={rest} />
          </div>
        </div>
      ) : (
        <PluginGrid plugins={filtered} />
      )}
    </div>
  )
}

export function SubscriptionBanner() {
  const count = getSubscriptionPlugins().length
  return (
    <Link
      href={SUBSCRIPTION_HREF}
      className="group flashlight-card hover-glow grid overflow-hidden border border-[#d8aa67]/40 bg-transparent md:grid-cols-2"
      onMouseMove={trackMouse}
    >
      <div className="flex flex-col justify-center gap-6 p-8 md:p-10">
        <div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">Subscription</p>
          <h2 className="mb-3 font-display text-2xl uppercase tracking-normal text-gold md:text-4xl">
            {ISI_CREATE_SUBSCRIPTION.name}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
            {ISI_CREATE_SUBSCRIPTION.tagline} All {count} plugins, including the Tsukuyomi Drum Engine.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-4xl text-white">
            <Price value={ISI_CREATE_SUBSCRIPTION.price} />
          </span>
          <iconify-icon
            icon="solar:arrow-right-linear"
            width="22"
            height="22"
            className="text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-gold"
          />
        </div>
      </div>
      <div className="relative min-h-[200px] overflow-hidden bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ISI_CREATE_SUBSCRIPTION.hero}
          alt={ISI_CREATE_SUBSCRIPTION.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  )
}
