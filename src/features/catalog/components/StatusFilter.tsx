import { Select } from '@/components/ui'

import { RESOURCE_STATUS_CONFIG } from '../constants'
import type { ResourceStatus } from '../types'

// Derivado de RESOURCE_STATUS_CONFIG — a mesma fonte de verdade usada
// pelo ResourceStatusBadge (tabela e tela de detalhes). Um status novo
// adicionado ali aparece aqui automaticamente, sem editar este arquivo.
const OPTIONS = [
  { value: 'all', label: 'Todos' },
  ...(Object.keys(RESOURCE_STATUS_CONFIG) as ResourceStatus[]).map((status) => ({
    value: status,
    label: RESOURCE_STATUS_CONFIG[status].label,
  })),
]

export interface StatusFilterProps {
  value: ResourceStatus | 'all'
  onChange: (value: ResourceStatus | 'all') => void
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Select
      label="Status"
      options={OPTIONS}
      value={value}
      onChange={(event) => onChange(event.target.value as ResourceStatus | 'all')}
    />
  )
}
