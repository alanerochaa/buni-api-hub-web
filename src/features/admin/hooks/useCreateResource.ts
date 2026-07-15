import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getErrorMessage } from '@/lib/errors'
import { createResource } from '@/services/adminResource.service'
import type { ResourceInput } from '@/services/adminResource.service'
import type { Resource } from '@/features/catalog'

export interface UseCreateResourceResult {
  create: (input: ResourceInput) => Promise<Resource>
  isLoading: boolean
  error: string | null
}

export function useCreateResource(): UseCreateResourceResult {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
  })

  return {
    create: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.isError
      ? getErrorMessage(mutation.error, 'Não foi possível cadastrar o recurso.')
      : null,
  }
}
