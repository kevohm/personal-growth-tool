import { createFileRoute } from '@tanstack/react-router'
import AddEarning from '../../../../pages/Home/Earnings/add/AddEarning'

export const Route = createFileRoute('/_home/home/earnings/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AddEarning/>
}
