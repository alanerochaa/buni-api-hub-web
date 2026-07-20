import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router'

import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (!window.history.state?.key) {
      navigate(location.pathname + location.search, { replace: true })
    }
  }, [])

  return (
    <div className="flex min-h-svh flex-col bg-neutral-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
