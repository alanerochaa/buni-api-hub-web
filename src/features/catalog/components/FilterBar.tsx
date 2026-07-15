import type { ResourceEnvironment, ResourceStatus } from '../types'
import { EnvironmentFilter } from './EnvironmentFilter'
import { SortFilter } from './SortFilter'
import { StatusFilter } from './StatusFilter'

export interface FilterBarProps {
  environment: ResourceEnvironment | 'all'
  onEnvironmentChange: (value: ResourceEnvironment | 'all') => void
  status: ResourceStatus | 'all'
  onStatusChange: (value: ResourceStatus | 'all') => void
}

/**
 * Sem filtro de Tipo aqui de propósito: qual tipo de recurso aparece
 * é decidido pela rota (/apis, /web-services, /sites — ver
 * CatalogPage), não por um filtro dentro da própria tela.
 */
export function FilterBar({
  environment,
  onEnvironmentChange,
  status,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      <EnvironmentFilter value={environment} onChange={onEnvironmentChange} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <SortFilter />
    </div>
  )
}
