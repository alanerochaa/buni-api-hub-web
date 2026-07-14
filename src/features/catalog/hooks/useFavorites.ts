import { useSyncExternalStore } from 'react'

import { getSnapshot, subscribe, toggleFavorite } from '../favoritesStore'

export interface UseFavoritesResult {
  favoriteIds: Set<string>
  isFavorite: (resourceId: string) => boolean
  toggleFavorite: (resourceId: string) => void
}

export function useFavorites(): UseFavoritesResult {
  const favoriteIds = useSyncExternalStore(subscribe, getSnapshot)

  return {
    favoriteIds,
    isFavorite: (resourceId) => favoriteIds.has(resourceId),
    toggleFavorite,
  }
}
