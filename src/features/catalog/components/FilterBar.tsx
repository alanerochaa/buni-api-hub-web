import type { ResourceEnvironment, ResourceStatus, ResourceType } from '../types'
import { EnvironmentFilter } from './EnvironmentFilter'
import { ResourceTypeFilter } from './ResourceTypeFilter'
import { SortFilter } from './SortFilter'
import { StatusFilter } from './StatusFilter'

export interface FilterBarProps {
  type: ResourceType | 'all'
  onTypeChange: (value: ResourceType | 'all') => void
  environment: ResourceEnvironment | 'all'
  onEnvironmentChange: (value: ResourceEnvironment | 'all') => void
  status: ResourceStatus | 'all'
  onStatusChange: (value: ResourceStatus | 'all') => void
}

/**
 * Grid responsivo: 1 coluna no mobile, 2 no tablet, 4 no desktop.
 *
 * Tipo, Ambiente e Status filtram de verdade. Ordenar por continua
 * decorativo — ordenação está fora do escopo desta sprint.
 */
export function FilterBar({
  type,
  onTypeChange,
  environment,
  onEnvironmentChange,
  status,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ResourceTypeFilter value={type} onChange={onTypeChange} />
      <EnvironmentFilter value={environment} onChange={onEnvironmentChange} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <SortFilter />
    </div>
  )
}
