import type { HTMLAttributes } from 'react'

export type SkeletonProps = HTMLAttributes<HTMLDivElement>

/**
 * Bloco genérico de carregamento — não sabe o que representa (uma
 * linha de texto, um ícone, um número). Quem consome define largura e
 * altura via className para reproduzir a forma do conteúdo real.
 */
export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-neutral-200 ${className}`}
      {...props}
    />
  )
}
