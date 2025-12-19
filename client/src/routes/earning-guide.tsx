import { createFileRoute } from '@tanstack/react-router'
import FinancialLearningGuide from '../pages/FinancialLearningGuide'

export const Route = createFileRoute('/earning-guide')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FinancialLearningGuide/>
}
