/** "3min 12s", "1h 05min", "45s" — sem casas decimais, granularidade de segundo. */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}min`
  if (minutes > 0) return `${minutes}min ${String(seconds).padStart(2, '0')}s`
  return `${seconds}s`
}
