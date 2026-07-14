import { Select } from '@/components/ui'

import { RESOURCE_ENVIRONMENT_LABELS } from '../constants'
import type { ResourceEnvironment } from '../types'

const OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'homologacao', label: RESOURCE_ENVIRONMENT_LABELS.homologacao },
  { value: 'producao', label: RESOURCE_ENVIRONMENT_LABELS.producao },
]

export interface EnvironmentFilterProps {
  value: ResourceEnvironment | 'all'
  onChange: (value: ResourceEnvironment | 'all') => void
}

export function EnvironmentFilter({ value, onChange }: EnvironmentFilterProps) {
  return (
    <Select
      label="Ambiente"
      options={OPTIONS}
      value={value}
      onChange={(event) => onChange(event.target.value as ResourceEnvironment | 'all')}
    />
  )
}
