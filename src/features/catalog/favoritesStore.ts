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
    // localStorage indisponível (modo privado, quota excedida) — o
    // estado em memória desta aba continua funcionando normalmente,
    // só não sobrevive a um reload.
  }
}

/**
 * Store simples fora do React (Set em memória + localStorage), lido
 * via useSyncExternalStore em useFavorites.ts. Um evento 'storage' do
 * navegador só dispara em OUTRAS abas — dentro da mesma aba, o
 * pub/sub abaixo é quem avisa os componentes que o estado mudou.
 */
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
