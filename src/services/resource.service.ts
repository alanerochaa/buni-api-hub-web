import axios from 'axios'

import { api } from '@/lib/axios'
import type { Resource } from '@/features/catalog'

export async function listResources(): Promise<Resource[]> {
  const { data } = await api.get<Resource[]>('/resources')
  return data
}

/**
 * 404 é resultado de negócio válido (recurso não existe), não uma
 * falha técnica — devolvemos null em vez de propagar o erro, para que
 * a tela de detalhes mostre "recurso não encontrado" em vez de uma
 * mensagem genérica de erro. (React Query trata queryFn retornando
 * `undefined` como erro de configuração; `null` é o valor válido para
 * "sem dado".)
 */
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
