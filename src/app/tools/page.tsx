'use client'

import type { CSSProperties } from 'react'
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
            <div className="min-w-0">
              <h1 data-reveal style={{ '--d': 0 } as CSSProperties} className="page-hero-title mb-8 font-display uppercase tracking-normal text-gold">
                <TypeWriter text="The Tools" speed={100} />
              </h1>

              <div data-reveal style={{ '--d': 2 } as CSSProperties} className="max-w-2xl space-y-5 text-lg md:text-xl text-gold leading-relaxed">
                <p>Artifacts for creation and perception.</p>
                <p>
                  Built when the work needed something that did not exist.
                  <br />
                  Used in real conditions. Kept only if they proved essential.
                </p>
                <p className="text-[#d5c8b8]">
                  Available in small batches.
                  <br />
                  Quiet by design.
                </p>
              </div>
            </div>

            <div
              style={{ '--d': 1 } as CSSProperties}
              className="reveal-media relative w-full max-w-[min(100%,36rem)] max-h-[min(64svh,36rem)] mx-auto lg:mx-0 lg:ml-auto flex items-center justify-center overflow-hidden bg-transparent"
            >
              <img
                src="/tools/sample-packs-hero.png"
                alt="ISIATA sample packs"
                className="reveal-media-img w-full h-full max-h-[min(64svh,36rem)] object-contain bg-transparent"
              />
            </div>
          </div>
        </Section>
      </Container>

      <Container bordered className="border-y border-[#d8aa67]/15 py-5">
        <div className="flex gap-4 overflow-x-auto">
          {TOOL_CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border border-[#d8aa67]/40 bg-[#d8aa67]/10 text-[#ece3d7]'
                  : 'text-zinc-400 hover:text-[#ece3d7]'
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
              className="group block border border-[#d8aa67]/20 bg-transparent p-8 transition-all duration-500 hover:border-[#d8aa67]/65 md:p-10"
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
                    Structure that holds the work. Intake, delivery, and retention in one place.
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
