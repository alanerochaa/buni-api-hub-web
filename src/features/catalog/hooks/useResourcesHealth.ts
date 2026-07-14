import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { listResourceHealth } from '@/services/health.service'

import type { ResourceHealth } from '../types'

export interface UseResourcesHealthResult {
  healthByResourceId: Map<string, ResourceHealth>
  isLoading: boolean
}

// Deve ficar >= ao intervalo de varredura do backend (api/.env,
// HEALTH_CHECK_INTERVAL_MS, default 60s) — pedir mais rápido que isso
// só devolveria o mesmo dado, sobrecarregando a API à toa.
const HEALTH_REFETCH_INTERVAL_MS = 60_000

/**
 * Busca o health de todos os recursos numa única chamada (não um
 * GET /health/resources/:id por linha da tabela) e devolve um Map para
 * lookup O(1) por linha. Se a chamada falhar, healthByResourceId fica
 * vazio — cada linha cai no fallback "Desconhecido" já embutido no
 * ResourceStatusBadge, sem quebrar a tabela.
 */
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
