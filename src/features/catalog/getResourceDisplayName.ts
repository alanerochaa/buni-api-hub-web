import type { Resource } from './types'

/**
 * `displayName` (Sprint 17) tem prioridade quando presente — os
 * catálogos atuais nunca o preenchem, então isso cai para `name`
 * (que já é o nome amigável quando a origem tinha um, senão o nome
 * técnico) sem nenhuma mudança visível até os próximos catálogos
 * trazerem displayName de verdade.
 */
export function getResourceDisplayName(resource: Pick<Resource, 'displayName' | 'name'>): string {
  return resource.displayName ?? resource.name
}
