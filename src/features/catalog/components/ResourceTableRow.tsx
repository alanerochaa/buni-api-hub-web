import { Link } from 'react-router'

import { Badge, CopyIcon, ExternalLinkIcon, Tooltip } from '@/components/ui'
import { paths } from '@/routes'

import { RESOURCE_ENVIRONMENT_LABELS, RESOURCE_TYPE_LABELS } from '../constants'
import { formatRelativeTime } from '../formatRelativeTime'
import { getResourceDisplayName } from '../getResourceDisplayName'
import type { Resource, ResourceHealth } from '../types'
import { FavoriteButton } from './FavoriteButton'
import { ResourceStatusBadge } from './ResourceStatusBadge'

function EyeIcon() {
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
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function MoreIcon() {
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
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  )
}

const ACTION_BUTTON_CLASSES =
  'rounded-md p-1.5 text-neutral-500 outline-none transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40'

export interface ResourceTableRowProps {
  resource: Resource
  health: ResourceHealth | undefined
  onCopyUrl: (resource: Resource) => void
}

/**
 * `health` vem de um único GET /health/resources feito uma vez para a
 * tabela inteira (useResourcesHealth) — não por linha. Ausência de
 * health (falha na chamada, ou recurso ainda não passou pela primeira
 * varredura) cai no fallback "Desconhecido" do ResourceStatusBadge, sem
 * quebrar a linha.
 */
export function ResourceTableRow({ resource, health, onCopyUrl }: ResourceTableRowProps) {
  return (
    <tr className="border-b border-neutral-100 transition-colors last:border-0 hover:bg-neutral-50">
      <td className="px-3 py-2.5 whitespace-nowrap">
        <FavoriteButton resourceId={resource.id} />
      </td>
      <td className="px-3 py-2.5 font-medium whitespace-nowrap text-neutral-900">
        {getResourceDisplayName(resource)}
      </td>
      <td className="max-w-[220px] px-3 py-2.5 font-mono text-xs" title={resource.url}>
        {resource.url ? (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 hover:text-brand-800 flex items-center gap-1 hover:underline"
          >
            <span className="min-w-0 truncate">{resource.url}</span>
            <ExternalLinkIcon className="size-3 shrink-0" />
          </a>
        ) : (
          <span className="text-neutral-500">—</span>
        )}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        <Badge>{RESOURCE_TYPE_LABELS[resource.type]}</Badge>
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        <Badge>{RESOURCE_ENVIRONMENT_LABELS[resource.environment]}</Badge>
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        <ResourceStatusBadge status={health?.status ?? 'unknown'} />
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap text-neutral-500">
        {health ? formatRelativeTime(health.lastCheckedAt) : 'Não verificado'}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center justify-end gap-1">
          <Tooltip label="Visualizar detalhes">
            <Link
              to={paths.resourceDetails.getHref(resource.id)}
              className={ACTION_BUTTON_CLASSES}
              aria-label="Visualizar detalhes"
            >
              <EyeIcon />
            </Link>
          </Tooltip>
          <Tooltip label="Copiar URL">
            <button
              type="button"
              className={ACTION_BUTTON_CLASSES}
              aria-label="Copiar URL"
              disabled={!resource.url}
              onClick={() => onCopyUrl(resource)}
            >
              <CopyIcon />
            </button>
          </Tooltip>
          <Tooltip label="Mais ações">
            <button type="button" className={ACTION_BUTTON_CLASSES} aria-label="Mais ações">
              <MoreIcon />
            </button>
          </Tooltip>
        </div>
      </td>
    </tr>
  )
}
