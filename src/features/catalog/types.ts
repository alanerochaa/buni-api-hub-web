/**
 * Modelo definitivo aprovado na Sprint 6 — espelha exatamente
 * ingestion/src/types.ts. Substitui o placeholder da Sprint 5.
 */

export type ResourceType = 'api' | 'web-service' | 'site'
export type ResourceEnvironment = 'homologacao' | 'producao' | 'unknown'

export interface Resource {
  id: string
  type: ResourceType

  // Preparado na Sprint 17 para os próximos catálogos (mais completos):
  // quando presente, é o nome principal exibido ao usuário, tendo
  // prioridade sobre `name`. `name`/`technicalName` continuam existindo
  // (compatibilidade, uso interno) mesmo quando displayName é omitido.
  displayName?: string
  name: string
  technicalName: string
  code?: string
  url?: string

  environment: ResourceEnvironment
  category?: string
  deprecated: boolean
  active: boolean

  description?: string
  keywords: string[]
  tags: string[]

  searchIndex: string[]
}

// 'slow' adicionado na Sprint 15 (health check real): resposta válida,
// porém acima do limite de tempo configurado.
export type ResourceStatus = 'online' | 'slow' | 'offline' | 'unknown'

export interface ResourceHealth {
  resourceId: string
  status: ResourceStatus
  httpStatus?: number
  responseTime?: number
  lastCheckedAt: string
}

// Espelha api/src/types/resourceSummary.type.ts — contagens do GET /summary.
export interface ResourceSummary {
  total: number
  apis: number
  webServices: number
  sites: number
}
