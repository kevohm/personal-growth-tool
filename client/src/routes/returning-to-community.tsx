import { createFileRoute } from '@tanstack/react-router'
import CommunityReturningGuide from '../pages/CommunityReturningGuide'

export const Route = createFileRoute('/returning-to-community')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CommunityReturningGuide/>
}
