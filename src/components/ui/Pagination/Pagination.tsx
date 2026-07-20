export interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

const FOCUS_RING_CLASSES =
  'outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1'

const NAV_BUTTON_CLASSES = `rounded-md px-2 py-1 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent ${FOCUS_RING_CLASSES}`

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

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null

  const pageNumbers = getPageNumbers(page, pageCount)

  return (
    <nav
      aria-label="Paginação"
      className="flex items-center justify-center gap-1 py-1.5 text-sm text-neutral-600"
    >
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
          <span key={`ellipsis-${index}`} className="px-1 text-neutral-400 select-none">
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            aria-current={entry === page ? 'page' : undefined}
            onClick={() => onPageChange(entry)}
            className={`size-7 rounded-md text-sm font-medium transition-colors ${FOCUS_RING_CLASSES} ${
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
    </nav>
  )
}
