import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/home/expenses/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/home/expenses/$id/"!</div>
}
