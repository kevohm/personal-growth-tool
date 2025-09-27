import { createFileRoute } from '@tanstack/react-router'
import EditExpense from '../../../../../../pages/Home/Expenses/edit/EditExpense'

export const Route = createFileRoute('/_home/home/expenses/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EditExpense/>
}
