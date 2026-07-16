import type { ResourceEnvironment, ResourceType } from '@/features/catalog'

// Espelha api/src/types/dashboard.type.ts (DashboardResourceStatus) — não
// reaproveita o `ResourceStatus` do catálogo (online/slow/offline/unknown)
// porque o domínio do Log Operacional é o do Health Check operacional,
// que inclui "maintenance" e não tem "slow".
export type OperationalLogStatus = 'online' | 'offline' | 'maintenance' | 'unknown'

// Espelha api/src/models/operationalLog.model.ts::OperationalLogOrigin.
export type OperationalLogOrigin = 'scheduled-sweep' | 'manual'

// Espelha api/src/models/operationalLog.model.ts (OperationalEvent) — um
// registro do Log Operacional por transição real de status de um
// recurso monitorado. Campos a partir de `environment` são opcionais —
// eventos persistidos antes da Sprint 3 não os têm.
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

// Espelha api/src/models/operationalLog.model.ts::OperationalLogFilters —
// os únicos critérios resolvidos no servidor (GET /dashboard/events?...);
// a pesquisa por texto livre continua client-side (ver useOperationalLogFilters).
export interface OperationalLogFilters {
  resourceId?: string
  status?: OperationalLogStatus
  environment?: ResourceEnvironment
  since?: string
  until?: string
}
