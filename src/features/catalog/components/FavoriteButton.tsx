import { StarIcon } from '@/components/ui'

import { useFavorites } from '../hooks/useFavorites'

export interface FavoriteButtonProps {
  resourceId: string
}

/**
 * Botão compacto (só ícone) usado na tabela. Lê/escreve direto no
 * useFavorites — não recebe estado via props, então qualquer linha da
 * tabela pode favoritar/desfavoritar sem a CatalogPage precisar saber.
 */
export function FavoriteButton({ resourceId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(resourceId)

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(resourceId)}
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
