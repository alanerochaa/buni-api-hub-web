import { useMemo, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router'

import {
  Button,
  DEFAULT_PAGE_SIZE,
  EmptyState,
  Pagination,
  StarIcon,
  useToast,
} from '@/components/ui'
import { copyToClipboard } from '@/lib/clipboard'
import { SUCCESS_MESSAGES } from '@/lib/toastMessages'
import { paths } from '@/routes'

import { filterResources } from '../filterResources'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useFavorites } from '../hooks/useFavorites'
import { useResources } from '../hooks/useResources'
import { useResourcesHealth } from '../hooks/useResourcesHealth'
import { useSummary } from '../hooks/useSummary'
import type { Resource, ResourceType } from '../types'
import { FilterBar } from './FilterBar'
import { ResourceSummaryGrid } from './ResourceSummaryGrid'
import { ResourceSummaryGridSkeleton } from './ResourceSummaryGridSkeleton'
import { ResourceTable } from './ResourceTable'
import { ResourceTableSkeleton } from './ResourceTableSkeleton'
import { SearchBar } from './SearchBar'
import { SearchContainer } from './SearchContainer'

/**
 * Qual "módulo" está aberto (Início/APIs/Web Services/Sites/
 * Favoritos) é decidido pela rota que renderizou esta página (ver
 * app/router.tsx) — nunca por query param. `search`/`environment`/
 * `status` continuam em query string, via useCatalogFilters.
 */
export type CatalogView = 'all' | ResourceType | 'favorites'

export interface CatalogPageProps {
  view: CatalogView
}

const LEGACY_TYPE_HREF: Record<string, string> = {
  api: paths.apis.getHref(),
  'web-service': paths.webServices.getHref(),
  site: paths.sites.getHref(),
}

export function CatalogPage({ view }: CatalogPageProps) {
  const type: ResourceType | 'all' = view === 'favorites' ? 'all' : view
  const favoritesOnly = view === 'favorites'

  const { resources, isLoading: resourcesLoading, error: resourcesError } = useResources()
  const { summary, isLoading: summaryLoading, error: summaryError } = useSummary()
  const { healthByResourceId } = useResourcesHealth()
  const { favoriteIds } = useFavorites()
  const { filters, setSearch, setEnvironment, setStatus, clearAll } = useCatalogFilters()
  const { showToast } = useToast()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [legacySearchParams] = useSearchParams()

  async function handleCopyUrl(resource: Resource) {
    if (!resource.url) return
    const ok = await copyToClipboard(resource.url)
    showToast(
      ok ? SUCCESS_MESSAGES.urlCopied : 'Não foi possível copiar a URL.',
      ok ? 'success' : 'error',
    )
  }

  const scopedResources = useMemo(
    () =>
      favoritesOnly ? resources.filter((resource) => favoriteIds.has(resource.id)) : resources,
    [resources, favoritesOnly, favoriteIds],
  )

  const filteredResources = useMemo(() => {
    const byIntrinsicFields = filterResources(scopedResources, {
      searchTerm: filters.search,
      type,
      environment: filters.environment,
    })

    if (filters.status === 'all') return byIntrinsicFields
    return byIntrinsicFields.filter(
      (resource) => (healthByResourceId.get(resource.id)?.status ?? 'unknown') === filters.status,
    )
  }, [scopedResources, filters.search, type, filters.environment, filters.status, healthByResourceId])

  // Sem efeito dedicado para "voltar à página 1 ao trocar filtro": o
  // clamp abaixo (Math.min) já garante que a página exibida nunca fica
  // além do novo total, sem precisar sincronizar estado em um efeito.
  const pageCount = Math.max(1, Math.ceil(filteredResources.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageItems = filteredResources.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPage(1)
  }

  const hasNoFavoritesAtAll = favoritesOnly && favoriteIds.size === 0

  // Compatibilidade com links antigos (?type=api, ?favorites=1) — só
  // faz sentido checar na rota raiz ("/"), que é quem recebia esses
  // parâmetros antes da migração para /apis, /web-services, /sites e
  // /favoritos.
  if (view === 'all') {
    if (legacySearchParams.get('favorites') === '1') {
      return <Navigate to={paths.favorites.getHref()} replace />
    }
    const legacyType = legacySearchParams.get('type')
    if (legacyType && legacyType in LEGACY_TYPE_HREF) {
      return <Navigate to={LEGACY_TYPE_HREF[legacyType]} replace />
    }
  }

  if (resourcesError) {
    return <p className="text-danger py-8 text-center text-sm">{resourcesError}</p>
  }

  return (
    <div className="flex flex-col">
      {/* Filtros + cards de resumo: contexto da tela, não agem sobre a
          tabela linha a linha — por isso ficam agrupados e separados
          da pesquisa por uma divisória. */}
      <div className="shrink-0">
        <FilterBar
          environment={filters.environment}
          onEnvironmentChange={setEnvironment}
          status={filters.status}
          onStatusChange={setStatus}
        />
      </div>
      <div className="mt-3 shrink-0">
        {summaryLoading ? (
          <ResourceSummaryGridSkeleton />
        ) : summaryError || !summary ? (
          <p className="text-danger py-4 text-center text-sm">
            {summaryError ?? 'Não foi possível carregar o resumo.'}
          </p>
        ) : (
          <ResourceSummaryGrid summary={summary} favoritesCount={favoriteIds.size} />
        )}
      </div>

      {/* Pesquisa: age diretamente sobre os registros da tabela abaixo
          — fica visualmente associada a ela, não ao bloco de contexto
          acima. */}
      <SearchContainer className="mt-4 shrink-0 border-t border-neutral-200 pt-4">
        <SearchBar value={filters.search} onChange={setSearch} onClear={() => setSearch('')} />
      </SearchContainer>

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        {resourcesLoading ? (
          <ResourceTableSkeleton />
        ) : hasNoFavoritesAtAll ? (
          <div className="flex-1 overflow-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
            <EmptyState
              icon={<StarIcon />}
              title="Você ainda não possui recursos favoritos."
              description="Marque recursos como favoritos na tabela (ícone de estrela) para encontrá-los rapidamente aqui."
              action={
                <Link to={paths.catalog.getHref()}>
                  <Button type="button" variant="secondary" size="sm">
                    Ver catálogo completo
                  </Button>
                </Link>
              }
            />
          </div>
        ) : (
          <>
            <div
              className="min-h-64 flex-1 overflow-auto"
              style={{ maxHeight: 'calc(100svh - var(--spacing-header) - 22rem)' }}
            >
              <ResourceTable
                resources={pageItems}
                healthByResourceId={healthByResourceId}
                onClearFilters={clearAll}
                onCopyUrl={handleCopyUrl}
              />
            </div>
            {filteredResources.length > 0 && (
              <div className="shrink-0 pt-3">
                <Pagination
                  page={currentPage}
                  pageCount={pageCount}
                  pageSize={pageSize}
                  totalItems={filteredResources.length}
                  onPageChange={setPage}
                  onPageSizeChange={handlePageSizeChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
