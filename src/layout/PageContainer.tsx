import type { HTMLAttributes } from 'react'

export type PageContainerProps = HTMLAttributes<HTMLDivElement>

export function PageContainer({ className = '', ...props }: PageContainerProps) {
  return <div className={`max-w-content mx-auto w-full px-6 lg:px-10 ${className}`} {...props} />
}
