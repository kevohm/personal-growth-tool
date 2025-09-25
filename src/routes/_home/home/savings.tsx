import { createFileRoute } from '@tanstack/react-router'
import Savings from '../../../pages/Home/Saving/Savings'

export const Route = createFileRoute('/_home/home/savings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Savings/>
}
