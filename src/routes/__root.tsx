import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="bg-black/80 min-h-screen">
      <Outlet />
    </div>
  ),
})
