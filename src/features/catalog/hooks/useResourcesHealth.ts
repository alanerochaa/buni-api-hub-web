import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { listResourceHealth } from '@/services/health.service'

import type { ResourceHealth } from '../types'

export interface UseResourcesHealthResult {
  healthByResourceId: Map<string, ResourceHealth>
  isLoading: boolean
}

const HEALTH_REFETCH_INTERVAL_MS = 60_000

export function useResourcesHealth(): UseResourcesHealthResult {
  const query = useQuery({
    queryKey: ['health', 'resources'],
    queryFn: listResourceHealth,
    refetchInterval: HEALTH_REFETCH_INTERVAL_MS,
  })

  const healthByResourceId = useMemo(() => {
    const map = new Map<string, ResourceHealth>()
    for (const health of query.data ?? []) {
      map.set(health.resourceId, health)
    }
    return map
  }, [query.data])

  return { healthByResourceId, isLoading: query.isLoading }
}
