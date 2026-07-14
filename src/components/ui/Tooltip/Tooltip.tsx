import type { ReactNode } from 'react'

export interface TooltipProps {
  label: string
  children: ReactNode
}

/**
 * CSS puro (group-hover/group-focus-within) — sem JS, sem posição
 * calculada em runtime. Aparece tanto no hover do mouse quanto no
 * foco por teclado, para não ser uma informação só visual.
 */
export function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-md bg-neutral-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {label}
      </span>
    </span>
  )
}
