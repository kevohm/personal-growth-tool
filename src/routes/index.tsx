import { createFileRoute } from '@tanstack/react-router'
import Landing from '../pages/Landing/Landing'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Landing/>
}
