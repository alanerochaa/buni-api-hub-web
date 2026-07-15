import { useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router'

import { Button, Card, Input, Select, Textarea, useToast } from '@/components/ui'
import { useResources } from '@/features/catalog'
import type { Resource, ResourceEnvironment, ResourceType } from '@/features/catalog'
import { getErrorMessage } from '@/lib/errors'
import { SUCCESS_MESSAGES } from '@/lib/toastMessages'
import { paths } from '@/routes'
import type { ResourceInput } from '@/services/adminResource.service'

import { useCreateResource } from '../hooks/useCreateResource'
import { useUpdateResource } from '../hooks/useUpdateResource'
import { EMPTY_FORM_VALUES } from '../types'
import type { ResourceFormValues } from '../types'

const TYPE_OPTIONS = [
  { value: 'api', label: 'API' },
  { value: 'web-service', label: 'Web Service' },
  { value: 'site', label: 'Site' },
]

const ENVIRONMENT_OPTIONS = [
  { value: 'producao', label: 'Produção' },
  { value: 'homologacao', label: 'Homologação' },
  { value: 'desenvolvimento', label: 'Desenvolvimento' },
]

const STATUS_OPTIONS = [
  { value: 'true', label: 'Ativo' },
  { value: 'false', label: 'Inativo' },
]

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="mt-4 first:mt-0">
      <h3 className="mb-4 text-sm font-semibold text-neutral-900">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </Card>
  )
}

function toInput(values: ResourceFormValues): ResourceInput {
  return {
    name: values.name,
    type: values.type,
    url: values.url,
    environment: values.environment,
    active: values.active,
    description: values.description || undefined,
    docUrl: values.docUrl || undefined,
    responsible: values.responsible || undefined,
    area: values.area || undefined,
    notes: values.notes || undefined,
    keywords: values.keywords
      ? values.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
      : undefined,
  }
}

function toFormValues(resource: Resource): ResourceFormValues {
  return {
    name: resource.name,
    description: resource.description ?? '',
    type: resource.type,
    url: resource.url ?? '',
    docUrl: resource.docUrl ?? '',
    responsible: resource.responsible ?? '',
    area: resource.area ?? '',
    keywords: resource.keywords.join(', '),
    environment: resource.environment,
    active: resource.active,
    notes: resource.notes ?? '',
  }
}

export interface ResourceFormPageProps {
  mode: 'create' | 'edit'
}

export function ResourceFormPage({ mode }: ResourceFormPageProps) {
  const { resourceId } = useParams<{ resourceId: string }>()
  const { resources, isLoading: isLoadingResources } = useResources()

  const existing = mode === 'edit' ? resources.find((resource) => resource.id === resourceId) : undefined

  if (mode === 'edit' && isLoadingResources) {
    return <p className="py-8 text-center text-sm text-neutral-500">Carregando...</p>
  }

  if (mode === 'edit' && !existing) {
    return <p className="text-danger py-8 text-center text-sm">Recurso não encontrado.</p>
  }

  return (
    <ResourceForm
      key={resourceId ?? 'new'}
      mode={mode}
      resourceId={resourceId}
      initialValues={existing ? toFormValues(existing) : EMPTY_FORM_VALUES}
    />
  )
}

interface ResourceFormProps {
  mode: 'create' | 'edit'
  resourceId?: string
  initialValues: ResourceFormValues
}

function ResourceForm({ mode, resourceId, initialValues }: ResourceFormProps) {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { create, isLoading: isCreating } = useCreateResource()
  const { update, isLoading: isUpdating } = useUpdateResource()

  const [values, setValues] = useState<ResourceFormValues>(initialValues)

  function updateField<K extends keyof ResourceFormValues>(key: K, value: ResourceFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function saveResource(andNew: boolean) {
    try {
      if (mode === 'create') {
        await create(toInput(values))
        showToast(SUCCESS_MESSAGES.resourceCreated)
        if (andNew) {
          setValues(EMPTY_FORM_VALUES)
          return
        }
        navigate(paths.admin.resources.getHref())
      } else if (resourceId) {
        await update({ id: resourceId, input: toInput(values) })
        showToast(SUCCESS_MESSAGES.resourceUpdated)
        navigate(paths.admin.resources.getHref())
      }
    } catch (error) {
      showToast(getErrorMessage(error, 'Não foi possível salvar o recurso.'), 'error')
    }
  }

  const isSaving = isCreating || isUpdating

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-neutral-900">
        {mode === 'create' ? 'Novo Recurso' : 'Editar Recurso'}
      </h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          void saveResource(false)
        }}
      >
        <FormSection title="Informações Gerais">
          <Input
            label="Nome"
            required
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
          <Select
            label="Tipo"
            options={TYPE_OPTIONS}
            value={values.type}
            onChange={(event) => updateField('type', event.target.value as ResourceType)}
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Descrição"
              value={values.description}
              onChange={(event) => updateField('description', event.target.value)}
            />
          </div>
        </FormSection>

        <FormSection title="Endereço">
          <Input
            label="URL"
            type="url"
            required
            value={values.url}
            onChange={(event) => updateField('url', event.target.value)}
          />
          <Input
            label="URL da documentação"
            type="url"
            value={values.docUrl}
            onChange={(event) => updateField('docUrl', event.target.value)}
          />
        </FormSection>

        <FormSection title="Organização">
          <Input
            label="Responsável"
            value={values.responsible}
            onChange={(event) => updateField('responsible', event.target.value)}
          />
          <Input
            label="Área"
            value={values.area}
            onChange={(event) => updateField('area', event.target.value)}
          />
          <div className="sm:col-span-2">
            <Input
              label="Palavras-chave"
              placeholder="separadas por vírgula"
              value={values.keywords}
              onChange={(event) => updateField('keywords', event.target.value)}
            />
          </div>
        </FormSection>

        <FormSection title="Configuração">
          <Select
            label="Ambiente"
            options={ENVIRONMENT_OPTIONS}
            value={values.environment}
            onChange={(event) => updateField('environment', event.target.value as ResourceEnvironment)}
          />
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            value={String(values.active)}
            onChange={(event) => updateField('active', event.target.value === 'true')}
          />
        </FormSection>

        <FormSection title="Observações">
          <div className="sm:col-span-2">
            <Textarea
              label="Observações"
              value={values.notes}
              onChange={(event) => updateField('notes', event.target.value)}
            />
          </div>
        </FormSection>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(paths.admin.resources.getHref())}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          {mode === 'create' && (
            <Button
              type="button"
              variant="secondary"
              disabled={isSaving}
              onClick={() => void saveResource(true)}
            >
              {isSaving ? 'Salvando...' : 'Salvar e Novo'}
            </Button>
          )}
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  )
}
