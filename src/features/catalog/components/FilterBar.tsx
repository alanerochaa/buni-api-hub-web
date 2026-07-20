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
