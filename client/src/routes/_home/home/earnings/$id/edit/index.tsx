import { createFileRoute } from '@tanstack/react-router'
import EditEarning from '../../../../../../pages/Home/Earnings/edit/EditEarning'

export const Route = createFileRoute('/_home/home/earnings/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EditEarning/>
}
