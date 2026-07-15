import { useMemo, useState } from 'react'
import { Link } from 'react-router'

import {
  Badge,
  Button,
  DEFAULT_PAGE_SIZE,
  EmptyState,
  FolderIcon,
  Input,
  Pagination,
  Select,
  Skeleton,
  Table,
} from '@/components/ui'
import type { TableColumn } from '@/components/ui'
import {
  RESOURCE_ENVIRONMENT_LABELS,
  RESOURCE_TYPE_LABELS,
  useResources,
  getResourceDisplayName,
} from '@/features/catalog'
import type { Resource } from '@/features/catalog'
import { paths } from '@/routes'

import { useFilters } from '../hooks/useFilters'
import { EyeIcon, PencilIcon, PlusIcon, SearchIcon, TrashIcon } from '../icons'
import { DeleteResourceModal } from './DeleteResourceModal'

const TYPE_OPTIONS = [
  { value: 'all', label: 'Todos os tipos' },
  { value: 'api', label: 'API' },
  { value: 'web-service', label: 'Web Service' },
  { value: 'site', label: 'Site' },
]

const ENVIRONMENT_OPTIONS = [
  { value: 'all', label: 'Todos os ambientes' },
  { value: 'producao', label: 'Produção' },
  { value: 'homologacao', label: 'Homologação' },
  { value: 'desenvolvimento', label: 'Desenvolvimento' },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os status' },
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
]

function formatDate(value: string | undefined): string {
  if (!value) return '—'
  return new Date(value).toLocaleString('pt-BR')
}

export function AdminResourcesPage() {
  const { resources, isLoading, error } = useResources()
  const { filters, setSearch, setType, setEnvironment, setActive, filteredResources } =
    useFilters(resources)
  const [sortKey, setSortKey] = useState('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null)

  const sorted = useMemo(() => {
    const list = [...filteredResources]
    list.sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1
      if (sortKey === 'updatedAt') {
        return ((a.updatedAt ?? '') < (b.updatedAt ?? '') ? -1 : 1) * direction
      }
      return a.name.localeCompare(b.name, 'pt-BR') * direction
    })
    return list
  }, [filteredResources, sortKey, sortDirection])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageItems = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection('asc')
  }

  function handleFilterChange<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(1)
    }
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPage(1)
  }

  const columns: TableColumn<Resource>[] = [
    {
      key: 'code',
      header: 'Código',
      width: '6.5rem',
      render: (row) => (
        <span title={row.code ?? row.id} className="font-mono text-xs text-neutral-500">
          {row.code ?? row.id}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'Nome',
      sortable: true,
      render: (row) => (
        <Link
          to={paths.admin.viewResource.getHref(row.id)}
          title={getResourceDisplayName(row)}
          className="text-brand-700 hover:text-brand-800 font-medium hover:underline"
        >
          {getResourceDisplayName(row)}
        </Link>
      ),
    },
    {
      key: 'type',
      header: 'Tipo',
      width: '7rem',
      render: (row) => <Badge>{RESOURCE_TYPE_LABELS[row.type]}</Badge>,
    },
    {
      key: 'environment',
      header: 'Ambiente',
      width: '8.5rem',
      render: (row) => <Badge>{RESOURCE_ENVIRONMENT_LABELS[row.environment]}</Badge>,
    },
    {
      key: 'active',
      header: 'Status',
      width: '6rem',
      render: (row) => (
        <Badge variant={row.active ? 'success' : 'neutral'}>{row.active ? 'Ativo' : 'Inativo'}</Badge>
      ),
    },
    {
      key: 'responsible',
      header: 'Responsável',
      width: '9rem',
      render: (row) => row.responsible ?? '—',
    },
    {
      key: 'updatedAt',
      header: 'Última atualização',
      sortable: true,
      width: '9.5rem',
      align: 'center',
      render: (row) => formatDate(row.updatedAt),
    },
    {
      key: 'actions',
      header: 'Ações',
      width: '7.5rem',
      align: 'center',
      render: (row) => (
        <div className="flex justify-center gap-1">
          <Link
            to={paths.admin.viewResource.getHref(row.id)}
            aria-label={`Visualizar ${row.name}`}
            className="focus-visible:ring-brand-700 inline-flex size-7 items-center justify-center rounded-md text-neutral-500 outline-none transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-offset-1"
          >
            <EyeIcon />
          </Link>
          <Link
            to={paths.admin.editResource.getHref(row.id)}
            aria-label={`Editar ${row.name}`}
            className="focus-visible:ring-brand-700 inline-flex size-7 items-center justify-center rounded-md text-neutral-500 outline-none transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-offset-1"
          >
            <PencilIcon />
          </Link>
          <button
            type="button"
            aria-label={`Excluir ${row.name}`}
            onClick={() => setResourceToDelete(row)}
            className="focus-visible:ring-brand-700 text-danger hover:bg-danger-bg inline-flex size-7 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-1"
          >
            <TrashIcon />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 pb-2">
        <div className="min-w-0">
          <h2 className="text-lg leading-tight font-semibold text-neutral-900">
            Cadastro de Recursos
          </h2>
          <p className="mt-0.5 truncate text-xs text-neutral-500">
            Cadastre, edite e mantenha as APIs, Web Services e Sites disponíveis no Portal.
          </p>
        </div>
        <Link to={paths.admin.newResource.getHref()}>
          <Button type="button" size="sm">
            <PlusIcon />
            Novo Recurso
          </Button>
        </Link>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-neutral-200 pt-2 pb-2 sm:grid-cols-4">
        <Input
          label="Pesquisar"
          hideLabel
          size="sm"
          icon={<SearchIcon />}
          placeholder="Buscar por nome..."
          value={filters.search}
          onChange={(event) => handleFilterChange(setSearch)(event.target.value)}
        />
        <Select
          label="Tipo"
          hideLabel
          size="sm"
          options={TYPE_OPTIONS}
          value={filters.type}
          onChange={(event) =>
            handleFilterChange(setType)(event.target.value as typeof filters.type)
          }
        />
        <Select
          label="Ambiente"
          hideLabel
          size="sm"
          options={ENVIRONMENT_OPTIONS}
          value={filters.environment}
          onChange={(event) =>
            handleFilterChange(setEnvironment)(event.target.value as typeof filters.environment)
          }
        />
        <Select
          label="Status"
          hideLabel
          size="sm"
          options={STATUS_OPTIONS}
          value={filters.active}
          onChange={(event) =>
            handleFilterChange(setActive)(event.target.value as typeof filters.active)
          }
        />
      </div>

      {error && <p className="text-danger py-4 text-center text-sm">{error}</p>}

      {isLoading && !error && (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
      )}

      {!isLoading && !error && sorted.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            icon={<FolderIcon />}
            title="Nenhum recurso encontrado"
            description="Ajuste os filtros ou cadastre um novo recurso."
          />
        </div>
      )}

      {!isLoading && !error && sorted.length > 0 && (
        <>
          <div
            className="min-h-64 flex-1 overflow-auto rounded-lg border border-neutral-200"
            style={{ maxHeight: 'calc(100svh - var(--spacing-header) - 13.5rem)' }}
          >
            <Table
              columns={columns}
              rows={pageItems}
              getRowKey={(row) => row.id}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </div>
          <div className="shrink-0 pt-3">
            <Pagination
              page={currentPage}
              pageCount={pageCount}
              pageSize={pageSize}
              totalItems={sorted.length}
              onPageChange={setPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </>
      )}

      <DeleteResourceModal resource={resourceToDelete} onClose={() => setResourceToDelete(null)} />
    </div>
  )
}
