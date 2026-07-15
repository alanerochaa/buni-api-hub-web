import { Link, useParams } from 'react-router'

import { Badge, Button, Card } from '@/components/ui'
import {
  RESOURCE_ENVIRONMENT_LABELS,
  RESOURCE_TYPE_LABELS,
  getResourceDisplayName,
  useResources,
} from '@/features/catalog'
import { paths } from '@/routes'

import { PencilIcon } from '../icons'

const EMPTY_VALUE = '—'

function DetailField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-neutral-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-neutral-900">{value || EMPTY_VALUE}</dd>
    </div>
  )
}

export function ResourceViewPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const { resources, isLoading } = useResources()
  const resource = resources.find((item) => item.id === resourceId)

  if (isLoading) {
    return <p className="py-8 text-center text-sm text-neutral-500">Carregando...</p>
  }

  if (!resource) {
    return <p className="text-danger py-8 text-center text-sm">Recurso não encontrado.</p>
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-neutral-900">
              {getResourceDisplayName(resource)}
            </h2>
            <Badge variant={resource.active ? 'success' : 'neutral'}>
              {resource.active ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>{RESOURCE_TYPE_LABELS[resource.type]}</Badge>
            <Badge>{RESOURCE_ENVIRONMENT_LABELS[resource.environment]}</Badge>
          </div>
        </div>
        <Link to={paths.admin.editResource.getHref(resource.id)}>
          <Button type="button">
            <PencilIcon />
            Editar
          </Button>
        </Link>
      </div>

      <Card>
        <h3 className="mb-3 text-sm font-semibold text-neutral-900">Informações Gerais</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField label="Código" value={resource.code ?? resource.id} />
          <DetailField label="Nome técnico" value={resource.technicalName} />
          <div className="sm:col-span-2">
            <DetailField label="Descrição" value={resource.description} />
          </div>
        </dl>
      </Card>

      <Card className="mt-4">
        <h3 className="mb-3 text-sm font-semibold text-neutral-900">Endereço</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField label="URL" value={resource.url} />
          <DetailField label="URL da documentação" value={resource.docUrl} />
        </dl>
      </Card>

      <Card className="mt-4">
        <h3 className="mb-3 text-sm font-semibold text-neutral-900">Organização</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField label="Responsável" value={resource.responsible} />
          <DetailField label="Área" value={resource.area} />
          <div className="sm:col-span-2">
            <DetailField label="Palavras-chave" value={resource.keywords.join(', ')} />
          </div>
        </dl>
      </Card>

      <Card className="mt-4">
        <h3 className="mb-3 text-sm font-semibold text-neutral-900">Observações</h3>
        <p className="text-sm text-neutral-900">{resource.notes || EMPTY_VALUE}</p>
      </Card>

      <Card className="mt-4">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField
            label="Criado em"
            value={resource.createdAt ? new Date(resource.createdAt).toLocaleString('pt-BR') : undefined}
          />
          <DetailField
            label="Última atualização"
            value={resource.updatedAt ? new Date(resource.updatedAt).toLocaleString('pt-BR') : undefined}
          />
        </dl>
      </Card>
    </div>
  )
}
