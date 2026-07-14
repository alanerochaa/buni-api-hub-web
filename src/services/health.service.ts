import { api } from '@/lib/axios'
import type { ResourceHealth } from '@/features/catalog'

export async function listResourceHealth(): Promise<ResourceHealth[]> {
  const { data } = await api.get<ResourceHealth[]>('/health/resources')
  return data
}
