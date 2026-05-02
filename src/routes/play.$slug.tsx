import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/play/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/play/$slug"!</div>
}
