import { Card, Skeleton } from '@/components/ui'

export function ResourceDetailsSkeleton() {
  return (
    <div>
      <Skeleton className="mb-4 h-4 w-16" />

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <Skeleton className="h-6 w-64" />
          <div className="mt-2 flex gap-2">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-24" />
        </div>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-1.5 h-4 w-32" />
            </div>
          ))}
        </dl>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-2 h-4 w-full max-w-md" />
      </Card>

      <Card className="mt-4 sm:mt-6">
        <Skeleton className="mb-2 h-3 w-16" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <Skeleton className="mb-2 h-3 w-20" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </Card>

      <Skeleton className="mt-4 h-3 w-20 sm:mt-6" />
      <div className="mt-2 flex flex-col gap-3">
        <Card className="h-28" />
        <Card className="h-28" />
      </div>
    </div>
  )
}
