import { Navigate, Outlet, useLocation } from 'react-router'

import { paths } from '@/routes'

import { useAuth } from '../useAuth'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={paths.login.getHref()} replace state={{ from: location }} />
  }

  return <Outlet />
}
