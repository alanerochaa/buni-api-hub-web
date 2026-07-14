import { RESOURCE_STATUS_CONFIG } from '../constants'
import type { ResourceStatus } from '../types'

export interface ResourceStatusBadgeProps {
  status: ResourceStatus
}

export function ResourceStatusBadge({ status }: ResourceStatusBadgeProps) {
  const { label, dotClassName } = RESOURCE_STATUS_CONFIG[status]

  return (
    <span className="inline-flex items-center gap-1.5 text-neutral-600">
      <span className={`size-2 shrink-0 rounded-full ${dotClassName}`} aria-hidden="true" />
      {label}
    </span>
  )
}
