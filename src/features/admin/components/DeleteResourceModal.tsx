import { Button, Modal, useToast } from '@/components/ui'
import { getResourceDisplayName } from '@/features/catalog'
import type { Resource } from '@/features/catalog'
import { getErrorMessage } from '@/lib/errors'
import { SUCCESS_MESSAGES } from '@/lib/toastMessages'

import { useDeleteResource } from '../hooks/useDeleteResource'

export interface DeleteResourceModalProps {
  resource: Resource | null
  onClose: () => void
}

export function DeleteResourceModal({ resource, onClose }: DeleteResourceModalProps) {
  const { remove, isLoading } = useDeleteResource()
  const { showToast } = useToast()

  async function handleConfirm() {
    if (!resource) return
    try {
      await remove(resource.id)
      onClose()
      showToast(SUCCESS_MESSAGES.resourceDeleted)
    } catch (error) {
      showToast(getErrorMessage(error, 'Não foi possível excluir o recurso.'), 'error')
    }
  }

  return (
    <Modal open={resource !== null} title="Excluir recurso" onClose={onClose}>
      <p>
        Tem certeza que deseja excluir{' '}
        <strong className="text-neutral-900">
          {resource ? getResourceDisplayName(resource) : ''}
        </strong>
        ? Esta ação não pode ser desfeita.
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className="bg-danger hover:bg-danger/90"
        >
          {isLoading ? 'Excluindo...' : 'Excluir'}
        </Button>
      </div>
    </Modal>
  )
}
