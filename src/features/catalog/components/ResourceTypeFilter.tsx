import { Select } from '@/components/ui'

import { RESOURCE_TYPE_LABELS } from '../constants'
import type { ResourceType } from '../types'

const OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'api', label: RESOURCE_TYPE_LABELS.api },
  { value: 'web-service', label: RESOURCE_TYPE_LABELS['web-service'] },
  { value: 'site', label: RESOURCE_TYPE_LABELS.site },
]

export interface ResourceTypeFilterProps {
  value: ResourceType | 'all'
  onChange: (value: ResourceType | 'all') => void
}

export function ResourceTypeFilter({ value, onChange }: ResourceTypeFilterProps) {
  return (
    <Select
      label="Tipo"
      options={OPTIONS}
      value={value}
      onChange={(event) => onChange(event.target.value as ResourceType | 'all')}
    />
  )
}
