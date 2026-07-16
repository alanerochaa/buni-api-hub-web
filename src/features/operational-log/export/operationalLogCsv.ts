import { RESOURCE_ENVIRONMENT_LABELS, RESOURCE_TYPE_LABELS } from '@/features/catalog'

import { OPERATIONAL_LOG_STATUS_LABELS } from '../constants'
import { formatDuration } from '../formatDuration'
import type { OperationalEvent } from '../types'

const CSV_HEADERS = [
  'Data e Hora',
  'Recurso',
  'Tipo',
  'Ambiente',
  'Status Anterior',
  'Novo Status',
  'Motivo',
  'Mensagem de Erro',
  'Tempo de Resposta (ms)',
  'Código HTTP',
  'Duração da Indisponibilidade',
  'Origem da Verificação',
  'URL Verificada',
]

// RFC 4180: aspas duplas em volta de qualquer campo com separador,
// aspas ou quebra de linha; aspas internas viram duas aspas.
function escapeCsvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function toRow(event: OperationalEvent): string {
  const fields = [
    new Date(event.timestamp).toLocaleString('pt-BR'),
    event.resourceName,
    RESOURCE_TYPE_LABELS[event.resourceType],
    event.environment ? RESOURCE_ENVIRONMENT_LABELS[event.environment] : '',
    OPERATIONAL_LOG_STATUS_LABELS[event.previousStatus],
    OPERATIONAL_LOG_STATUS_LABELS[event.currentStatus],
    event.reason,
    event.errorMessage ?? '',
    event.responseTime !== undefined ? String(event.responseTime) : '',
    event.httpStatus !== undefined ? String(event.httpStatus) : '',
    event.unavailabilityDurationMs !== undefined ? formatDuration(event.unavailabilityDurationMs) : '',
    event.origin === 'manual' ? 'Verificação manual' : 'Varredura automática',
    event.resourceUrl ?? '',
  ]
  return fields.map(escapeCsvField).join(',')
}

// Construído via código de caractere (não colado como literal) para não
// depender de um byte invisível sobrevivendo intacto em edições futuras
// deste arquivo — U+FEFF é o BOM que o Excel no Windows exige para
// reconhecer o CSV como UTF-8 (sem ele, acentos viram lixo ao abrir).
const BOM = String.fromCharCode(0xfeff)

/** Serializa o Log Operacional (eventos) já filtrado em CSV. */
export function buildOperationalLogCsv(events: OperationalEvent[]): string {
  const lines = [CSV_HEADERS.join(','), ...events.map(toRow)]
  return `${BOM}${lines.join('\r\n')}`
}
