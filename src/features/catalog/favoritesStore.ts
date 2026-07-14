const STORAGE_KEY = 'buni-api-hub:favorites'

function readFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

let favoriteIds = readFromStorage()
const listeners = new Set<() => void>()

function persist(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favoriteIds)))
  } catch {
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot(): Set<string> {
  return favoriteIds
}

export function toggleFavorite(resourceId: string): void {
  const next = new Set(favoriteIds)
  if (next.has(resourceId)) {
    next.delete(resourceId)
  } else {
    next.add(resourceId)
  }
  favoriteIds = next
  persist()
  for (const listener of listeners) listener()
}
