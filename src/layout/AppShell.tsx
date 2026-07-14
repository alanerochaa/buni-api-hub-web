import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router'

import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()

  // A entrada de histórico criada pelo carregamento inicial da página
  // (não por um navigate() do react-router) não tem a `key` que a
  // <ScrollRestoration> usa para associar posições de scroll — sem
  // isso, "voltar" para a primeira tela da sessão nunca restaura a
  // posição certa. Substituir essa entrada por uma gerada pelo próprio
  // router (replace, sem criar item novo no histórico) resolve isso.
  // Roda uma única vez, no primeiro mount do AppShell (a rota raiz).
  useEffect(() => {
    if (!window.history.state?.key) {
      navigate(location.pathname + location.search, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Topo em navegações novas, posição restaurada em voltar/avançar — nativo do react-router. */}
      <ScrollRestoration />
    </div>
  )
}
