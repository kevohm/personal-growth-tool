import { createFileRoute } from '@tanstack/react-router'
import AddExpense from '../../../../pages/Home/Expenses/add/AddExpense'

export const Route = createFileRoute('/_home/home/expenses/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AddExpense/>
}
