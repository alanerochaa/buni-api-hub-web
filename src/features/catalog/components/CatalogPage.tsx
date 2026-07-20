import { useEffect, useMemo, useState } from 'react'
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
import { pruneFavorites } from '../favoritesStore'
import { getResourceIdentityKey } from '../getResourceIdentityKey'
import { groupResourcesByIdentity, projectResourceGroupToEnvironment } from '../groupResourcesByIdentity'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useFavorites } from '../hooks/useFavorites'
import { useResources } from '../hooks/useResources'
import { useResourcesHealth } from '../hooks/useResourcesHealth'
import type { Resource, ResourceType } from '../types'
import { FilterBar } from './FilterBar'
import { ResourceSummaryGrid } from './ResourceSummaryGrid'
import { ResourceSummaryGridSkeleton } from './ResourceSummaryGridSkeleton'
import { ResourceTable } from './ResourceTable'
import { ResourceTableSkeleton } from './ResourceTableSkeleton'
import { SearchBar } from './SearchBar'
import { SearchContainer } from './SearchContainer'

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
  const { healthByResourceId } = useResourcesHealth()
  const { favoriteIds } = useFavorites()
  const { filters, setSearch, setEnvironment, setStatus, clearAll } = useCatalogFilters()
  const { showToast } = useToast()
  const [page, setPage] = useState(1)
  const [legacySearchParams] = useSearchParams()
  const pageSize = DEFAULT_PAGE_SIZE

  async function handleCopyUrl(resource: Resource) {
    if (!resource.url) return
    const ok = await copyToClipboard(resource.url)
    showToast(
      ok ? SUCCESS_MESSAGES.urlCopied : 'Não foi possível copiar a URL.',
      ok ? 'success' : 'error',
    )
  }

  
  useEffect(() => {
    if (resourcesLoading || resourcesError || resources.length === 0) return
    pruneFavorites(new Set(resources.map((resource) => getResourceIdentityKey(resource))))
  }, [resources, resourcesLoading, resourcesError])

  const searchAndStatusFilteredResources = useMemo(() => {
    const byIntrinsicFields = filterResources(resources, {
      searchTerm: filters.search,
      type: 'all',
      environment: 'all',
    })

    if (filters.status === 'all') return byIntrinsicFields
    return byIntrinsicFields.filter(
      (resource) => (healthByResourceId.get(resource.id)?.status ?? 'unknown') === filters.status,
    )
  }, [resources, filters.search, filters.status, healthByResourceId])

  const allResourceGroups = useMemo(
    () => groupResourcesByIdentity(searchAndStatusFilteredResources, healthByResourceId),
    [searchAndStatusFilteredResources, healthByResourceId],
  )


  const groupedResources = useMemo(() => {
    let groups = allResourceGroups

    if (favoritesOnly) {
      groups = groups.filter((group) => favoriteIds.has(getResourceIdentityKey(group)))
    }
    if (type !== 'all') {
      groups = groups.filter((group) => group.type === type)
    }
    const environmentFilter = filters.environment
    if (environmentFilter === 'all') return groups

    return groups.flatMap((group) => {
      const view = projectResourceGroupToEnvironment(group, environmentFilter)
      return view ? [view] : []
    })
  }, [allResourceGroups, favoritesOnly, favoriteIds, type, filters.environment])

  const summaryCounts = useMemo(
    () => ({
      apis: allResourceGroups.filter((group) => group.type === 'api').length,
      webServices: allResourceGroups.filter((group) => group.type === 'web-service').length,
      sites: allResourceGroups.filter((group) => group.type === 'site').length,
      favorites: allResourceGroups.filter((group) => favoriteIds.has(getResourceIdentityKey(group)))
        .length,
    }),
    [allResourceGroups, favoriteIds],
  )

  const pageCount = Math.max(1, Math.ceil(groupedResources.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageItems = groupedResources.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const hasNoFavoritesAtAll = favoritesOnly && favoriteIds.size === 0

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
      <div className="shrink-0">
        <FilterBar
          environment={filters.environment}
          onEnvironmentChange={setEnvironment}
          status={filters.status}
          onStatusChange={setStatus}
        />
      </div>
      <div className="mt-3 shrink-0">
        {resourcesLoading ? (
          <ResourceSummaryGridSkeleton />
        ) : (
          <ResourceSummaryGrid counts={summaryCounts} />
        )}
      </div>

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
              style={{ maxHeight: 'calc(100svh - var(--spacing-header) - 20rem)' }}
            >
              <ResourceTable
                resources={pageItems}
                healthByResourceId={healthByResourceId}
                environmentFilter={filters.environment}
                onClearFilters={clearAll}
                onCopyUrl={handleCopyUrl}
              />
            </div>
            <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  )
}
