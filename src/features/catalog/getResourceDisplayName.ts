import type { Resource } from './types'

export function getResourceDisplayName(resource: Pick<Resource, 'displayName' | 'name'>): string {
  return resource.displayName ?? resource.name
}
