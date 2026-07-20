import { Navigate, useParams } from 'react-router'

import { paths } from '@/routes'

export function LegacyViewResourceRedirect() {
  const { resourceId } = useParams<{ resourceId: string }>()
  return <Navigate to={paths.admin.viewResource.getHref(resourceId ?? '')} replace />
}

export function LegacyEditResourceRedirect() {
  const { resourceId } = useParams<{ resourceId: string }>()
  return <Navigate to={paths.admin.editResource.getHref(resourceId ?? '')} replace />
}
