import type { ResourceEnvironment, ResourceType } from '@/features/catalog'

export interface ResourceFormValues {
  name: string
  description: string
  type: ResourceType
  url: string
  docUrl: string
  responsible: string
  area: string
  keywords: string
  environment: ResourceEnvironment
  active: boolean
  notes: string
}

export const EMPTY_FORM_VALUES: ResourceFormValues = {
  name: '',
  description: '',
  type: 'api',
  url: '',
  docUrl: '',
  responsible: '',
  area: '',
  keywords: '',
  environment: 'producao',
  active: true,
  notes: '',
}
