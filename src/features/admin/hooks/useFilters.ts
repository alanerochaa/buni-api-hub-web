import { useMemo, useState } from 'react'

import { normalizeSearchTerm } from '@/features/catalog'
import type { Resource, ResourceEnvironment, ResourceType } from '@/features/catalog'

export interface AdminFilters {
  search: string
  type: ResourceType | 'all'
  environment: ResourceEnvironment | 'all'
  active: 'all' | 'active' | 'inactive'
}

export interface UseFiltersResult {
  filters: AdminFilters
  setSearch: (value: string) => void
  setType: (value: ResourceType | 'all') => void
  setEnvironment: (value: ResourceEnvironment | 'all') => void
  setActive: (value: AdminFilters['active']) => void
  filteredResources: Resource[]
}

const INITIAL_FILTERS: AdminFilters = { search: '', type: 'all', environment: 'all', active: 'all' }

export function useFilters(resources: Resource[]): UseFiltersResult {
  const [filters, setFilters] = useState<AdminFilters>(INITIAL_FILTERS)

  const filteredResources = useMemo(() => {
    const search = normalizeSearchTerm(filters.search)

    return resources.filter((resource) => {
      if (filters.type !== 'all' && resource.type !== filters.type) return false
      if (filters.environment !== 'all' && resource.environment !== filters.environment) return false
      if (filters.active === 'active' && !resource.active) return false
      if (filters.active === 'inactive' && resource.active) return false
      if (search && !normalizeSearchTerm(resource.name).includes(search)) return false
      return true
    })
  }, [resources, filters])

  return {
    filters,
    setSearch: (value) => setFilters((prev) => ({ ...prev, search: value })),
    setType: (value) => setFilters((prev) => ({ ...prev, type: value })),
    setEnvironment: (value) => setFilters((prev) => ({ ...prev, environment: value })),
    setActive: (value) => setFilters((prev) => ({ ...prev, active: value })),
    filteredResources,
  }
}
