'use client'

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
      <Container bordered className="pt-32 pb-16">
        <Section reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald uppercase tracking-tight leading-[0.9] text-white mb-12">
                <TypeWriter text="The Tools" speed={100} />
              </h1>

              <div className="max-w-2xl space-y-6 text-xl text-zinc-300 leading-relaxed">
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

            <div className="relative max-w-md lg:max-w-none mx-auto lg:mx-0 w-full flex items-center justify-center bg-transparent">
              <img
                src="/tools/sample-packs-hero.png"
                alt="ISIATA sample packs"
                className="w-full h-auto object-contain bg-transparent"
              />
            </div>
          </div>
        </Section>
      </Container>

      <Container bordered className="py-6 border-y border-white/10">
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
    </>
  )
}
