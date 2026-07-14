import type { HTMLAttributes } from 'react'

export type SearchContainerProps = HTMLAttributes<HTMLElement>

export function SearchContainer({ className = '', ...props }: SearchContainerProps) {
  return (
    <section
      aria-label="Pesquisar recursos"
      className={`w-full py-4 sm:py-6 ${className}`}
      {...props}
    />
  )
}
