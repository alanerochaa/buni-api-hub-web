import { normalizeSearchTerm } from './normalizeSearchTerm'
import type { Resource, ResourceEnvironment, ResourceType } from './types'

export interface ResourceFilters {
  searchTerm: string
  type: ResourceType | 'all'
  environment: ResourceEnvironment | 'all'
}

/**
 * Cada palavra do termo digitado precisa aparecer em pelo menos uma
 * entrada do searchIndex (AND entre palavras, OR dentro de cada
 * palavra) — permite digitar "consulta banco" e encontrar
 * "Consulta de Bancos" sem exigir substring exata.
 */
function matchesSearchTerm(resource: Resource, searchTerm: string): boolean {
  const normalized = normalizeSearchTerm(searchTerm)
  if (!normalized) return true

  const words = normalized.split(/\s+/).filter(Boolean)
  return words.every((word) => resource.searchIndex.some((entry) => entry.includes(word)))
}

export function filterResources(resources: Resource[], filters: ResourceFilters): Resource[] {
  return resources.filter((resource) => {
    if (filters.type !== 'all' && resource.type !== filters.type) return false
    if (filters.environment !== 'all' && resource.environment !== filters.environment) return false
    return matchesSearchTerm(resource, filters.searchTerm)
  })
}
