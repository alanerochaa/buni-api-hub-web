import { useSearchParams } from 'react-router'

import { RESOURCE_STATUS_CONFIG } from '../constants'
import type { ResourceEnvironment, ResourceStatus } from '../types'

const VALID_ENVIRONMENTS: readonly (ResourceEnvironment | 'all')[] = ['all', 'homologacao', 'producao']
const VALID_STATUSES: readonly (ResourceStatus | 'all')[] = [
  'all',
  ...(Object.keys(RESOURCE_STATUS_CONFIG) as ResourceStatus[]),
]

function parseEnvironment(raw: string | null): ResourceEnvironment | 'all' {
  return VALID_ENVIRONMENTS.includes(raw as ResourceEnvironment | 'all')
    ? (raw as ResourceEnvironment | 'all')
    : 'all'
}

function parseStatus(raw: string | null): ResourceStatus | 'all' {
  return VALID_STATUSES.includes(raw as ResourceStatus | 'all')
    ? (raw as ResourceStatus | 'all')
    : 'all'
}

/**
 * Só pesquisa/ambiente/status — o que continua sendo "filtro
 * temporário" via query string. Tipo e favoritos deixaram de existir
 * aqui: qual "view" está aberta (APIs, Web Services, Sites,
 * Favoritos, Início) é decidido pela rota (ver app/router.tsx e
 * CatalogPage), nunca por ?type=/?favorites=.
 */
export interface CatalogFilters {
  search: string
  environment: ResourceEnvironment | 'all'
  status: ResourceStatus | 'all'
}

export interface UseCatalogFiltersResult {
  filters: CatalogFilters
  setSearch: (value: string) => void
  setEnvironment: (value: ResourceEnvironment | 'all') => void
  setStatus: (value: ResourceStatus | 'all') => void
  clearAll: () => void
}

export function useCatalogFilters(): UseCatalogFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: CatalogFilters = {
    search: searchParams.get('search') ?? '',
    environment: parseEnvironment(searchParams.get('environment')),
    status: parseStatus(searchParams.get('status')),
  }

  function updateParams(updates: Record<string, string>) {
    setSearchParams(
      (prev) => {
        const updated = new URLSearchParams(prev)
        for (const [name, value] of Object.entries(updates)) {
          if (!value || value === 'all') {
            updated.delete(name)
          } else {
            updated.set(name, value)
          }
        }
        return updated
      },
      { replace: true },
    )
  }

  return {
    filters,
    setSearch: (value) => updateParams({ search: value }),
    setEnvironment: (value) => updateParams({ environment: value }),
    setStatus: (value) => updateParams({ status: value }),
    clearAll: () =>
      setSearchParams(
        (prev) => {
          const updated = new URLSearchParams(prev)
          updated.delete('search')
          updated.delete('environment')
          updated.delete('status')
          return updated
        },
        { replace: true },
      ),
  }
}
