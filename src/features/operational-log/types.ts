import type { ResourceEnvironment, ResourceType } from '@/features/catalog'

export type OperationalLogStatus = 'online' | 'offline' | 'maintenance' | 'unknown'

export type OperationalLogOrigin = 'scheduled-sweep' | 'manual'


export interface OperationalEvent {
  id: string
  timestamp: string
  resourceId: string
  resourceName: string
  resourceType: ResourceType
  previousStatus: OperationalLogStatus
  currentStatus: OperationalLogStatus
  reason: string
  responseTime?: number
  httpStatus?: number

  environment?: ResourceEnvironment
  resourceUrl?: string
  errorMessage?: string
  unavailabilityDurationMs?: number
  origin?: OperationalLogOrigin
}

export interface OperationalLogFilters {
  resourceId?: string
  status?: OperationalLogStatus
  environment?: ResourceEnvironment
  since?: string
  until?: string
}
