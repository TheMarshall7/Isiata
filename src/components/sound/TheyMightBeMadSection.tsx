import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { THEY_MIGHT_BE_MAD_EP } from '@/lib/sound/releases'

export function TheyMightBeMadSection() {
  return (
    <Section reveal>
      <Container bordered className="py-24 md:py-32">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
            Sound
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald uppercase tracking-tight text-white leading-tight">
            They Might Be Mad
          </h2>
          <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
            The EP. Out now on all platforms.
          </p>
        </div>

        <div className="border border-white/10 bg-surface-raised depth-shadow overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-square lg:aspect-auto overflow-hidden">
              <img
                src={THEY_MIGHT_BE_MAD_EP.cover}
                alt={THEY_MIGHT_BE_MAD_EP.displayTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 md:p-12 lg:p-14 flex flex-col">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 py-1">
                  {THEY_MIGHT_BE_MAD_EP.type}
                </span>
                <span className="text-xs text-zinc-600">{THEY_MIGHT_BE_MAD_EP.date}</span>
                <span className="text-xs text-zinc-600">{THEY_MIGHT_BE_MAD_EP.runtime}</span>
                <span className="text-xs text-red-400/80 border border-red-400/20 px-2 py-0.5">
                  {THEY_MIGHT_BE_MAD_EP.advisory}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-oswald uppercase tracking-tight text-white mb-6">
                {THEY_MIGHT_BE_MAD_EP.displayTitle}
              </h3>

              <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8">
                {THEY_MIGHT_BE_MAD_EP.notes}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href={THEY_MIGHT_BE_MAD_EP.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
                >
                  <iconify-icon icon="mdi:spotify" width="18" height="18" />
                  Spotify
                </a>
                <a
                  href={THEY_MIGHT_BE_MAD_EP.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 rounded-full text-sm text-white transition-colors"
                >
                  <iconify-icon icon="mdi:apple" width="18" height="18" />
                  Apple Music
                </a>
                <Link
                  href={THEY_MIGHT_BE_MAD_EP.soundHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 rounded-full text-sm transition-colors"
                >
                  Full discography
                  <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" />
                </Link>
              </div>

              <div className="border-t border-white/5 pt-6 mt-auto">
                <ol className="space-y-3">
                  {THEY_MIGHT_BE_MAD_EP.tracks.map((track) => (
                    <li
                      key={track.number}
                      className="flex items-baseline gap-4 text-sm text-zinc-400"
                    >
                      <span className="text-zinc-600 w-4 shrink-0 tabular-nums">{track.number}</span>
                      <span className="text-zinc-300">{track.title}</span>
                      {'featuring' in track && track.featuring && (
                        <span className="text-zinc-600 text-xs">feat. {track.featuring}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
