import { useMemo, useState } from 'react'

import { Button, EmptyState, StarIcon, Toast } from '@/components/ui'
import { copyToClipboard } from '@/lib/clipboard'

import { filterResources } from '../filterResources'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useFavorites } from '../hooks/useFavorites'
import { useResources } from '../hooks/useResources'
import { useResourcesHealth } from '../hooks/useResourcesHealth'
import { useSummary } from '../hooks/useSummary'
import type { Resource } from '../types'
import { FilterBar } from './FilterBar'
import { ResourceSummaryGrid } from './ResourceSummaryGrid'
import { ResourceSummaryGridSkeleton } from './ResourceSummaryGridSkeleton'
import { ResourceTable } from './ResourceTable'
import { ResourceTableSkeleton } from './ResourceTableSkeleton'
import { SearchBar } from './SearchBar'
import { SearchContainer } from './SearchContainer'

const TOAST_DURATION_MS = 2000

export function CatalogPage() {
  const { resources, isLoading: resourcesLoading, error: resourcesError } = useResources()
  const { summary, isLoading: summaryLoading, error: summaryError } = useSummary()
  const { healthByResourceId } = useResourcesHealth()
  const { favoriteIds } = useFavorites()
  const { filters, setSearch, setType, setEnvironment, setStatus, setFavoritesOnly, clearAll } =
    useCatalogFilters()
  const [toast, setToast] = useState<{ message: string; variant: 'default' | 'error' } | null>(null)

  function showToast(message: string, variant: 'default' | 'error' = 'default') {
    setToast({ message, variant })
    setTimeout(() => setToast(null), TOAST_DURATION_MS)
  }

  async function handleCopyUrl(resource: Resource) {
    if (!resource.url) return
    const ok = await copyToClipboard(resource.url)
    showToast(
      ok ? 'URL copiada para a área de transferência' : 'Não foi possível copiar a URL.',
      ok ? 'default' : 'error',
    )
  }

  const scopedResources = useMemo(
    () =>
      filters.favoritesOnly
        ? resources.filter((resource) => favoriteIds.has(resource.id))
        : resources,
    [resources, filters.favoritesOnly, favoriteIds],
  )

  const filteredResources = useMemo(() => {
    const byIntrinsicFields = filterResources(scopedResources, {
      searchTerm: filters.search,
      type: filters.type,
      environment: filters.environment,
    })

    // Status não é um campo do Resource — vem do Health Check
    // (healthByResourceId), por isso filtra numa etapa separada de
    // filterResources.ts, que só conhece campos intrínsecos do recurso.
    if (filters.status === 'all') return byIntrinsicFields
    return byIntrinsicFields.filter(
      (resource) => (healthByResourceId.get(resource.id)?.status ?? 'unknown') === filters.status,
    )
  }, [
    scopedResources,
    filters.search,
    filters.type,
    filters.environment,
    filters.status,
    healthByResourceId,
  ])

  const hasNoFavoritesAtAll = filters.favoritesOnly && favoriteIds.size === 0

  if (resourcesError) {
    return <p className="text-danger py-8 text-center text-sm">{resourcesError}</p>
  }

  return (
    <>
      <SearchContainer>
        <SearchBar value={filters.search} onChange={setSearch} onClear={() => setSearch('')} />
      </SearchContainer>
      <div className="mt-4 sm:mt-6">
        <FilterBar
          type={filters.type}
          onTypeChange={setType}
          environment={filters.environment}
          onEnvironmentChange={setEnvironment}
          status={filters.status}
          onStatusChange={setStatus}
        />
      </div>
      <div className="mt-4 sm:mt-6">
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
      <div className="mt-4 sm:mt-6">
        {resourcesLoading ? (
          <ResourceTableSkeleton />
        ) : hasNoFavoritesAtAll ? (
          <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <EmptyState
              icon={<StarIcon />}
              title="Você ainda não possui recursos favoritos."
              description="Marque recursos como favoritos na tabela (ícone de estrela) para encontrá-los rapidamente aqui."
              action={
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setFavoritesOnly(false)}
                >
                  Ver catálogo completo
                </Button>
              }
            />
          </div>
        ) : (
          <ResourceTable
            resources={filteredResources}
            healthByResourceId={healthByResourceId}
            onClearFilters={clearAll}
            onCopyUrl={handleCopyUrl}
          />
        )}
      </div>
      <Toast message={toast?.message ?? ''} visible={toast !== null} variant={toast?.variant} />
    </>
  )
}
