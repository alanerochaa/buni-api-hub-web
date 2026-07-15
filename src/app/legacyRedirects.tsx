import { Navigate, useParams } from 'react-router'

import { paths } from '@/routes'

// Redireciona URLs antigas (pré /cadastro-recursos) para o link
// equivalente novo, preservando o :resourceId — evita quebrar
// favoritos de navegador ou links já compartilhados apontando para
// /admin/recursos/...
export function LegacyViewResourceRedirect() {
  const { resourceId } = useParams<{ resourceId: string }>()
  return <Navigate to={paths.admin.viewResource.getHref(resourceId ?? '')} replace />
}

export function LegacyEditResourceRedirect() {
  const { resourceId } = useParams<{ resourceId: string }>()
  return <Navigate to={paths.admin.editResource.getHref(resourceId ?? '')} replace />
}
