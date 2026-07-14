import axios from 'axios'

import { api } from '@/lib/axios'
import type { Resource } from '@/features/catalog'

export async function listResources(): Promise<Resource[]> {
  const { data } = await api.get<Resource[]>('/resources')
  return data
}
export async function getResourceById(id: string): Promise<Resource | null> {
  try {
    const { data } = await api.get<Resource>(`/resources/${id}`)
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw error
  }
}
