import type { ResourceEnvironment, ResourceStatus, ResourceType } from './types'

// Fonte única dos rótulos exibidos — usada tanto pelos filtros
// (ResourceTypeFilter/EnvironmentFilter) quanto pela tabela
// (ResourceTableRow), para não duplicar o mapeamento valor -> texto
// em mais de um lugar.
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

// Cores em tons "semáforo", no mesmo padrão de badges já usado nos
// sistemas internos da Buni: verde/âmbar/vermelho/cinza.
export const RESOURCE_STATUS_CONFIG: Record<
  ResourceStatus,
  { label: string; dotClassName: string }
> = {
  online: { label: 'Online', dotClassName: 'bg-emerald-500' },
  slow: { label: 'Lento', dotClassName: 'bg-amber-500' },
  offline: { label: 'Offline', dotClassName: 'bg-red-500' },
  unknown: { label: 'Desconhecido', dotClassName: 'bg-neutral-300' },
}
