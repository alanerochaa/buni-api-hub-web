import { StarIcon } from '@/components/ui'

import { RESOURCE_TYPE_LABELS } from '../constants'
import { ApiIcon, SiteIcon, WebServiceIcon } from '../icons'
import { ResourceSummaryCard } from './ResourceSummaryCard'

export interface ResourceSummaryCounts {
  apis: number
  webServices: number
  sites: number
  favorites: number
}

export interface ResourceSummaryGridProps {
  counts: ResourceSummaryCounts
}

export function ResourceSummaryGrid({ counts }: ResourceSummaryGridProps) {
  const items = [
    {
      key: 'api',
      title: RESOURCE_TYPE_LABELS.api,
      description: 'APIs Catalogadas.',
      icon: <ApiIcon />,
      iconClassName: 'bg-blue-600 text-white',
      count: counts.apis,
    },
    {
      key: 'web-service',
      title: RESOURCE_TYPE_LABELS['web-service'],
      description: 'Web Services Catalogados.',
      icon: <WebServiceIcon />,
      iconClassName: 'bg-emerald-600 text-white',
      count: counts.webServices,
    },
    {
      key: 'site',
      title: RESOURCE_TYPE_LABELS.site,
      description: 'Sites Catalogados.',
      icon: <SiteIcon />,
      iconClassName: 'bg-purple-600 text-white',
      count: counts.sites,
    },
    {
      key: 'favorites',
      title: 'Favoritos',
      description: 'Total de recursos favoritados.',
      icon: <StarIcon filled className="size-6" />,
      iconClassName: 'bg-amber-500 text-white',
      count: counts.favorites,
    },
  ] as const

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
