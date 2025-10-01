import { createFileRoute } from '@tanstack/react-router'
import EditSaving from '../../../../../../pages/Home/Saving/edit/EditSaving'

export const Route = createFileRoute('/_home/home/savings/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EditSaving/>
}
