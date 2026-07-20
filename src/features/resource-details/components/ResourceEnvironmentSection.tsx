import {
  Button,
  Card,
  CopyIcon,
  ExternalLinkIcon,
  Tooltip,
  useToast,
} from '@/components/ui'
import {
  formatRelativeTime,
  RESOURCE_ENVIRONMENT_LABELS,
  ResourceStatusBadge,
  type ResourceEnvironment,
  type ResourceEnvironmentEntry,
} from '@/features/catalog'
import { copyToClipboard } from '@/lib/clipboard'
import { SUCCESS_MESSAGES } from '@/lib/toastMessages'

const FOCUS_RING_CLASSES =
  'outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1'

export interface ResourceEnvironmentSectionProps {
  environment: ResourceEnvironment
  
  entry: ResourceEnvironmentEntry | undefined
}

export function ResourceEnvironmentSection({ environment, entry }: ResourceEnvironmentSectionProps) {
  const { showToast } = useToast()

  async function handleCopyUrl() {
    if (!entry?.resource.url) return
    const ok = await copyToClipboard(entry.resource.url)
    showToast(ok ? SUCCESS_MESSAGES.urlCopied : 'Não foi possível copiar a URL.', ok ? 'success' : 'error')
  }

  if (!entry) {
    return (
      <Card className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-medium text-neutral-500">
          {RESOURCE_ENVIRONMENT_LABELS[environment]}
        </h3>
        <p className="text-sm text-neutral-400">Não disponível neste ambiente</p>
      </Card>
    )
  }

  const { resource, health } = entry

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-neutral-900">
          {RESOURCE_ENVIRONMENT_LABELS[environment]}
        </h3>
        <ResourceStatusBadge status={health?.status ?? 'unknown'} />
      </div>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium text-neutral-500">URL</dt>
          <dd className="mt-0.5 text-sm text-neutral-900">
            {resource.url ? (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-1 font-mono text-xs break-all hover:underline"
              >
                {resource.url}
                <ExternalLinkIcon className="size-3 shrink-0" />
              </a>
            ) : (
              '—'
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-neutral-500">Última verificação</dt>
          <dd className="mt-0.5 text-sm text-neutral-900">
            {health ? formatRelativeTime(health.lastCheckedAt) : 'Não verificado'}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        <Tooltip label="Copiar URL do ambiente">
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
  )
}
