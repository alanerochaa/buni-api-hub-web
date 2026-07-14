// Barrel público da feature "catalog". Outras camadas (app/, layout/,
// outras features) só devem importar a partir daqui — nunca de
// features/catalog/components/* ou features/catalog/hooks/* diretamente.
//
// SearchBar/SearchContainer/FilterBar/ResourceSummaryGrid/ResourceTable
// não são exportados: são detalhe interno de composição do
// CatalogPage. Ícones, labels, useCatalogFilters e useResources são
// exportados porque a Sidebar e a feature resource-details precisam
// deles.
export { CatalogPage } from './components/CatalogPage'
export { ResourceStatusBadge } from './components/ResourceStatusBadge'
export { ResourceSummaryCard } from './components/ResourceSummaryCard'
export type { ResourceSummaryCardProps } from './components/ResourceSummaryCard'
export { RESOURCE_ENVIRONMENT_LABELS, RESOURCE_TYPE_LABELS } from './constants'
export { getResourceDisplayName } from './getResourceDisplayName'
export type { CatalogFilters } from './hooks/useCatalogFilters'
export { useCatalogFilters } from './hooks/useCatalogFilters'
export { useFavorites } from './hooks/useFavorites'
export { useResources } from './hooks/useResources'
export { useResourcesHealth } from './hooks/useResourcesHealth'
export { ApiIcon, SiteIcon, WebServiceIcon } from './icons'
export type {
  Resource,
  ResourceEnvironment,
  ResourceHealth,
  ResourceStatus,
  ResourceSummary,
  ResourceType,
} from './types'
