import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Price } from '@/components/ui/Price'
import { PluginNotifyButton } from '@/components/tools/PluginNotifyButton'
import { PluginGallery } from '@/components/tools/PluginGallery'
import { PLUGINS_HREF, PLUGIN_SHARED_FACTS, type PluginSpec } from '@/lib/tools/plugins'
import {
  landingShotSrc,
  type InstrumentLanding as LandingContent,
  type LandingFeature,
  type LandingShot,
} from '@/lib/tools/instrument-landings'

/** Screens never display much larger than their real size, so they stay sharp. */
const MAX_UPSCALE = 1.35

function Shot({
  shot,
  className = '',
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 55vw',
}: {
  shot: LandingShot
  className?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <figure
      className={`min-w-0 max-w-full overflow-hidden rounded-lg border border-orange-300/20 bg-black/60 depth-shadow-lg ${className}`}
      style={{ maxWidth: Math.round(shot.cssWidth * MAX_UPSCALE) }}
    >
      <Image
        src={landingShotSrc(shot.file)}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        priority={priority}
        unoptimized
        sizes={sizes}
        className="block h-auto w-full max-w-full object-contain"
      />
    </figure>
  )
}

function SectionHeading({
  eyebrow,
  title,
  children,
  compact = false,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
  compact?: boolean
}) {
  return (
    <div className={`${compact ? 'mb-6' : 'mb-8'} max-w-3xl`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-orange-300/30" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{eyebrow}</span>
      </div>
      <h2
        className={`font-sans font-normal uppercase leading-[1.05] tracking-normal text-gold ${
          compact ? 'text-3xl md:text-4xl' : 'text-3xl md:text-5xl'
        }`}
      >
        {title}
      </h2>
      {children ? <div className="mt-6 text-base leading-relaxed text-zinc-400 md:text-lg">{children}</div> : null}
    </div>
  )
}

function VideoSlot({ url, blurb }: { url: string; blurb: string }) {
  return (
    <div id="demo-video" className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/60 depth-shadow">
      {url ? (
        <video className="h-full w-full object-cover" controls playsInline preload="metadata" src={url}>
          Your browser does not support embedded video.
        </video>
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="glow-orb left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-orange-500/10" aria-hidden />
          <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-orange-200/40 bg-orange-300/10 text-orange-100">
            <iconify-icon icon="solar:play-bold" width="24" height="24" />
          </div>
          <p className="relative font-mono text-[10px] uppercase tracking-[0.22em] text-orange-200/75">Walkthrough coming soon</p>
          <p className="relative mt-3 max-w-sm text-sm text-zinc-400">{blurb}</p>
        </div>
      )}
    </div>
  )
}

function Points({ points, horizontal = false }: { points: [string, string][]; horizontal?: boolean }) {
  return (
    <ul
      className={
        horizontal
          ? `grid grid-cols-1 gap-4 ${points.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`
          : 'space-y-3'
      }
    >
      {points.map(([title, body]) => (
        <li key={title} className="border-l border-orange-300/30 pl-4">
          <p className="font-display text-base uppercase tracking-normal text-gold">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">{body}</p>
        </li>
      ))}
    </ul>
  )
}

function Chips({ chips }: { chips: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <span key={c} className="border border-white/10 px-3 py-2 text-xs text-zinc-400">
          {c}
        </span>
      ))}
    </div>
  )
}

function FeatureBlock({ f }: { f: LandingFeature }) {
  const heading = (
    <SectionHeading eyebrow={f.eyebrow} title={f.title}>
      <p>{f.body}</p>
    </SectionHeading>
  )

  // Two features side by side, pictures lined up along the bottom.
  if (f.pair) {
    return (
      <Section reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          {[f, f.pair].map((item) => (
            <div key={item.eyebrow} className="flex min-w-0 flex-col">
              <SectionHeading eyebrow={item.eyebrow} title={item.title} compact>
                <p className="text-base">{item.body}</p>
              </SectionHeading>
              {item.chips ? (
                <div className="mb-6">
                  <Chips chips={item.chips} />
                </div>
              ) : null}
              <Shot shot={item.shot} className="mt-auto w-full" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          ))}
        </div>
      </Section>
    )
  }

  // Full width picture, with the points laid out in a row underneath.
  if (f.wide) {
    return (
      <Section reveal>
        {heading}
        <Shot shot={f.shot} className="mx-auto w-full" sizes="(max-width: 1280px) 100vw, 1100px" />
        {f.points ? (
          <div className="mt-8">
            <Points points={f.points} horizontal />
          </div>
        ) : null}
        {f.chips ? (
          <div className="mt-6">
            <Chips chips={f.chips} />
          </div>
        ) : null}
      </Section>
    )
  }

  // Heading and paragraph on top, then the points beside the picture.
  if (f.split) {
    return (
      <Section reveal>
        {heading}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>{f.points ? <Points points={f.points} /> : null}</div>
          <Shot shot={f.shot} className="mx-auto w-full" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </Section>
    )
  }

  // Heading, copy and points beside the picture. Small screens stack from the tablet breakpoint down.
  const narrow = f.shot.cssWidth < 600
  return (
    <Section reveal>
      <div
        className={`grid grid-cols-1 items-center gap-8 md:gap-10 ${
          narrow ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]' : 'lg:grid-cols-2 lg:gap-12'
        }`}
      >
        <div className={`min-w-0 ${f.flip ? (narrow ? 'md:order-2' : 'lg:order-2') : ''}`}>
          {heading}
          {f.points ? <Points points={f.points} /> : null}
          {f.chips ? <Chips chips={f.chips} /> : null}
        </div>
        <Shot
          shot={f.shot}
          className={`mx-auto w-full ${f.flip ? (narrow ? 'md:order-1' : 'lg:order-1') : ''}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </Section>
  )
}

export function InstrumentLanding({ plugin, content }: { plugin: PluginSpec; content: LandingContent }) {
  const source = `plugin_${plugin.slug}`

  return (
    <div className="min-w-0 space-y-16 sm:space-y-24">
      <div>
        <Link
          href={PLUGINS_HREF}
          className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          All plugins
        </Link>

        <section className="relative min-w-0 max-w-full overflow-hidden rounded-lg gradient-border-tsukuyomi bg-gradient-to-br from-white/[0.06] via-surface-raised/90 to-black/40 p-5 depth-shadow-lg sm:p-7 lg:p-8">
          <div className="glow-orb -left-24 -top-24 h-96 w-96 bg-orange-500/15" aria-hidden />
          <div className="relative grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div className="relative z-10 min-w-0">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-600">
                  {plugin.kind}
                </span>
              </div>
              <h1 className="mb-5 font-sans text-[2.4rem] font-normal uppercase leading-[1.02] tracking-normal text-gold sm:text-[3.25rem] lg:text-[3.75rem]">
                {plugin.name}
              </h1>
              <div className="mb-5 space-y-1">
                {content.hero.map((line) => (
                  <p key={line} className="font-sans text-lg font-normal uppercase tracking-normal text-zinc-200 sm:text-xl">
                    {line}
                  </p>
                ))}
              </div>
              <p className="mb-6 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">{plugin.short}</p>
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <span className="text-3xl text-white">
                  <Price value={plugin.price} />
                </span>
                <PluginNotifyButton productName={plugin.name} source={source} />
                <a
                  href="#demo-video"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
                >
                  Hear it in action
                  <iconify-icon icon="solar:play-circle-linear" width="18" height="18" />
                </a>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {PLUGIN_SHARED_FACTS[0].body}
              </p>
            </div>
            <div className="relative z-0 min-w-0">
              <Shot shot={content.heroShot} priority className="mx-auto w-full" sizes="(max-width: 1024px) 100vw, 55vw" />
            </div>
          </div>
        </section>
      </div>

      <section aria-label={`${plugin.name} demo video`} className="mx-auto w-full max-w-5xl text-center">
        <h2 className="mb-5 font-sans text-2xl font-normal uppercase tracking-normal text-gold sm:text-3xl">{content.videoTitle}</h2>
        <VideoSlot url={content.videoUrl} blurb={content.videoBlurb} />
        <p className="mt-5 text-sm leading-relaxed text-zinc-500">{content.videoCaption}</p>
      </section>

      <Section reveal>
        {content.problem.shot ? (
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <SectionHeading eyebrow="The problem" title={content.problem.title}>
              <p>{content.problem.body}</p>
              <p className="mt-4 text-zinc-200">{content.problem.emphasis}</p>
            </SectionHeading>
            <Shot shot={content.problem.shot} className="mx-auto w-full" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        ) : (
          <SectionHeading eyebrow="The problem" title={content.problem.title}>
            <p>{content.problem.body}</p>
            <p className="mt-4 text-zinc-200">{content.problem.emphasis}</p>
          </SectionHeading>
        )}
      </Section>

      {content.features.map((f) => (
        <FeatureBlock key={f.eyebrow + f.title} f={f} />
      ))}

      {plugin.gallery?.length ? <PluginGallery name={plugin.name} shots={plugin.gallery} /> : null}

      <Section reveal>
        <SectionHeading eyebrow="Also inside" title="The small things that add up." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.extras.map((x) => (
            <article key={x.title} className="border border-white/10 bg-white/[0.025] p-5">
              <h3 className="mb-3 font-display text-lg uppercase tracking-normal text-gold">{x.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{x.body}</p>
            </article>
          ))}
        </div>
        {plugin.whoFor ? (
          <div className="mt-6 border border-white/10 p-5 text-sm leading-relaxed text-zinc-300">
            <span className="font-semibold text-white">Who it is for:</span> {plugin.whoFor}
          </div>
        ) : null}
      </Section>

      <Section reveal>
        <div className="relative overflow-hidden rounded-lg gradient-border-tsukuyomi bg-gradient-to-br from-white/[0.06] via-surface-raised/80 to-transparent p-8 depth-shadow-lg sm:p-12 lg:p-16">
          <div className="glow-orb left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-orange-500/10" aria-hidden />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-7 font-sans text-4xl font-normal uppercase leading-[0.95] tracking-normal text-gold md:text-6xl">
              {content.closing[0]}
              <br />
              <span className="text-orange-200/90">{content.closing[1]}</span>
            </h2>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <PluginNotifyButton productName={plugin.name} source={source} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              <Price value={plugin.price} /> / {PLUGIN_SHARED_FACTS[0].body}
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">ISI AUDIO</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
