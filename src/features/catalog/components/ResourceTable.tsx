import { Button, EmptyState } from '@/components/ui'

import type { Resource, ResourceHealth } from '../types'
import { ResourceTableHeader } from './ResourceTableHeader'
import { ResourceTableRow } from './ResourceTableRow'

function NoResultsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-6"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M8 11h6" />
    </svg>
  )
}

export interface ResourceTableProps {
  resources: Resource[]
  healthByResourceId: Map<string, ResourceHealth>
  onClearFilters?: () => void
  onCopyUrl: (resource: Resource) => void
}

export function ResourceTable({
  resources,
  healthByResourceId,
  onClearFilters,
  onCopyUrl,
}: ResourceTableProps) {
  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-white shadow-sm">
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <colgroup>
          <col style={{ width: '2.75rem' }} />
          <col />
          <col style={{ width: '20rem' }} />
          <col style={{ width: '7rem' }} />
          <col style={{ width: '8.5rem' }} />
          <col style={{ width: '8rem' }} />
          <col style={{ width: '10rem' }} />
          <col style={{ width: '8rem' }} />
        </colgroup>
        <ResourceTableHeader />
        <tbody>
          {resources.map((resource) => (
            <ResourceTableRow
              key={resource.id}
              resource={resource}
              health={healthByResourceId.get(resource.id)}
              onCopyUrl={onCopyUrl}
            />
          ))}
        </tbody>
      </table>
      {resources.length === 0 && (
        <EmptyState
          icon={<NoResultsIcon />}
          title="Nenhum recurso encontrado"
          description="Ajuste os filtros ou tente outra pesquisa."
          action={
            onClearFilters && (
              <Button type="button" variant="secondary" size="sm" onClick={onClearFilters}>
                Limpar filtros
              </Button>
            )
          }
        />
      )}
    </div>
  )
}
