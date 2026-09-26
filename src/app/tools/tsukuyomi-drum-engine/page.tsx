import { Container } from '@/components/ui/Container'
import { TsukuyomiDrumEngineLanding } from '@/components/tools/TsukuyomiDrumEngineLanding'

export default function TsukuyomiDrumEnginePage() {
  return (
    <Container bordered className="w-full min-w-0 pb-20 pt-28 sm:pt-32">
      <TsukuyomiDrumEngineLanding />
    </Container>
  )
}
