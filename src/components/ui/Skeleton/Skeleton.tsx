import type { HTMLAttributes } from 'react'

export type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-neutral-200 ${className}`}
      {...props}
    />
  )
}
