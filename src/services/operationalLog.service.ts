import { api } from '@/lib/axios'
import type { OperationalEvent, OperationalLogFilters } from '@/features/operational-log'

export async function listOperationalLog(filters: OperationalLogFilters = {}): Promise<OperationalEvent[]> {
  const { data } = await api.get<OperationalEvent[]>('/dashboard/events', { params: filters })
  return data
}
