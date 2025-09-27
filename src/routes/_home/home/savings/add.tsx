import { createFileRoute } from '@tanstack/react-router'
import AddSaving from '../../../../pages/Home/Saving/add/AddSaving'

export const Route = createFileRoute('/_home/home/savings/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AddSaving/>
}
