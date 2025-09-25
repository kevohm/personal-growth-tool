import { createFileRoute } from '@tanstack/react-router'
import HomeWrapper from '../pages/Home/HomeWrapper'

export const Route = createFileRoute('/_home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HomeWrapper/>
}
