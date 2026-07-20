import { useMemo } from 'react'

import {
  findResourceGroupById,
  groupResourcesByIdentity,
  useResources,
  useResourcesHealth,
  type ResourceGroup,
} from '@/features/catalog'

export interface UseResourceGroupResult {
  group: ResourceGroup | undefined
  isLoading: boolean
  error: string | null
}

export function useResourceGroup(resourceId: string | undefined): UseResourceGroupResult {
  const { resources, isLoading: resourcesLoading, error } = useResources()
  const { healthByResourceId } = useResourcesHealth()

  const group = useMemo(() => {
    if (!resourceId) return undefined
    const groups = groupResourcesByIdentity(resources, healthByResourceId)
    return findResourceGroupById(groups, resourceId)
  }, [resources, healthByResourceId, resourceId])

  return {
    group,
    isLoading: resourcesLoading,
    error,
  }
}
