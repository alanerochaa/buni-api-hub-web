import type { HTMLAttributes } from 'react'

export type SearchContainerProps = HTMLAttributes<HTMLElement>

/**
 * Envelope de seção da área de pesquisa: só cuida do ritmo vertical
 * (espaçamento em relação ao Header/próxima seção) dentro do
 * PageContainer já aplicado pelo AppShell — não repete a lógica de
 * largura máxima, que é responsabilidade única do PageContainer.
 */
export function SearchContainer({ className = '', ...props }: SearchContainerProps) {
  return (
    <section
      aria-label="Pesquisar recursos"
      className={`w-full py-4 sm:py-6 ${className}`}
      {...props}
    />
  )
}
