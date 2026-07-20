import { Link, useNavigate, useParams } from 'react-router'

import { Badge, Button, Card, StarIcon, Tooltip, useToast } from '@/components/ui'
import {
  getResourceDisplayName,
  getResourceIdentityKey,
  RESOURCE_TYPE_LABELS,
  useFavorites,
  type ResourceEnvironment,
} from '@/features/catalog'
import { copyToClipboard } from '@/lib/clipboard'
import { SUCCESS_MESSAGES } from '@/lib/toastMessages'
import { paths } from '@/routes'

import { useResourceGroup } from '../hooks/useResourceGroup'
import { ResourceDetailsSkeleton } from './ResourceDetailsSkeleton'
import { ResourceEnvironmentSection } from './ResourceEnvironmentSection'

const EMPTY_VALUE = '—'

const PRIMARY_ENVIRONMENTS: ResourceEnvironment[] = ['homologacao', 'producao']

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
  const { group, isLoading, error } = useResourceGroup(resourceId)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()

  async function handleShare() {
    const ok = await copyToClipboard(window.location.href)
    showToast(ok ? SUCCESS_MESSAGES.linkCopied : 'Não foi possível copiar o link.', ok ? 'success' : 'error')
  }

  function handleToggleFavorite() {
    if (!group) return
    const favoriteKey = getResourceIdentityKey(group)
    const wasFavorite = isFavorite(favoriteKey)
    toggleFavorite(favoriteKey)
    showToast(wasFavorite ? SUCCESS_MESSAGES.favoriteRemoved : SUCCESS_MESSAGES.favoriteAdded)
  }

  if (isLoading) {
    return <ResourceDetailsSkeleton />
  }

  if (error) {
    return <p className="text-danger py-8 text-center text-sm">{error}</p>
  }

  if (!group) {
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

  const favoriteKey = getResourceIdentityKey(group)

  const extraEnvironments = group.environments
    .map((entry) => entry.environment)
    .filter((environment) => !PRIMARY_ENVIRONMENTS.includes(environment))

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
          <span className="truncate text-neutral-700">{getResourceDisplayName(group)}</span>
        </nav>
      </div>
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-neutral-900">
              {getResourceDisplayName(group)}
            </h2>
            {group.deprecated && <Badge variant="warning">Descontinuado</Badge>}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>{RESOURCE_TYPE_LABELS[group.type]}</Badge>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Tooltip
            label={isFavorite(favoriteKey) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleToggleFavorite}
              aria-pressed={isFavorite(favoriteKey)}
              className={isFavorite(favoriteKey) ? 'text-amber-600' : ''}
            >
              <StarIcon filled={isFavorite(favoriteKey)} />
              {isFavorite(favoriteKey) ? 'Favoritado' : 'Favoritar'}
            </Button>
          </Tooltip>
          <Tooltip label="Copiar link desta página">
            <Button type="button" variant="secondary" size="sm" onClick={handleShare}>
              <ShareIcon />
              Compartilhar
            </Button>
          </Tooltip>
        </div>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-neutral-500">Nome técnico</dt>
            <dd className="mt-0.5 text-sm text-neutral-900">{group.technicalName || EMPTY_VALUE}</dd>
          </div>
        </dl>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <h3 className="text-xs font-medium text-neutral-500">Descrição</h3>
        <p className="mt-1 text-sm text-neutral-900">{group.description || EMPTY_VALUE}</p>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <h3 className="mb-2 text-xs font-medium text-neutral-500">Tags</h3>
        <ChipList items={group.tags} />
      </Card>

      <Card className="mt-4 sm:mt-6">
        <h3 className="mb-2 text-xs font-medium text-neutral-500">Keywords</h3>
        <ChipList items={group.keywords} />
      </Card>

      <h3 className="mt-4 text-xs font-medium text-neutral-500 sm:mt-6">Ambientes</h3>
      <div className="mt-2 flex flex-col gap-3">
        {PRIMARY_ENVIRONMENTS.map((environment) => (
          <ResourceEnvironmentSection
            key={environment}
            environment={environment}
            entry={group.environments.find((entry) => entry.environment === environment)}
          />
        ))}
        {extraEnvironments.map((environment) => (
          <ResourceEnvironmentSection
            key={environment}
            environment={environment}
            entry={group.environments.find((entry) => entry.environment === environment)}
          />
        ))}
      </div>
    </div>
  )
}
