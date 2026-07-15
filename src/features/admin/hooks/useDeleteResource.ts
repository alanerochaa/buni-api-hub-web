import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getErrorMessage } from '@/lib/errors'
import { deleteResource } from '@/services/adminResource.service'

export interface UseDeleteResourceResult {
  remove: (id: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function useDeleteResource(): UseDeleteResourceResult {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
  })

  return {
    remove: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.isError
      ? getErrorMessage(mutation.error, 'Não foi possível excluir o recurso.')
      : null,
  }
}
