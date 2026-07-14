import { StarIcon } from '@/components/ui'

import { RESOURCE_TYPE_LABELS } from '../constants'
import { ApiIcon, SiteIcon, WebServiceIcon } from '../icons'
import type { ResourceSummary } from '../types'
import { ResourceSummaryCard } from './ResourceSummaryCard'

export interface ResourceSummaryGridProps {
  summary: ResourceSummary
  favoritesCount: number
}

/**
 * Contagens de API/Web Service/Site vêm do GET /summary (agregação
 * feita no backend); Favoritos é só localStorage (useFavorites, via
 * useSyncExternalStore) — por isso chega como prop separada, não faz
 * parte do ResourceSummary que a API devolve.
 */
export function ResourceSummaryGrid({ summary, favoritesCount }: ResourceSummaryGridProps) {
  const items = [
    {
      key: 'api',
      title: RESOURCE_TYPE_LABELS.api,
      description: 'Total de APIs cadastradas.',
      icon: <ApiIcon />,
      iconClassName: 'bg-blue-600 text-white',
      count: summary.apis,
    },
    {
      key: 'web-service',
      title: RESOURCE_TYPE_LABELS['web-service'],
      description: 'Total de Web Services cadastrados.',
      icon: <WebServiceIcon />,
      iconClassName: 'bg-emerald-600 text-white',
      count: summary.webServices,
    },
    {
      key: 'site',
      title: RESOURCE_TYPE_LABELS.site,
      description: 'Total de Sites cadastrados.',
      icon: <SiteIcon />,
      iconClassName: 'bg-purple-600 text-white',
      count: summary.sites,
    },
    {
      key: 'favorites',
      title: 'Favoritos',
      description: 'Total de recursos favoritados.',
      icon: <StarIcon filled className="size-6" />,
      iconClassName: 'bg-amber-500 text-white',
      count: favoritesCount,
    },
  ] as const

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <ResourceSummaryCard
          key={item.key}
          icon={item.icon}
          title={item.title}
          count={item.count}
          description={item.description}
          iconClassName={item.iconClassName}
        />
      ))}
    </div>
  )
}
