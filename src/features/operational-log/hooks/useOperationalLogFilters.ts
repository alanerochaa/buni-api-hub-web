import { useMemo, useState } from 'react'

import { normalizeSearchTerm } from '@/features/catalog'
import type { ResourceEnvironment } from '@/features/catalog'

import type { OperationalEvent, OperationalLogFilters, OperationalLogStatus } from '../types'

export interface OperationalLogFiltersState {
  resourceId: string | 'all'
  status: OperationalLogStatus | 'all'
  environment: ResourceEnvironment | 'all'
  since: string
  until: string
  search: string
}

export interface UseOperationalLogFiltersResult {
  filters: OperationalLogFiltersState
  setResourceId: (value: string) => void
  setStatus: (value: OperationalLogStatus | 'all') => void
  setEnvironment: (value: ResourceEnvironment | 'all') => void
  setSince: (value: string) => void
  setUntil: (value: string) => void
  setSearch: (value: string) => void
  serverFilters: OperationalLogFilters
  applySearch: (events: OperationalEvent[]) => OperationalEvent[]
}

const INITIAL_FILTERS: OperationalLogFiltersState = {
  resourceId: 'all',
  status: 'all',
  environment: 'all',
  since: '',
  until: '',
  search: '',
}

function startOfDayIso(date: string): string {
  return new Date(`${date}T00:00:00`).toISOString()
}

function endOfDayIso(date: string): string {
  return new Date(`${date}T23:59:59.999`).toISOString()
}

export function useOperationalLogFilters(): UseOperationalLogFiltersResult {
  const [filters, setFilters] = useState<OperationalLogFiltersState>(INITIAL_FILTERS)

  const serverFilters = useMemo<OperationalLogFilters>(
    () => ({
      resourceId: filters.resourceId !== 'all' ? filters.resourceId : undefined,
      status: filters.status !== 'all' ? filters.status : undefined,
      environment: filters.environment !== 'all' ? filters.environment : undefined,
      since: filters.since ? startOfDayIso(filters.since) : undefined,
      until: filters.until ? endOfDayIso(filters.until) : undefined,
    }),
    [filters.resourceId, filters.status, filters.environment, filters.since, filters.until],
  )

  function applySearch(events: OperationalEvent[]): OperationalEvent[] {
    const search = normalizeSearchTerm(filters.search)
    if (!search) return events
    return events.filter((event) => {
      const haystack = normalizeSearchTerm(`${event.resourceName} ${event.reason}`)
      return haystack.includes(search)
    })
  }

  return {
    filters,
    setResourceId: (value) => setFilters((prev) => ({ ...prev, resourceId: value })),
    setStatus: (value) => setFilters((prev) => ({ ...prev, status: value })),
    setEnvironment: (value) => setFilters((prev) => ({ ...prev, environment: value })),
    setSince: (value) => setFilters((prev) => ({ ...prev, since: value })),
    setUntil: (value) => setFilters((prev) => ({ ...prev, until: value })),
    setSearch: (value) => setFilters((prev) => ({ ...prev, search: value })),
    serverFilters,
    applySearch,
  }
}
