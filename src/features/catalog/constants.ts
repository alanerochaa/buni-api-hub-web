import type { ResourceEnvironment, ResourceStatus, ResourceType } from './types'

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  api: 'API',
  'web-service': 'Web Service',
  site: 'Site',
}

export const RESOURCE_ENVIRONMENT_LABELS: Record<ResourceEnvironment, string> = {
  homologacao: 'Homologação',
  producao: 'Produção',
  unknown: 'Desconhecido',
}

export const RESOURCE_STATUS_CONFIG: Record<
  ResourceStatus,
  { label: string; dotClassName: string }
> = {
  online: { label: 'Online', dotClassName: 'bg-emerald-500' },
  slow: { label: 'Lento', dotClassName: 'bg-amber-500' },
  offline: { label: 'Offline', dotClassName: 'bg-red-500' },
  unknown: { label: 'Desconhecido', dotClassName: 'bg-neutral-300' },
}
