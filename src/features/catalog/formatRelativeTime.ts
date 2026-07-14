/**
 * Formata um timestamp ISO em texto relativo curto ("há 2 min"). Não
 * usa date-fns/dayjs — a necessidade é pequena o suficiente para não
 * justificar uma nova dependência (mesmo raciocínio de
 * normalizeSearchTerm.ts).
 */
export function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const diffSeconds = Math.round(diffMs / 1000)

  if (diffSeconds < 10) return 'agora mesmo'
  if (diffSeconds < 60) return `há ${diffSeconds} s`

  const diffMinutes = Math.round(diffSeconds / 60)
  if (diffMinutes < 60) return `há ${diffMinutes} min`

  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return `há ${diffHours} h`

  const diffDays = Math.round(diffHours / 24)
  return `há ${diffDays} d`
}
