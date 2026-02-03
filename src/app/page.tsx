import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { EmailCapture } from '@/components/forms/EmailCapture'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Container bordered className="flex flex-col text-center pt-32 pb-24 items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300 mb-8 uppercase tracking-wider aura-reveal">
          <iconify-icon icon="solar:star-linear" width="16" height="16" />
          Culture Over Category
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter gradient-text mb-6 max-w-5xl mx-auto leading-[1.1] aura-reveal"
          style={{ animationDelay: '100ms' }}
        >
          ISIATA
        </h1>

        <p
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal aura-reveal"
          style={{ animationDelay: '200ms' }}
        >
          Sound, objects, tools, and access. Limited offerings for intentional creators.
        </p>

        <div className="aura-reveal" style={{ animationDelay: '300ms' }}>
          <Button href="/explore" size="lg">
            Explore
            <iconify-icon icon="solar:arrow-right-linear" width="16" height="16" className="ml-2" />
          </Button>
        </div>
      </Container>

      {/* Featured Items */}
      <Section reveal>
        <Container bordered className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Sound */}
            <a
              href="/sound"
              className="group flashlight-card relative aspect-square overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-8"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <div className="relative z-10 text-center">
                <iconify-icon
                  icon="solar:music-library-2-linear"
                  width="48"
                  height="48"
                  className="text-white mb-4 mx-auto"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">Sound</h3>
                <p className="text-sm text-zinc-400">Releases, playlists, visual media</p>
              </div>
            </a>

            {/* Featured Objects */}
            <a
              href="/objects"
              className="group flashlight-card relative aspect-square overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-8"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <div className="relative z-10 text-center">
                <iconify-icon
                  icon="solar:shop-2-linear"
                  width="48"
                  height="48"
                  className="text-white mb-4 mx-auto"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">Objects</h3>
                <p className="text-sm text-zinc-400">Fashion drops, garments, accessories</p>
              </div>
            </a>

            {/* Featured Tools */}
            <a
              href="/tools"
              className="group flashlight-card relative aspect-square overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-8"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
              }}
            >
              <div className="relative z-10 text-center">
                <iconify-icon
                  icon="solar:diskette-linear"
                  width="48"
                  height="48"
                  className="text-white mb-4 mx-auto"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">Tools</h3>
                <p className="text-sm text-zinc-400">Sample packs, plugins, digital products</p>
              </div>
            </a>
          </div>
        </Container>
      </Section>

      {/* Mailing List */}
      <Section reveal>
        <Container bordered className="py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-zinc-400 mb-8">
              Early access to private releases and limited offerings.
            </p>
            <div className="flex justify-center">
              <EmailCapture source="homepage" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
