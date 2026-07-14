import { useQuery } from '@tanstack/react-query'

import type { Resource } from '@/features/catalog'
import { getErrorMessage } from '@/lib/errors'
import { getResourceById } from '@/services/resource.service'

export interface UseResourceResult {
  resource: Resource | undefined
  isLoading: boolean
  error: string | null
}

export function useResource(id: string | undefined): UseResourceResult {
  const query = useQuery({
    queryKey: ['resource', id],
    queryFn: () => getResourceById(id as string),
    enabled: Boolean(id),
  })

  return {
    resource: query.data ?? undefined,
    isLoading: query.isLoading,
    error: query.isError
      ? getErrorMessage(query.error, 'Não foi possível carregar o recurso.')
      : null,
  }
}
