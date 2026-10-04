'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { ReleaseNotifyModal } from '@/components/forms/ReleaseNotifyModal'
import { DRUM_BUNDLE_HREF } from '@/lib/tools/drum-bundle'
import {
  TSUKUYOMI_ANALOG_MODELS,
  TSUKUYOMI_COMPRESSORS,
  TSUKUYOMI_DEMO_HREF,
  TSUKUYOMI_DEMO_VIDEO_URL,
  TSUKUYOMI_DRUM_ENGINE,
  TSUKUYOMI_HIT_CONTROLS,
  TSUKUYOMI_PROCESS_STEPS,
  TSUKUYOMI_SCENES,
  TSUKUYOMI_SPECS,
} from '@/lib/tools/tsukuyomi-drum-engine'

const TSUKUYOMI_IMAGE_ROOT = '/Tsukyomi Drum Engine Pics'

function ProductScreenshot({
  file,
  alt,
  width,
  height,
  className = '',
  imageClassName = '',
  priority = false,
  showChrome = true,
  sizes = '(max-width: 1024px) 100vw, 50vw',
}: {
  file: string
  alt: string
  width: number
  height: number
  className?: string
  imageClassName?: string
  priority?: boolean
  showChrome?: boolean
  sizes?: string
}) {
  return (
    <figure
      className={`${
        showChrome
          ? 'min-w-0 max-w-full overflow-hidden rounded-lg border border-orange-300/20 bg-black/60 depth-shadow-lg'
          : 'min-w-0 max-w-full overflow-hidden bg-transparent'
      } ${className}`}
    >
      {showChrome ? (
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <span className="h-1.5 w-1.5 rounded-full bg-orange-300/70" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
            Tsukuyomi / Live UI
          </span>
        </div>
      ) : null}
      <Image
        src={`${TSUKUYOMI_IMAGE_ROOT}/${file}`}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`block h-auto w-full max-w-full object-contain ${imageClassName}`}
      />
    </figure>
  )
}

function ProductRender({
  file,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 50vw',
}: {
  file: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <Image
      src={`${TSUKUYOMI_IMAGE_ROOT}/${file}`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={`block h-auto w-full max-w-full object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)] drop-shadow-[0_0_1px_rgba(255,255,255,0.07)] ${className}`}
    />
  )
}


function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="max-w-3xl mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8 bg-orange-300/30" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-display uppercase tracking-normal leading-[0.95] text-gold">
        {title}
      </h2>
      {children ? (
        <div className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed">{children}</div>
      ) : null}
    </div>
  )
}

function VideoSlot() {
  return (
    <div
      id="demo-video"
      className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/60 depth-shadow"
    >
      {TSUKUYOMI_DEMO_VIDEO_URL ? (
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          src={TSUKUYOMI_DEMO_VIDEO_URL}
        >
          Your browser does not support embedded video.
        </video>
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="glow-orb left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-orange-500/10" aria-hidden />
          <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-orange-200/40 bg-orange-300/10 text-orange-100">
            <iconify-icon icon="solar:play-bold" width="24" height="24" />
          </div>
          <p className="relative font-mono text-[10px] uppercase tracking-[0.22em] text-orange-200/75">
            Demo video slot
          </p>
          <p className="relative mt-3 max-w-sm text-sm text-zinc-400">
            The main Tsukuyomi walkthrough will land here.
          </p>
        </div>
      )}
    </div>
  )
}

const PAD_NAMES = [
  'KICK',
  'SNARE',
  'CLAP',
  'HAT',
  'OPEN HAT',
  'PERC',
  'RIM',
  'TOM',
  'LOW TOM',
  'HIGH TOM',
  'SHAKER',
  'TAMB',
  'STOMP',
  'IMPACT',
  'METAL',
  'FX',
] as const

const ACTIVE_STEPS: Record<number, number[]> = {
  0: [0, 3, 7],
  1: [4, 10],
  2: [1, 3, 11],
  3: [0, 6, 14],
  4: [4, 7],
  5: [1, 10, 13],
  6: [0, 3, 8, 12],
  7: [4, 14],
  8: [0, 6],
  9: [1, 3, 10],
  10: [4, 7, 11],
  11: [0, 8, 15],
  12: [1, 3, 6],
  13: [4, 10, 13],
  14: [0, 7, 12],
  15: [1, 3, 4, 14],
}

function DemoPanel() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [step, setStep] = useState(0)
  const activePads = ACTIVE_STEPS[step] ?? []

  useEffect(() => {
    if (!isPlaying) return

    const interval = window.setInterval(() => {
      setStep((current) => (current + 1) % 16)
    }, 180)

    return () => window.clearInterval(interval)
  }, [isPlaying])

  return (
    <div
      id="demo"
      className="relative overflow-hidden rounded-lg border border-orange-300/20 bg-black/60 depth-shadow-lg p-4 sm:p-5"
    >
      <div className="glow-orb -right-24 -top-24 h-72 w-72 bg-orange-500/15" aria-hidden />
      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-200/70">
            Pad layout
          </p>
          <h2 className="font-display text-xl uppercase tracking-normal text-gold sm:text-2xl">
            The 16-pad grid, the way it ships.
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setIsPlaying((current) => !current)}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pause the Tsukuyomi sequence preview' : 'Play the Tsukuyomi sequence preview'}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black transition-colors hover:bg-orange-100"
        >
          <iconify-icon
            icon={isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}
            width="16"
            height="16"
          />
          {isPlaying ? 'Pause' : 'Play sequence'}
        </button>
      </div>

      <div
        className="relative mx-auto mb-5 grid w-full max-w-[560px] grid-cols-4 gap-1.5 sm:gap-2"
        aria-label="Sixteen pad layout"
      >
        {PAD_NAMES.map((pad, index) => {
          const isActive = activePads.includes(index)
          return (
            <div
              key={pad}
              className={`flex aspect-square flex-col justify-between rounded border p-1.5 transition-all duration-150 sm:p-2 ${
                isActive && isPlaying
                  ? 'border-orange-200/70 bg-orange-300/20 shadow-[0_0_22px_rgba(251,146,60,0.18)]'
                  : 'border-white/10 bg-white/[0.025]'
              }`}
            >
              <span className="font-mono text-[9px] text-zinc-500 sm:text-[10px]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-zinc-300 sm:text-[10px]">
                {pad}
              </span>
            </div>
          )
        })}
      </div>

      <div className="relative mx-auto flex w-full max-w-[560px] items-center gap-1" aria-hidden>
        {Array.from({ length: 16 }, (_, index) => (
          <span
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors duration-150 ${
              isPlaying && index === step ? 'bg-orange-300' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <div className="relative mt-3 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          16 pads / 32 voices / 4 scenes
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500"
          aria-live="polite"
        >
          {isPlaying ? `Step ${String(step + 1).padStart(2, '0')} / 16` : 'Sequence ready'}
        </span>
      </div>
    </div>
  )
}

export function TsukuyomiDrumEngineLanding() {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false)

  return (
    <div className="min-w-0 space-y-16 sm:space-y-24">
      <section className="relative min-w-0 max-w-full overflow-hidden rounded-lg gradient-border-tsukuyomi bg-gradient-to-br from-white/[0.06] via-surface-raised/90 to-black/40 p-5 depth-shadow-lg sm:p-7 lg:p-8">
        <div className="glow-orb -left-24 -top-24 h-96 w-96 bg-orange-500/15" aria-hidden />
        <div className="glow-orb -bottom-32 right-0 h-96 w-96 bg-amber-200/5" aria-hidden />
        <div className="relative grid min-w-0 grid-cols-1 items-center gap-7 lg:grid-cols-[0.84fr_1.16fr] lg:gap-8">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-600">
                {TSUKUYOMI_DRUM_ENGINE.label}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-600/80">
                {TSUKUYOMI_DRUM_ENGINE.version}
              </span>
            </div>
            <h1 className="mb-5 font-display text-[2.7rem] uppercase leading-[0.86] tracking-normal text-gold sm:text-[3.65rem] lg:text-[4.5rem]">
              Tsukuyomi
              <br />
              <span className="text-orange-200/90">Drum Engine</span>
            </h1>
            <div className="mb-5 space-y-0.5">
              {TSUKUYOMI_DRUM_ENGINE.heroLines.map((line) => (
                <p key={line} className="font-display text-lg uppercase tracking-normal text-zinc-200 sm:text-xl">
                  {line}
                </p>
              ))}
            </div>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {TSUKUYOMI_DRUM_ENGINE.description}
            </p>
            <div className="mb-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsNotifyOpen(true)}
                className="group cta-sheen inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-orange-100"
              >
                Notify me on release
                <iconify-icon icon="solar:bell-linear" width="18" height="18" />
              </button>
              <a
                href={TSUKUYOMI_DEMO_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                Hear it in action
                <iconify-icon icon="solar:play-circle-linear" width="18" height="18" />
              </a>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {TSUKUYOMI_DRUM_ENGINE.formatLine}
            </p>
          </div>
          <div className="min-w-0">
            <ProductScreenshot
              file="Main UI - Tsukyomi Drum Engine.png"
              alt="Tsukuyomi Drum Engine main instrument interface with pads, controls, and sequencer"
              width={2552}
              height={1552}
              priority
              className="mx-auto w-full max-w-[720px] lg:max-w-none"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </section>

      <section aria-label="Tsukuyomi Drum Engine demo video" className="mx-auto w-full max-w-5xl text-center">
        <h2 className="mb-5 font-display text-2xl uppercase tracking-normal text-gold sm:text-3xl">
          See the whole drum workflow.
        </h2>
        <VideoSlot />
        <p className="mt-5 text-sm leading-relaxed text-zinc-500">
          One instrument. One window. From the first hit to finished drums.
        </p>
      </section>

      <Section reveal>
        <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch md:max-w-[1100px] md:gap-8">
          <div className="min-w-0">
            <SectionHeading eyebrow="The problem" title="Your drums shouldn&apos;t need five plugins.">
              <p>
                A sampler for the sounds. A sequencer for the pattern. Another plugin for compression, another for saturation, another for space. Somewhere between the third window and the fourth, the idea you had five minutes ago is gone.
              </p>
              <p className="mt-4 text-zinc-200">
                Tsukuyomi keeps the whole process in one place: <strong>pads, sequencer, sound design, mixer, effects and mastering in a single window.</strong>
              </p>
            </SectionHeading>
          </div>
          <div className="flex h-full min-w-0 items-center justify-center md:justify-end">
            <ProductScreenshot
              file="Meter - Tsukuyomi Drum Engine.png"
              alt="Tsukuyomi Drum Engine stereo output meter"
              width={1357}
              height={1159}
              showChrome={false}
              className="h-auto w-full max-w-[420px] md:h-full md:w-auto"
              imageClassName="mx-auto md:mx-0 md:!h-full md:!w-auto md:!max-h-[358px] md:!max-w-[420px] object-contain"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
        </div>
      </Section>

      <Section reveal>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="lg:pt-2">
            <SectionHeading eyebrow="Play it" title="Load a kit. Start making noise.">
              <p>
                Hit pads with a MIDI controller, your keyboard or the on-screen grid. Layers respond to velocity, choke groups keep hats behaving, and 32 voices leave room for fast rolls.
              </p>
            </SectionHeading>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Build the sound</p>
            <p className="max-w-xl text-base leading-relaxed text-zinc-300">
              Every pad holds three sample layers you can stack, cycle, randomize or map to velocity. Shape each one with a full envelope, filter, drive, pitch, reverse and pan. You&apos;re not picking a drum, you&apos;re building one.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['3 layers / pad', '32 voices', 'Choke groups', 'Velocity response'].map((item) => (
                <span key={item} className="border border-white/10 px-3 py-2 text-xs text-zinc-400">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:-mt-4">
            <DemoPanel />
          </div>
        </div>
      </Section>

      <Section reveal>
        <SectionHeading eyebrow="Sequence it" title="Build the rhythm directly inside Tsukuyomi.">
          <p>
            Program in 4/4, 3/4, 5/4, 6/8, 7/8 and 2/4, then shape swing, groove and Euclidean fills until the pattern moves the way you want.
          </p>
        </SectionHeading>
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductRender
            file="Sequencer - Tsukyomi Drum Engine.png"
            alt="Tsukuyomi Drum Engine step sequencer showing a programmed drum pattern"
            width={1226}
            height={882}
            className="w-full max-w-[660px] lg:justify-self-start"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <ul className="space-y-3">
            {[
              ['Drag whole beats', 'Move complete patterns into the groove, then keep shaping them.'],
              ['Drag individual pieces', 'Place single kicks, snares, hats and percussion exactly where they belong.'],
              ['Start from categorized presets', 'Browse by style, pull in a starting point and make it your own.'],
              ['Build, customize, drag', 'Combine the parts, adjust the feel and rearrange without leaving the sequencer.'],
            ].map(([title, body]) => (
              <li key={title} className="border-l border-orange-300/30 pl-4">
                <p className="font-display text-base uppercase tracking-normal text-gold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <ProductRender
            file="Left.png"
            alt="Tsukuyomi Drum Engine interface for shaping individual drum hits"
            width={1608}
            height={978}
            className="mx-auto w-full max-w-[720px]"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
          <div>
            <SectionHeading eyebrow="Make every hit matter" title="A pattern should feel human.">
              <p>
                A pattern shouldn&apos;t sound mechanical just because you drew it with a mouse. Select any step and shape what happens inside that hit.
              </p>
            </SectionHeading>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TSUKUYOMI_HIT_CONTROLS.map((control) => (
                <article key={control.title} className="border border-white/10 bg-surface-raised/60 p-4">
                  <h3 className="mb-2 font-display text-base uppercase tracking-normal text-orange-200/90">{control.title}</h3>
                  <p className="text-xs leading-relaxed text-zinc-400">{control.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center font-display text-lg uppercase tracking-normal text-zinc-300 lg:text-left">
              The pattern stops being a grid. It starts behaving like a performance.
            </p>
          </div>
        </div>
      </Section>

      <Section reveal>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Four scenes, one track" title="Build a track, not just a loop.">
              <p>
                Build a groove, a stripped-back verse, a variation and a fill. Launch them by hand or chain them. Scenes switch on the downbeat of the next loop, so your drums evolve without stopping the music.
              </p>
            </SectionHeading>
          </div>
          <ProductRender
            file="Right.png"
            alt="Tsukuyomi Drum Engine scene and performance workflow"
            width={1608}
            height={978}
            className="mb-10 w-full max-w-[680px] lg:mb-16 lg:justify-self-end"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TSUKUYOMI_SCENES.map((scene, index) => (
            <article key={scene.label} className="relative min-h-40 overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.045] to-transparent p-6">
              <span className="font-mono text-[10px] text-orange-200/70">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-8 font-display text-xl uppercase tracking-normal text-gold">{scene.label}</h3>
              <p className="mt-2 text-sm text-zinc-500">{scene.title}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Your kit" title="Your kit. Your rules.">
              <p>
                Start with the factory library, then drag in your own WAV, AIFF or FLAC files. Swap the kick, layer the hats, lock the sounds you love and randomize the rest. Happy accidents are part of the workflow.
              </p>
              <p className="mt-4 text-sm text-zinc-500">
                Prefer raw samples? Explore the{' '}
                <Link href={DRUM_BUNDLE_HREF} className="font-medium text-orange-200/90 underline decoration-orange-300/30 underline-offset-4 transition-colors hover:text-orange-100">
                  Tsukuyomi Drum Bundle
                </Link>
                .
              </p>
            </SectionHeading>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {['WAV', 'AIFF', 'FLAC', 'MONO / STEREO'].map((format) => (
                <div key={format} className="border border-white/10 bg-white/[0.025] p-4 text-center font-mono text-xs tracking-[0.16em] text-zinc-300">
                  {format}
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="border border-white/10 bg-surface-raised/60 p-6">
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Sample length</p>
                <p className="font-display text-3xl uppercase tracking-normal text-gold">Up to 30 seconds</p>
              </div>
              <div className="border border-orange-300/20 bg-orange-300/[0.06] p-6">
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-orange-200/70">The point</p>
                <p className="font-display text-2xl uppercase tracking-normal text-orange-200/90">Happy accidents are part of the workflow.</p>
              </div>
            </div>
          </div>
          <ProductScreenshot
            file="Library - Tsukyomi Drum Engine.png"
            alt="Tsukuyomi Drum Engine vertical sample library browser"
            width={440}
            height={956}
            className="mx-auto w-full max-w-[260px] lg:-mt-2"
            imageClassName="mx-auto !w-auto max-h-[485px] object-contain"
            sizes="(max-width: 1024px) 260px, 260px"
          />
        </div>
      </Section>

      <Section reveal>
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Then mix the kit" title="Every pad. Every move. Your mix.">
              <p>
                Shape all 16 pads independently, then bring the kit together through the master bus.
              </p>
            </SectionHeading>
            <ul className="space-y-3">
              {[
                ['Independent channel control', 'Set volume, pan, mute and solo on every pad.'],
                ['Shared effects', 'Send each channel to delay, reverb, chorus or parallel compression.'],
                ['Whole-kit balance', 'Keep the master simple or print a fully custom drum mix.'],
              ].map(([title, body]) => (
                <li key={title} className="border-l border-orange-300/30 pl-4">
                  <p className="font-display text-base uppercase tracking-normal text-gold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">{body}</p>
                </li>
              ))}
            </ul>
          </div>
          <ProductScreenshot
            file="Mixer - Tsukyomi Drum Engine.png"
            alt="Tsukuyomi Drum Engine 16-channel mixer with pad level and pan controls"
            width={1226}
            height={896}
            className="w-full max-w-[660px] lg:justify-self-end"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </Section>

      <Section reveal>
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <ProductScreenshot
            file="Routing - Tsukyomi Drum Engine.png"
            alt="Tsukuyomi Drum Engine routing view for individual pad outputs"
            width={1222}
            height={898}
            className="w-full max-w-[660px]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div>
            <SectionHeading eyebrow="Routing" title="One piece. One channel. No compromises.">
              <p>
                Send every piece directly to its own channel in your DAW, or keep the full kit together when the mix calls for it.
              </p>
            </SectionHeading>
            <ul className="space-y-3">
              {[
                ['Direct per-piece channels', 'Kick, snare, hats and percussion each reach the DAW on their own track.'],
                ['Independent processing', 'Shape, compress and automate every drum piece without the rest of the kit.'],
                ['Master or multitrack', 'Print the whole kit or print only the pieces that need attention.'],
              ].map(([title, body]) => (
                <li key={title} className="border-l border-orange-300/30 pl-4">
                  <p className="font-display text-base uppercase tracking-normal text-gold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section reveal>
        <SectionHeading eyebrow="ISI AUDIO Architectural Models" title="Three original EQ characters.">
          <p>
            Switch on Analog and choose an architectural model built to give the kit its own character.
          </p>
        </SectionHeading>
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {TSUKUYOMI_ANALOG_MODELS.map((model) => (
            <article key={model.name} className="min-w-[86%] snap-center overflow-hidden rounded-lg border border-white/10 bg-surface-raised/70 depth-shadow sm:min-w-[60%] lg:min-w-0">
              <ProductScreenshot
                file={model.file}
                alt={`${model.name} ISI AUDIO Architectural Model interface`}
                width={model.width}
                height={model.height}
                className="rounded-none border-0 border-b border-white/10 shadow-none"
                sizes="(max-width: 1024px) 86vw, (max-width: 1280px) 60vw, 33vw"
              />
              <div className="p-6 lg:p-8">
                <h3 className="mb-4 font-display text-2xl uppercase tracking-normal text-gold">{model.name}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{model.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section reveal>
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Compress the right drums" title="Not the whole kit.">
              <p>
                Give the kick more weight, crush the snare and keep the hats dry. Three parallel slots let each piece move on its own terms.
              </p>
              <p className="mt-4 text-zinc-200">
                Every pad feeds each compressor independently, then blends back against the dry kit.
              </p>
            </SectionHeading>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5">
              {TSUKUYOMI_COMPRESSORS.map((compressor, index) => (
                <div key={compressor} className="border border-white/10 bg-surface-raised/60 p-4 text-center">
                  <p className="font-display text-lg uppercase tracking-normal text-orange-200/90">{compressor}</p>
                  <p className="mt-2 font-mono text-[10px] text-zinc-600">0{index + 1}</p>
                </div>
              ))}
            </div>
          </div>
          <ProductScreenshot
            file="Paralell - Tsukyomi Drum Engine.png"
            alt="Tsukuyomi Drum Engine parallel compressor rack with three slots"
            width={1204}
            height={872}
            className="w-full max-w-[660px] lg:justify-self-end"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </Section>

      <Section reveal>
        <SectionHeading eyebrow="Finish the drums" title="The last stage is part of the instrument.">
          <p>
            Shape the kit, add the character you need and finish the track with Impact, three-band EQ, serial compression, saturation, lo-fi, 8-bit, volume and stereo metering built into the instrument.
          </p>
        </SectionHeading>
        <ProductScreenshot
          file="Mix and Master - Tsukyomi Drum Engine.png"
          alt="Tsukuyomi Drum Engine Mix and Master strip with impact, EQ, compression, saturation, Lo-fi, 8-bit, volume and meter controls"
          width={2514}
          height={276}
          className="w-full"
          sizes="(max-width: 1024px) 100vw, 92vw"
        />
      </Section>

      <Section reveal>
        <SectionHeading eyebrow="From idea to drum track" title="Seven steps. Keep the momentum.">
          <p>Build a kit, shape the sounds, program the groove and finish it without leaving the instrument.</p>
        </SectionHeading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TSUKUYOMI_PROCESS_STEPS.map(([number, title, body]) => (
            <article key={number} className="border border-white/10 bg-white/[0.025] p-5">
              <p className="mb-5 font-mono text-[10px] text-orange-200/70">{number}</p>
              <h3 className="mb-3 font-display text-lg uppercase tracking-normal text-gold">{title}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center font-display text-2xl uppercase tracking-normal text-gold">Then make the music.</p>
      </Section>

      <Section reveal>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <ProductRender
            file="Slanted Left.png"
            alt="Tsukuyomi Drum Engine DAW workflow and file-format interface"
            width={1608}
            height={978}
            className="w-full max-w-[680px]"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
          <div>
            <SectionHeading eyebrow="Works with your DAW" title="Keep the workflow yours.">
              <p>
                Tsukuyomi follows your host&apos;s tempo and timeline, and runs on its own clock when the DAW stops. Drag MIDI out (a full pattern or a single lane), automate what you need, and save your work as:
              </p>
            </SectionHeading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="border border-orange-300/20 bg-orange-300/[0.06] p-6 lg:p-8">
                <p className="mb-5 font-mono text-3xl text-orange-200/90">.ISI</p>
                <h3 className="mb-4 font-display text-2xl uppercase tracking-normal text-gold">The complete kit.</h3>
                <p className="text-sm leading-relaxed text-zinc-400">Samples, pads, sequencer, scenes, FX and routing.</p>
              </article>
              <article className="border border-white/10 bg-surface-raised/60 p-6 lg:p-8">
                <p className="mb-5 font-mono text-3xl text-zinc-300">.ISIS</p>
                <h3 className="mb-4 font-display text-2xl uppercase tracking-normal text-gold">The rhythm.</h3>
                <p className="text-sm leading-relaxed text-zinc-400">Pattern, scenes, tempo, meter and swing.</p>
              </article>
            </div>
            <div className="mt-6 border border-white/10 p-5 text-sm leading-relaxed text-zinc-300">
              <span className="font-semibold text-white">Available now:</span> VST3 and Standalone. An AU version is in the works.
            </div>
          </div>
        </div>
      </Section>

      <Section reveal>
        <SectionHeading eyebrow="Specs" title="The details, without the clutter." />
        <div className="overflow-hidden border border-white/10">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {TSUKUYOMI_SPECS.map(([label, value], index) => (
              <div
                key={label}
                className={`min-h-24 bg-surface-raised/50 p-5 ${
                  index < TSUKUYOMI_SPECS.length - 1 ? 'border-b border-white/[0.08]' : ''
                } ${index % 3 !== 2 ? 'lg:border-r' : ''} ${index % 2 === 0 ? 'sm:border-r' : ''} border-white/[0.08]`}
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</dt>
                <dd className="mt-2 font-display text-xl uppercase tracking-normal text-zinc-200">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-4 border border-white/10 p-4 text-sm leading-relaxed text-zinc-500">
          <span className="font-semibold text-zinc-300">System requirements:</span> Final OS and host compatibility details will be published before release. AU support is planned for a future version.
        </div>
      </Section>

      <Section reveal>
        <div className="relative overflow-hidden rounded-lg gradient-border-tsukuyomi bg-gradient-to-br from-white/[0.06] via-surface-raised/80 to-transparent p-8 depth-shadow-lg sm:p-12 lg:p-16">
          <div className="glow-orb left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-orange-500/10" aria-hidden />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-7 font-display text-4xl uppercase leading-[0.95] tracking-normal text-gold md:text-6xl">
              Take your samples to a new level.
              <br />
              <span className="text-orange-200/90">This is where your drums happen.</span>
            </h2>
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsNotifyOpen(true)}
                className="group cta-sheen inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-orange-100"
              >
                Notify me on release
                <iconify-icon icon="solar:bell-linear" width="18" height="18" />
              </button>
              <a
                href={TSUKUYOMI_DEMO_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                Watch the demo
                <iconify-icon icon="solar:play-circle-linear" width="18" height="18" />
              </a>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {TSUKUYOMI_DRUM_ENGINE.version} / {TSUKUYOMI_DRUM_ENGINE.formatLine}
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">ISI AUDIO</p>
          </div>
        </div>
      </Section>

      <ReleaseNotifyModal
        isOpen={isNotifyOpen}
        onClose={() => setIsNotifyOpen(false)}
        source="tsukuyomi_drum_engine"
      />
    </div>
  )
}
