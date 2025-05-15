import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative mx-auto h-screen max-w-md overflow-hidden bg-black text-center md:max-w-lg lg:max-w-xl">
      <main>
        <Outlet />
      </main>
    </div>
  )
}
