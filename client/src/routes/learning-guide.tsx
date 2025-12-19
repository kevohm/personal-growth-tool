import { createFileRoute } from '@tanstack/react-router'
import LearningPage from '../pages/Learning'

export const Route = createFileRoute('/learning-guide')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LearningPage/>
}
