import { createFileRoute } from '@tanstack/react-router'
import Expenses from '../../../pages/Home/Expenses/Expenses'

export const Route = createFileRoute('/_home/home/expenses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Expenses/>
}
