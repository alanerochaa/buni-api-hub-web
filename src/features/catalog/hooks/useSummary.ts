import { useQuery } from '@tanstack/react-query'

import { getErrorMessage } from '@/lib/errors'
import { getSummary } from '@/services/summary.service'

import type { ResourceSummary } from '../types'

export interface UseSummaryResult {
  summary: ResourceSummary | undefined
  isLoading: boolean
  error: string | null
}

export function useSummary(): UseSummaryResult {
  const query = useQuery({ queryKey: ['summary'], queryFn: getSummary })

  return {
    summary: query.data,
    isLoading: query.isLoading,
    error: query.isError
      ? getErrorMessage(query.error, 'Não foi possível carregar o resumo.')
      : null,
  }
}
