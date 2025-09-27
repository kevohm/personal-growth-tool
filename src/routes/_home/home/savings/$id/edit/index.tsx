import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/home/savings/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/home/savings/$id/edit/"!</div>
}
