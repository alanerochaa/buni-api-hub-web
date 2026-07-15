import { Link, useNavigate, useParams } from 'react-router'

import {
  Badge,
  Button,
  Card,
  CopyIcon,
  ExternalLinkIcon,
  StarIcon,
  Tooltip,
  useToast,
} from '@/components/ui'
import {
  getResourceDisplayName,
  RESOURCE_ENVIRONMENT_LABELS,
  RESOURCE_TYPE_LABELS,
  ResourceStatusBadge,
  useFavorites,
  useResourcesHealth,
} from '@/features/catalog'
import { copyToClipboard } from '@/lib/clipboard'
import { SUCCESS_MESSAGES } from '@/lib/toastMessages'
import { paths } from '@/routes'

import { useResource } from '../hooks/useResource'
import { ResourceDetailsSkeleton } from './ResourceDetailsSkeleton'

const EMPTY_VALUE = '—'

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

interface DetailFieldProps {
  label: string
  value?: string
  href?: string
  className?: string
  valueClassName?: string
}

/**
 * `href` é opcional — só a URL usa. Os demais campos (Nome técnico
 * etc.) continuam texto simples, sem precisar de uma variante própria
 * de componente.
 */
function DetailField({
  label,
  value,
  href,
  className = '',
  valueClassName = '',
}: DetailFieldProps) {
  return (
    <div className={className}>
      <dt className="text-xs font-medium text-neutral-500">{label}</dt>
      <dd className={`mt-0.5 text-sm text-neutral-900 ${valueClassName}`}>
        {!value ? (
          EMPTY_VALUE
        ) : href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-1 hover:underline"
          >
            {value}
            <ExternalLinkIcon className="size-3 shrink-0" />
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}

function ChipList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <span className="text-sm text-neutral-900">{EMPTY_VALUE}</span>
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
    </div>
  )
}

const FOCUS_RING_CLASSES =
  'outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1'

export function ResourceDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const { resource, isLoading, error } = useResource(resourceId)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { healthByResourceId } = useResourcesHealth()
  const { showToast } = useToast()

  async function handleCopyUrl() {
    if (!resource?.url) return
    const ok = await copyToClipboard(resource.url)
    showToast(ok ? SUCCESS_MESSAGES.urlCopied : 'Não foi possível copiar a URL.', ok ? 'success' : 'error')
  }

  async function handleShare() {
    const ok = await copyToClipboard(window.location.href)
    showToast(ok ? SUCCESS_MESSAGES.linkCopied : 'Não foi possível copiar o link.', ok ? 'success' : 'error')
  }

  function handleToggleFavorite() {
    if (!resource) return
    const wasFavorite = isFavorite(resource.id)
    toggleFavorite(resource.id)
    showToast(wasFavorite ? SUCCESS_MESSAGES.favoriteRemoved : SUCCESS_MESSAGES.favoriteAdded)
  }

  if (isLoading) {
    return <ResourceDetailsSkeleton />
  }

  if (error) {
    return <p className="text-danger py-8 text-center text-sm">{error}</p>
  }

  if (!resource) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-neutral-500">Recurso não encontrado.</p>
        <Link
          to={paths.catalog.getHref()}
          className={`text-brand-800 mt-2 inline-block rounded-sm text-sm underline ${FOCUS_RING_CLASSES}`}
        >
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-neutral-600 transition-colors hover:text-neutral-900 ${FOCUS_RING_CLASSES}`}
        >
          <ArrowLeftIcon />
          Voltar
        </button>
        <span className="text-neutral-300" aria-hidden="true">
          |
        </span>
        {/* Breadcrumb estrutural — sempre leva à raiz do catálogo, sem
            filtros. "Voltar" acima é quem preserva filtros/busca/scroll
            (usa histórico do navegador); os dois têm papéis diferentes
            de propósito. */}
        <nav aria-label="breadcrumb" className="flex min-w-0 items-center gap-1.5">
          <Link
            to={paths.catalog.getHref()}
            className={`shrink-0 rounded-sm text-neutral-500 hover:text-neutral-900 hover:underline ${FOCUS_RING_CLASSES}`}
          >
            Recursos
          </Link>
          <span className="text-neutral-300" aria-hidden="true">
            /
          </span>
          <span className="truncate text-neutral-700">{getResourceDisplayName(resource)}</span>
        </nav>
      </div>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-neutral-900">
              {getResourceDisplayName(resource)}
            </h2>
            {resource.deprecated && <Badge variant="warning">Descontinuado</Badge>}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>{RESOURCE_TYPE_LABELS[resource.type]}</Badge>
            <Badge>{RESOURCE_ENVIRONMENT_LABELS[resource.environment]}</Badge>
            <ResourceStatusBadge
              status={healthByResourceId.get(resource.id)?.status ?? 'unknown'}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Tooltip
            label={isFavorite(resource.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleToggleFavorite}
              aria-pressed={isFavorite(resource.id)}
              className={isFavorite(resource.id) ? 'text-amber-600' : ''}
            >
              <StarIcon filled={isFavorite(resource.id)} />
              {isFavorite(resource.id) ? 'Favoritado' : 'Favoritar'}
            </Button>
          </Tooltip>
          <Tooltip label="Copiar link desta página">
            <Button type="button" variant="secondary" size="sm" onClick={handleShare}>
              <ShareIcon />
              Compartilhar
            </Button>
          </Tooltip>
          <Tooltip label="Copiar URL do recurso">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopyUrl}
              disabled={!resource.url}
            >
              <CopyIcon />
              Copiar URL
            </Button>
          </Tooltip>
          {resource.url && (
            <Tooltip label="Abrir em uma nova aba">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-8 items-center gap-2 rounded-md bg-neutral-900 px-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 ${FOCUS_RING_CLASSES}`}
              >
                <ExternalLinkIcon />
                Abrir URL
              </a>
            </Tooltip>
          )}
        </div>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField label="Nome técnico" value={resource.technicalName} />
          <DetailField
            label="URL"
            value={resource.url}
            href={resource.url}
            className="sm:col-span-2"
            valueClassName="font-mono text-xs break-all"
          />
        </dl>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <h3 className="text-xs font-medium text-neutral-500">Descrição</h3>
        <p className="mt-1 text-sm text-neutral-900">{resource.description || EMPTY_VALUE}</p>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <h3 className="mb-2 text-xs font-medium text-neutral-500">Tags</h3>
        <ChipList items={resource.tags} />
      </Card>

      <Card className="mt-4 sm:mt-6">
        <h3 className="mb-2 text-xs font-medium text-neutral-500">Keywords</h3>
        <ChipList items={resource.keywords} />
      </Card>
    </div>
  )
}
