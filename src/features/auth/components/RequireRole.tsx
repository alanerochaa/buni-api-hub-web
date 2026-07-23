import { Navigate, Outlet } from 'react-router'

import { paths } from '@/routes'
import type { Role } from '@/services/auth.service'

import { useAuth } from '../useAuth'

export interface RequireRoleProps {
  roles: Role[]
}

export function RequireRole({ roles }: RequireRoleProps) {
  const { user } = useAuth()

  if (!user || !roles.includes(user.role)) {
    return <Navigate to={paths.accessDenied.getHref()} replace />
  }

  return <Outlet />
}
