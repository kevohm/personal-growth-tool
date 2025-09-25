import { createFileRoute } from '@tanstack/react-router'
import Earnings from '../../../pages/Home/Earnings/Earnings'

export const Route = createFileRoute('/_home/home/earnings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Earnings/>
}
