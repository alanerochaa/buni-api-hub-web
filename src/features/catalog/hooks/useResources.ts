import { useQuery } from '@tanstack/react-query'

import { getErrorMessage } from '@/lib/errors'
import { listResources } from '@/services/resource.service'

import type { Resource } from '../types'

export interface UseResourcesResult {
  resources: Resource[]
  isLoading: boolean
  error: string | null
}

/**
 * queryKey ['resources'] é compartilhada por qualquer componente que
 * monte este hook — o React Query deduplica automaticamente chamadas
 * simultâneas e reaproveita o cache (staleTime configurado em
 * lib/queryClient.ts) ao voltar do detalhe para o catálogo.
 */
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
