import type { BadgeProps } from '@/components/ui'

import type { OperationalLogStatus } from './types'

export const OPERATIONAL_LOG_STATUS_LABELS: Record<OperationalLogStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  maintenance: 'Em Manutenção',
  unknown: 'Desconhecido',
}

export const OPERATIONAL_LOG_STATUS_BADGE_VARIANT: Record<
  OperationalLogStatus,
  NonNullable<BadgeProps['variant']>
> = {
  online: 'success',
  offline: 'danger',
  maintenance: 'warning',
  unknown: 'neutral',
}

export const OPERATIONAL_LOG_STATUS_OPTIONS: { value: OperationalLogStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos os status' },
  { value: 'online', label: OPERATIONAL_LOG_STATUS_LABELS.online },
  { value: 'offline', label: OPERATIONAL_LOG_STATUS_LABELS.offline },
  { value: 'maintenance', label: OPERATIONAL_LOG_STATUS_LABELS.maintenance },
  { value: 'unknown', label: OPERATIONAL_LOG_STATUS_LABELS.unknown },
]

export const OPERATIONAL_LOG_ENVIRONMENT_OPTIONS = [
  { value: 'all', label: 'Todos os ambientes' },
  { value: 'producao', label: 'Produção' },
  { value: 'homologacao', label: 'Homologação' },
  { value: 'desenvolvimento', label: 'Desenvolvimento' },
] as const
