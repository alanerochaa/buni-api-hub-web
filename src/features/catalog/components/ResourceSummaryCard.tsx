import type { ReactNode } from 'react'

import { Card } from '@/components/ui'

export interface ResourceSummaryCardProps {
  icon: ReactNode
  title: string
  count: number
  description: string
  iconClassName?: string
}

export function ResourceSummaryCard({
  icon,
  title,
  count,
  description,
  iconClassName = 'bg-brand-100 text-brand-800',
}: ResourceSummaryCardProps) {
  return (
    <Card className="!p-3 flex flex-col gap-2 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          {icon}
        </span>
        <p className="text-sm font-medium text-neutral-600">{title}</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-neutral-900">{count}</p>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
    </Card>
  )
}
