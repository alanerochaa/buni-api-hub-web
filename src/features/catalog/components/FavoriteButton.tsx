import { StarIcon, useToast } from '@/components/ui'
import { SUCCESS_MESSAGES } from '@/lib/toastMessages'

import { useFavorites } from '../hooks/useFavorites'

export interface FavoriteButtonProps {
  resourceId: string
}

export function FavoriteButton({ resourceId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const favorited = isFavorite(resourceId)

  function handleClick() {
    toggleFavorite(resourceId)
    showToast(favorited ? SUCCESS_MESSAGES.favoriteRemoved : SUCCESS_MESSAGES.favoriteAdded)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={favorited}
      className={`focus-visible:ring-brand-700 rounded-md p-1.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
        favorited
          ? 'text-amber-500 hover:text-amber-600'
          : 'text-neutral-300 hover:text-neutral-500'
      }`}
    >
      <StarIcon filled={favorited} />
    </button>
  )
}
