import { useQuery } from '@tanstack/react-query'

import { getErrorMessage } from '@/lib/errors'
import { listResources } from '@/services/resource.service'

import type { Resource } from '../types'

export interface UseResourcesResult {
  resources: Resource[]
  isLoading: boolean
  error: string | null
}
export function useResources(): UseResourcesResult {
  const query = useQuery({ queryKey: ['resources'], queryFn: listResources })

  return {
    resources: query.data ?? [],
    isLoading: query.isLoading,
    error: query.isError
      ? getErrorMessage(query.error, 'Não foi possível carregar o catálogo.')
      : null,
  }
}
