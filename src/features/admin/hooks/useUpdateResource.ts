import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getErrorMessage } from '@/lib/errors'
import { updateResource } from '@/services/adminResource.service'
import type { ResourceInput } from '@/services/adminResource.service'
import type { Resource } from '@/features/catalog'

export interface UseUpdateResourceResult {
  update: (args: { id: string; input: Partial<ResourceInput> }) => Promise<Resource>
  isLoading: boolean
  error: string | null
}

export function useUpdateResource(): UseUpdateResourceResult {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<ResourceInput> }) =>
      updateResource(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
  })

  return {
    update: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.isError
      ? getErrorMessage(mutation.error, 'Não foi possível atualizar o recurso.')
      : null,
  }
}
