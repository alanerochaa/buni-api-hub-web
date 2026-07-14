import axios from 'axios'

/**
 * Erros de negócio (ex.: 404) chegam do backend como { error: string }
 * (ver api/src/middleware/errorHandler.ts) — priorizamos essa mensagem
 * sobre o texto técnico do Axios ("Network Error" etc.), que não é
 * amigável para exibir ao usuário.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string } | undefined
    if (typeof data?.error === 'string') return data.error
  }
  return fallback
}
