'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { ToolCatalogGrid } from '@/components/tools/ToolCatalogCard'
import {
  TOOL_CATEGORIES,
  ToolCategoryId,
  getCatalogByCategory,
  getCatalogGroups,
} from '@/lib/tools/catalog'

function ComingSoon() {
  return (
    <div className="text-center py-24">
      <iconify-icon
        icon="solar:diskette-linear"
        width="64"
        height="64"
        className="text-zinc-700 mx-auto mb-6"
      />
      <p className="text-zinc-500 text-lg">Coming Soon</p>
    </div>
  )
}

function CatalogContent({ activeTab }: { activeTab: ToolCategoryId }) {
  if (activeTab === 'all') {
    const groups = getCatalogGroups()
    return (
      <div className="space-y-16">
        {groups.map((group) => (
          <ToolCatalogGrid key={group.category} title={group.label} items={group.items} />
        ))}
      </div>
    )
  }

  const items = getCatalogByCategory(activeTab)
  if (items.length === 0) return <ComingSoon />

  return <ToolCatalogGrid items={items} />
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolCategoryId>('all')

  return (
    <>
      <Container bordered className="min-h-[100svh] flex flex-col justify-center pt-24 md:pt-28 pb-12 md:pb-16">
        <Section reveal className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-display uppercase tracking-normal leading-[0.9] text-gold mb-8">
                <TypeWriter text="The Tools" speed={100} />
              </h1>

              <div className="max-w-2xl space-y-5 text-lg md:text-xl text-zinc-300 leading-relaxed">
                <p>Some tools are created out of necessity.</p>
                <p>
                  Designed to support the work when nothing else felt right.
                  <br />
                  Used in real conditions. Kept only if they proved essential.
                </p>
                <p className="text-zinc-400">
                  Available in small batches.
                  <br />
                  Quiet by design.
                </p>
              </div>
            </div>

            <div className="relative w-full max-w-[min(100%,36rem)] max-h-[min(64svh,36rem)] mx-auto lg:mx-0 lg:ml-auto flex items-center justify-center bg-transparent">
              <img
                src="/tools/sample-packs-hero.png"
                alt="ISIATA sample packs"
                className="w-full h-full max-h-[min(64svh,36rem)] object-contain bg-transparent"
              />
            </div>
          </div>
        </Section>
      </Container>

      <Container bordered className="py-5 border-y border-white/10">
        <div className="flex gap-4 overflow-x-auto">
          {TOOL_CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-white bg-white/5 border border-white/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Container>

      <Container bordered className="py-24">
        <CatalogContent activeTab={activeTab} />
      </Container>

      {(activeTab === 'all' || activeTab === 'tools') && (
        <Container bordered className="pb-24">
          <Section reveal>
            <Link
              href="/systems"
              className="group block border border-white/10 bg-surface-raised depth-shadow p-8 md:p-10 transition-all duration-500 hover:border-white/20"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mb-3">
                    Infrastructure
                  </p>
                  <h2 className="text-2xl md:text-3xl font-display uppercase tracking-normal text-gold mb-3">
                    ISIATA Systems
                  </h2>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                    Backend business infrastructure for artists and musicians — intake, delivery, and
                    retention without the patchwork stack.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm text-zinc-400 group-hover:text-white transition-colors shrink-0">
                  Explore Systems
                  <iconify-icon
                    icon="solar:arrow-right-linear"
                    width="18"
                    height="18"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>
            </Link>
          </Section>
        </Container>
      )}
    </>
  )
}
