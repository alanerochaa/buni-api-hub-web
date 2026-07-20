import { normalizeSearchTerm } from './normalizeSearchTerm'
import type { Resource } from './types'

export function getResourceIdentityKey(resource: Resource): string {
  const code = resource.code?.trim()
  const identity = code || normalizeSearchTerm(resource.name)
  return `${resource.type}:${identity}`
}
