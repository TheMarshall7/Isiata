import { Container } from '@/components/ui/Container'
import { ServicesSubnav } from '@/components/services/ServicesSubnav'

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container bordered className="relative z-20 pt-28 md:pt-32">
        <ServicesSubnav />
      </Container>
      {children}
    </>
  )
}
