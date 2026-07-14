import { Select } from '@/components/ui'

const OPTIONS = [
  { value: 'name-asc', label: 'Nome (A-Z)' },
  { value: 'name-desc', label: 'Nome (Z-A)' },
  { value: 'updated-at', label: 'Última atualização' },
  { value: 'type', label: 'Tipo' },
]

export function SortFilter() {
  return <Select label="Ordenar por" options={OPTIONS} defaultValue="name-asc" />
}
