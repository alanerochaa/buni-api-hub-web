export type ResourceType = 'api' | 'web-service' | 'site'
export type ResourceEnvironment = 'homologacao' | 'producao' | 'unknown'

export interface Resource {
  id: string
  type: ResourceType
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

export type ResourceStatus = 'online' | 'slow' | 'offline' | 'unknown'

export interface ResourceHealth {
  resourceId: string
  status: ResourceStatus
  httpStatus?: number
  responseTime?: number
  lastCheckedAt: string
}

export interface ResourceSummary {
  total: number
  apis: number
  webServices: number
  sites: number
}
