import { PAGE_SIZE_OPTIONS } from './constants'

export interface PaginationProps {
  page: number
  pageCount: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

const FOCUS_RING_CLASSES =
  'outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1'

const NAV_BUTTON_CLASSES = `rounded-md border border-neutral-300 px-2.5 py-1 text-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS_RING_CLASSES}`

/**
 * Janela de números de página com reticências (1 2 3 ... 6), sempre
 * mostrando a primeira, a última e uma vizinhança da página atual —
 * evita renderizar dezenas de botões em catálogos grandes.
 */
function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const pages = new Set<number>([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b)

  const result: (number | 'ellipsis')[] = []
  let previous = 0
  for (const page of sorted) {
    if (previous && page - previous > 1) result.push('ellipsis')
    result.push(page)
    previous = page
  }
  return result
}

/**
 * Paginação completa: contagem de registros, seletor de itens por
 * página e navegação por número — reutilizada por todas as telas com
 * tabela (Catálogo, Cadastro de Recursos), para manter o mesmo padrão
 * em toda a aplicação.
 */
export function Pagination({
  page,
  pageCount,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  if (totalItems === 0) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)
  const pageNumbers = getPageNumbers(page, pageCount)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600">
      <div className="flex flex-wrap items-center gap-4">
        <span>
          Mostrando{' '}
          <span className="font-medium text-neutral-900">
            {from}–{to}
          </span>{' '}
          de <span className="font-medium text-neutral-900">{totalItems}</span> registros
        </span>

        <label className="flex items-center gap-1.5 text-neutral-500">
          Itens por página
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className={`h-8 rounded-md border border-neutral-300 bg-white px-2 text-sm text-neutral-900 transition-colors hover:bg-neutral-50 ${FOCUS_RING_CLASSES}`}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={NAV_BUTTON_CLASSES}
          >
            ‹ Anterior
          </button>

          {pageNumbers.map((entry, index) =>
            entry === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="px-1.5 text-neutral-400 select-none">
                …
              </span>
            ) : (
              <button
                key={entry}
                type="button"
                aria-current={entry === page ? 'page' : undefined}
                onClick={() => onPageChange(entry)}
                className={`size-8 rounded-md text-sm font-medium transition-colors ${FOCUS_RING_CLASSES} ${
                  entry === page
                    ? 'bg-brand-100 text-brand-800'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {entry}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
            className={NAV_BUTTON_CLASSES}
          >
            Próxima ›
          </button>
        </div>
      )}
    </div>
  )
}
