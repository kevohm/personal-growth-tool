import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/home/savings/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/home/savings/add"!</div>
}
