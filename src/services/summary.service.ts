import { api } from '@/lib/axios'
import type { ResourceSummary } from '@/features/catalog'

export async function getSummary(): Promise<ResourceSummary> {
  const { data } = await api.get<ResourceSummary>('/summary')
  return data
}
