import type { ReactNode } from 'react'

export interface TableColumn<T> {
  key: string
  header: string
  sortable?: boolean
  /** Largura da coluna (ex.: '6rem', '96px'). Colunas sem width dividem o espaço restante. */
  width?: string
  align?: 'left' | 'center' | 'right'
  render: (row: T) => ReactNode
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  rows: T[]
  getRowKey: (row: T) => string
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: string) => void
  className?: string
}

const ALIGN_CLASSES = { left: 'text-left', center: 'text-center', right: 'text-right' } as const

function SortIcon({ direction }: { direction?: 'asc' | 'desc' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`size-3.5 shrink-0 transition-transform ${direction === 'desc' ? 'rotate-180' : ''} ${
        direction ? 'text-neutral-700' : 'text-neutral-300'
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/**
 * Tabela genérica reutilizável para telas administrativas (a do
 * catálogo continua própria). Não define rolagem/borda — quem consome
 * envolve num container com overflow, necessário para o header sticky.
 */
export function Table<T>({
  columns,
  rows,
  getRowKey,
  sortKey,
  sortDirection,
  onSort,
  className = '',
}: TableProps<T>) {
  return (
    <table className={`w-full table-fixed text-left text-sm ${className}`}>
      <colgroup>
        {columns.map((column) => (
          <col key={column.key} style={column.width ? { width: column.width } : undefined} />
        ))}
      </colgroup>
      <thead className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className={`px-3 py-2 text-xs font-medium text-neutral-600 ${ALIGN_CLASSES[column.align ?? 'left']}`}
            >
              {column.sortable ? (
                <button
                  type="button"
                  onClick={() => onSort?.(column.key)}
                  className={`focus-visible:ring-brand-700 inline-flex items-center gap-1 rounded outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                    column.align === 'center' ? 'justify-center' : ''
                  }`}
                >
                  {column.header}
                  <SortIcon direction={sortKey === column.key ? sortDirection : undefined} />
                </button>
              ) : (
                column.header
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100">
        {rows.map((row) => (
          <tr key={getRowKey(row)} className="transition-colors hover:bg-neutral-50">
            {columns.map((column) => (
              <td
                key={column.key}
                className={`truncate px-3 py-1.5 text-neutral-700 ${ALIGN_CLASSES[column.align ?? 'left']}`}
              >
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
