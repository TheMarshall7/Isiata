'use client'

import Link from 'next/link'
import { Price } from '@/components/ui/Price'
import {
  PLUGIN_GROUPS,
  PluginBundle,
  PluginGroupId,
  PluginSpec,
  getPluginsByGroup,
  pluginHref,
} from '@/lib/tools/plugins'

export function PluginCard({ plugin }: { plugin: PluginSpec }) {
  return (
    <Link
      href={pluginHref(plugin)}
      className="group flashlight-card hover-glow hover-depth flex flex-col overflow-hidden border border-[#d8aa67]/25 bg-transparent"
      onMouseMove={(e) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      }}
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <iconify-icon
            icon={plugin.icon}
            width="28"
            height="28"
            className="text-gold/50 transition-colors group-hover:text-gold/90"
          />
          <span className="text-sm font-medium text-white">
            <Price value={plugin.price} />
          </span>
        </div>
        <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">{plugin.kind}</p>
        <h3 className="mb-2 text-lg font-semibold text-gold transition-colors group-hover:text-zinc-200">
          {plugin.name}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">{plugin.hero}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-600">Explore</span>
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

export function PluginGroupGrid({ group }: { group: PluginGroupId }) {
  const meta = PLUGIN_GROUPS.find((g) => g.id === group)!
  const items = getPluginsByGroup(group)
  return (
    <div>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-600">{meta.label}</h2>
      <p className="mb-6 max-w-2xl text-sm text-zinc-500">{meta.blurb}</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((plugin) => (
          <PluginCard key={plugin.slug} plugin={plugin} />
        ))}
      </div>
    </div>
  )
}

export function BundleCard({ bundle }: { bundle: PluginBundle }) {
  return (
    <div className="flex flex-col border border-[#d8aa67]/30 p-6 md:p-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">Bundle</p>
        {bundle.badge ? (
          <span className="rounded-full border border-[#d8aa67]/40 px-3 py-1 text-[10px] uppercase tracking-widest text-[#f0dfc8]">
            {bundle.badge}
          </span>
        ) : null}
      </div>
      <h3 className="mb-1 text-xl font-semibold text-gold">{bundle.name}</h3>
      <p className="mb-5 text-sm text-zinc-400">{bundle.tagline}</p>
      <div className="mb-5 flex items-baseline gap-3">
        <span className="text-4xl text-white">
          <Price value={bundle.launchPrice} />
        </span>
        <span className="text-sm text-zinc-500">
          Launch · Regular <Price value={bundle.regularPrice} strikethrough />
        </span>
      </div>
      <ul className="space-y-2 text-sm text-zinc-300">
        {bundle.includes.map((item) => (
          <li key={item} className="flex gap-2">
            <iconify-icon icon="solar:check-circle-linear" width="16" height="16" className="mt-0.5 shrink-0 text-gold/70" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
