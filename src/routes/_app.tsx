import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <div
      className="relative mx-auto h-screen max-w-md overflow-hidden bg-black text-center md:max-w-lg lg:max-w-xl"
      onTouchMove={(e) => e.preventDefault()}
    >
      <main>
        <Outlet />
      </main>
    </div>
  )
}
