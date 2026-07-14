import { useSearchParams } from 'react-router'

import { RESOURCE_STATUS_CONFIG } from '../constants'
import type { ResourceEnvironment, ResourceStatus, ResourceType } from '../types'

const VALID_TYPES: readonly (ResourceType | 'all')[] = ['all', 'api', 'web-service', 'site']
const VALID_ENVIRONMENTS: readonly (ResourceEnvironment | 'all')[] = [
  'all',
  'homologacao',
  'producao',
]
// Derivado de RESOURCE_STATUS_CONFIG (fonte única de verdade dos
// status possíveis) — se um status novo for adicionado ali, o filtro
// passa a aceitá-lo automaticamente, sem precisar tocar aqui.
const VALID_STATUSES: readonly (ResourceStatus | 'all')[] = [
  'all',
  ...(Object.keys(RESOURCE_STATUS_CONFIG) as ResourceStatus[]),
]

function parseType(raw: string | null): ResourceType | 'all' {
  return VALID_TYPES.includes(raw as ResourceType | 'all') ? (raw as ResourceType | 'all') : 'all'
}

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

export interface CatalogFilters {
  search: string
  type: ResourceType | 'all'
  environment: ResourceEnvironment | 'all'
  status: ResourceStatus | 'all'
  favoritesOnly: boolean
}

export interface UseCatalogFiltersResult {
  filters: CatalogFilters
  setSearch: (value: string) => void
  setType: (value: ResourceType | 'all') => void
  setEnvironment: (value: ResourceEnvironment | 'all') => void
  setStatus: (value: ResourceStatus | 'all') => void
  setFavoritesOnly: (value: boolean) => void
  setView: (type: ResourceType | 'all', favoritesOnly: boolean) => void
  clearAll: () => void
}

/**
 * Busca, Tipo, Ambiente, Status e Favoritos vivem na URL (?search=&
 * type=&environment=&status=&favorites=), não em useState local — é
 * o que permite atualizar a página, copiar o link e voltar da tela de
 * detalhes sem perder o que estava filtrado. Todas as escritas usam
 * `replace` (não `push`): um filtro digitado letra a letra não deve
 * virar uma pilha de entradas no histórico do navegador — só
 * navegações de verdade (catálogo -> detalhes) devem.
 *
 * `setSearchParams` do react-router calcula o `prev` a partir do
 * `searchParams` do render atual (fechamento), não encadeia entre
 * chamadas — duas chamadas síncronas de `setSearchParams` no mesmo
 * handler (ex.: setType() seguido de setFavoritesOnly()) fazem a
 * segunda pisar na primeira, porque ambas partem do mesmo `prev`
 * desatualizado. Por isso `setView` existe: sempre que mais de um
 * parâmetro precisa mudar junto (Sidebar trocando de "visão"), a
 * atualização tem que ser uma única chamada a `setSearchParams`.
 */
export function useCatalogFilters(): UseCatalogFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: CatalogFilters = {
    search: searchParams.get('search') ?? '',
    type: parseType(searchParams.get('type')),
    environment: parseEnvironment(searchParams.get('environment')),
    status: parseStatus(searchParams.get('status')),
    favoritesOnly: searchParams.get('favorites') === '1',
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
    setType: (value) => updateParams({ type: value }),
    setEnvironment: (value) => updateParams({ environment: value }),
    setStatus: (value) => updateParams({ status: value }),
    setFavoritesOnly: (value) => updateParams({ favorites: value ? '1' : '' }),
    setView: (type, favoritesOnly) => updateParams({ type, favorites: favoritesOnly ? '1' : '' }),
    clearAll: () =>
      setSearchParams(
        (prev) => {
          const updated = new URLSearchParams(prev)
          updated.delete('search')
          updated.delete('type')
          updated.delete('environment')
          updated.delete('status')
          updated.delete('favorites')
          return updated
        },
        { replace: true },
      ),
  }
}
