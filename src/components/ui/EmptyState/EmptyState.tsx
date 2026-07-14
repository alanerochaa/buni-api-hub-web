import type { ReactNode } from 'react'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

/**
 * Genérico e sem conhecimento de domínio — não sabe se é uma tabela de
 * recursos vazia, uma lista de favoritos vazia ou um resultado de busca
 * vazio. Quem consome define texto/ícone/ação (ex.: um botão "Limpar
 * filtros") — o EmptyState só organiza o layout.
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
      {icon && (
        <span className="flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          {icon}
        </span>
      )}
      <p className="text-sm font-medium text-neutral-700">{title}</p>
      {description && <p className="text-sm text-neutral-500">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
