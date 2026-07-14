import { Card, Skeleton } from '@/components/ui'

/** Mesma forma do ResourceSummaryGrid real (3 cards, ícone + título + número + descrição). */
export function ResourceSummaryGridSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((key) => (
        <Card key={key} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 shrink-0 rounded-lg" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        </Card>
      ))}
    </div>
  )
}
