import { api } from '@/lib/axios'
import type { Resource, ResourceEnvironment, ResourceType } from '@/features/catalog'

export interface ResourceInput {
  name: string
  type: ResourceType
  url: string
  environment: ResourceEnvironment
  active: boolean
  description?: string
  docUrl?: string
  responsible?: string
  area?: string
  notes?: string
  code?: string
  keywords?: string[]
  tags?: string[]
}

export async function createResource(input: ResourceInput): Promise<Resource> {
  const { data } = await api.post<Resource>('/resources', input)
  return data
}

export async function updateResource(id: string, input: Partial<ResourceInput>): Promise<Resource> {
  const { data } = await api.put<Resource>(`/resources/${id}`, input)
  return data
}

export async function deleteResource(id: string): Promise<void> {
  await api.delete(`/resources/${id}`)
}
