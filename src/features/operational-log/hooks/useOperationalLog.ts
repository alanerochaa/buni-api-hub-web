import { useQuery } from '@tanstack/react-query'

import { getErrorMessage } from '@/lib/errors'
import { listOperationalLog } from '@/services/operationalLog.service'

import type { OperationalEvent, OperationalLogFilters } from '../types'

export interface UseOperationalLogResult {
  events: OperationalEvent[]
  isLoading: boolean
  error: string | null
}

export function useOperationalLog(filters: OperationalLogFilters = {}): UseOperationalLogResult {
  const query = useQuery({
    queryKey: ['dashboard', 'events', filters],
    queryFn: () => listOperationalLog(filters),
  })

  return {
    events: query.data ?? [],
    isLoading: query.isLoading,
    error: query.isError
      ? getErrorMessage(query.error, 'Não foi possível carregar o log operacional.')
      : null,
  }
}
