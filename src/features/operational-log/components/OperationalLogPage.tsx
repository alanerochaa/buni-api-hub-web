import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import {
  Badge,
  Button,
  DEFAULT_PAGE_SIZE,
  EmptyState,
  Input,
  Pagination,
  Select,
  Skeleton,
  Table,
} from '@/components/ui'
import type { TableColumn } from '@/components/ui'
import {
  ApiIcon,
  getResourceDisplayName,
  RESOURCE_TYPE_LABELS,
  SiteIcon,
  useResources,
  WebServiceIcon,
} from '@/features/catalog'
import type { ResourceType } from '@/features/catalog'

import {
  OPERATIONAL_LOG_ENVIRONMENT_OPTIONS,
  OPERATIONAL_LOG_STATUS_BADGE_VARIANT,
  OPERATIONAL_LOG_STATUS_LABELS,
  OPERATIONAL_LOG_STATUS_OPTIONS,
} from '../constants'
import { exportOperationalLog } from '../export/exportOperationalLog'
import { formatDuration } from '../formatDuration'
import { useOperationalLog } from '../hooks/useOperationalLog'
import { useOperationalLogFilters } from '../hooks/useOperationalLogFilters'
import { ArrowRightIcon, DownloadIcon, LogIcon, SearchIcon } from '../icons'
import type { OperationalEvent } from '../types'

const TYPE_ICONS: Record<ResourceType, ReactNode> = {
  api: <ApiIcon className="size-4" />,
  'web-service': <WebServiceIcon className="size-4" />,
  site: <SiteIcon className="size-4" />,
}

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString('pt-BR')
}

/**
 * Log Operacional — eventos detalhados e auditoria (ao lado do
 * Histórico Operacional, que cobre métricas/série temporal em
 * `dashboard/`). Lê exclusivamente `GET /dashboard/events` (via
 * `useOperationalLog`), sem persistência própria. Filtros estruturados
 * (recurso/status/ambiente/período) vão para o servidor via query
 * params; a pesquisa por texto é aplicada sobre o resultado já filtrado
 * (ver useOperationalLogFilters). Exportação (CSV hoje, Excel/PDF no
 * futuro) atua só sobre os registros filtrados, nunca sobre a base
 * inteira.
 */
export function OperationalLogPage() {
  const { resources } = useResources()
  const {
    filters,
    setResourceId,
    setStatus,
    setEnvironment,
    setSince,
    setUntil,
    setSearch,
    serverFilters,
    applySearch,
  } = useOperationalLogFilters()
  const { events, isLoading, error } = useOperationalLog(serverFilters)
  const [page, setPage] = useState(1)
  const pageSize = DEFAULT_PAGE_SIZE

  const filteredEvents = useMemo(() => applySearch(events), [events, applySearch])

  const resourceOptions = useMemo(() => {
    const sorted = [...resources].sort((a, b) =>
      getResourceDisplayName(a).localeCompare(getResourceDisplayName(b), 'pt-BR'),
    )
    return [
      { value: 'all', label: 'Todos os recursos' },
      ...sorted.map((resource) => ({ value: resource.id, label: getResourceDisplayName(resource) })),
    ]
  }, [resources])

  const hasActiveFilters =
    filters.resourceId !== 'all' ||
    filters.status !== 'all' ||
    filters.environment !== 'all' ||
    filters.since !== '' ||
    filters.until !== '' ||
    filters.search !== ''

  const pageCount = Math.max(1, Math.ceil(filteredEvents.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageItems = filteredEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function handleFilterChange<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(1)
    }
  }

  const columns: TableColumn<OperationalEvent>[] = [
    {
      key: 'timestamp',
      header: 'Data e Hora',
      width: '10.5rem',
      render: (row) => <span className="text-neutral-600">{formatDateTime(row.timestamp)}</span>,
    },
    {
      key: 'resourceName',
      header: 'Recurso',
      render: (row) => <span className="font-medium text-neutral-900">{row.resourceName}</span>,
    },
    {
      key: 'resourceType',
      header: 'Tipo',
      width: '8.5rem',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 text-neutral-600">
          {TYPE_ICONS[row.resourceType]}
          {RESOURCE_TYPE_LABELS[row.resourceType]}
        </span>
      ),
    },
    {
      key: 'transition',
      header: 'Transição de Status',
      width: '14rem',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5">
          <Badge variant={OPERATIONAL_LOG_STATUS_BADGE_VARIANT[row.previousStatus]}>
            {OPERATIONAL_LOG_STATUS_LABELS[row.previousStatus]}
          </Badge>
          <ArrowRightIcon />
          <Badge variant={OPERATIONAL_LOG_STATUS_BADGE_VARIANT[row.currentStatus]}>
            {OPERATIONAL_LOG_STATUS_LABELS[row.currentStatus]}
          </Badge>
        </span>
      ),
    },
    {
      key: 'reason',
      header: 'Motivo',
      render: (row) => (
        <div className="flex flex-col gap-0.5 py-0.5">
          <span className="text-neutral-600">{row.reason}</span>
          {row.errorMessage && (
            <span className="truncate text-xs text-neutral-400" title={row.errorMessage}>
              {row.errorMessage}
            </span>
          )}
          {row.unavailabilityDurationMs !== undefined && (
            <span className="text-xs text-neutral-400">
              Indisponível por {formatDuration(row.unavailabilityDurationMs)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'responseTime',
      header: 'Tempo de Resposta',
      width: '8.5rem',
      align: 'right',
      render: (row) => (
        <span className="font-mono text-xs text-neutral-500">
          {row.responseTime !== undefined ? `${row.responseTime} ms` : '—'}
        </span>
      ),
    },
    {
      key: 'httpStatus',
      header: 'Código HTTP',
      width: '7rem',
      align: 'center',
      render: (row) => (
        <span className="font-mono text-xs text-neutral-500">{row.httpStatus ?? '—'}</span>
      ),
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 pb-2">
        <div className="min-w-0">
          <h2 className="text-lg leading-tight font-semibold text-neutral-900">Log Operacional</h2>
          <p className="mt-0.5 truncate text-xs text-neutral-500">
            Auditoria das alterações de status dos recursos monitorados.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={filteredEvents.length === 0}
          onClick={() => exportOperationalLog(filteredEvents, 'csv')}
        >
          <DownloadIcon />
          Exportar
        </Button>
      </div>

      <div className="flex shrink-0 flex-wrap items-start gap-3 border-t border-neutral-200 pt-3 pb-2">
        <div className="w-full min-w-0 sm:w-56">
          <Select
            label="Recurso"
            size="sm"
            options={resourceOptions}
            value={filters.resourceId}
            onChange={(event) => handleFilterChange(setResourceId)(event.target.value)}
          />
        </div>
        <div className="w-full min-w-0 sm:w-40">
          <Select
            label="Ambiente"
            size="sm"
            options={[...OPERATIONAL_LOG_ENVIRONMENT_OPTIONS]}
            value={filters.environment}
            onChange={(event) =>
              handleFilterChange(setEnvironment)(event.target.value as typeof filters.environment)
            }
          />
        </div>
        <div className="w-full min-w-0 sm:w-40">
          <Select
            label="Status"
            size="sm"
            options={OPERATIONAL_LOG_STATUS_OPTIONS}
            value={filters.status}
            onChange={(event) => handleFilterChange(setStatus)(event.target.value as typeof filters.status)}
          />
        </div>
        <div className="w-full min-w-0 sm:w-36">
          <Input
            label="De"
            size="sm"
            type="date"
            value={filters.since}
            max={filters.until || undefined}
            onChange={(event) => handleFilterChange(setSince)(event.target.value)}
          />
        </div>
        <div className="w-full min-w-0 sm:w-36">
          <Input
            label="Até"
            size="sm"
            type="date"
            value={filters.until}
            min={filters.since || undefined}
            onChange={(event) => handleFilterChange(setUntil)(event.target.value)}
          />
        </div>
        <div className="min-w-0 flex-1 basis-56">
          <Input
            label="Pesquisar"
            size="sm"
            icon={<SearchIcon />}
            placeholder="Buscar por recurso ou motivo..."
            value={filters.search}
            onChange={(event) => handleFilterChange(setSearch)(event.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-danger py-4 text-center text-sm">{error}</p>}

      {isLoading && !error && (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
      )}

      {!isLoading && !error && filteredEvents.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            icon={<LogIcon />}
            title="Nenhum evento encontrado"
            description={
              hasActiveFilters
                ? 'Ajuste os filtros para ver outros eventos.'
                : 'As alterações de status dos recursos monitorados aparecerão aqui.'
            }
          />
        </div>
      )}

      {!isLoading && !error && filteredEvents.length > 0 && (
        <>
          <div
            className="min-h-64 flex-1 overflow-auto rounded-lg border border-neutral-200"
            style={{ maxHeight: 'calc(100svh - var(--spacing-header) - 14.5rem)' }}
          >
            <Table columns={columns} rows={pageItems} getRowKey={(row) => row.id} />
          </div>
          <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
