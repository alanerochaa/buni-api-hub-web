import { getResourceIdentityKey } from './getResourceIdentityKey'
import type { Resource, ResourceEnvironment, ResourceHealth } from './types'

export interface ResourceEnvironmentEntry {
  environment: ResourceEnvironment
  resource: Resource
  health: ResourceHealth | undefined
}

export interface ResourceGroup extends Resource {
  environments: ResourceEnvironmentEntry[]
}

const ENVIRONMENT_PRIORITY: ResourceEnvironment[] = [
  'producao',
  'homologacao',
  'desenvolvimento',
  'unknown',
]

function pickRepresentative(entries: Resource[]): Resource {
  for (const environment of ENVIRONMENT_PRIORITY) {
    const match = entries.find((entry) => entry.environment === environment)
    if (match) return match
  }
  return entries[0]
}

export function groupResourcesByIdentity(
  resources: Resource[],
  healthByResourceId: Map<string, ResourceHealth>,
): ResourceGroup[] {
  const entriesByKey = new Map<string, Resource[]>()

  for (const resource of resources) {
    const key = getResourceIdentityKey(resource)
    const entries = entriesByKey.get(key)
    if (entries) {
      entries.push(resource)
    } else {
      entriesByKey.set(key, [resource])
    }
  }

  return Array.from(entriesByKey.values()).map((entries) => {
    const representative = pickRepresentative(entries)
    return {
      ...representative,
      environments: entries.map((resource) => ({
        environment: resource.environment,
        resource,
        health: healthByResourceId.get(resource.id),
      })),
    }
  })
}

export function projectResourceGroupToEnvironment(
  group: ResourceGroup,
  environment: ResourceEnvironment,
): ResourceGroup | undefined {
  const entry = group.environments.find((candidate) => candidate.environment === environment)
  if (!entry) return undefined
  return { ...group, ...entry.resource }
}


export function findResourceGroupById(
  groups: ResourceGroup[],
  resourceId: string,
): ResourceGroup | undefined {
  return groups.find((group) =>
    group.environments.some((entry) => entry.resource.id === resourceId),
  )
}
