import type { OperationalEvent } from '../types'
import { downloadFile } from './downloadFile'
import { buildOperationalLogCsv } from './operationalLogCsv'

export type ExportFormat = 'csv'
// Futuro: 'excel' | 'pdf' — acrescentar aqui e um serializer em
// OPERATIONAL_LOG_EXPORTERS abaixo é o suficiente; exportOperationalLog()
// e quem a chama (o botão "Exportar" da tela) não precisam mudar.

export interface OperationalLogExporter {
  format: ExportFormat
  label: string
  fileExtension: string
  mimeType: string
  serialize: (events: OperationalEvent[]) => string
}

const csvExporter: OperationalLogExporter = {
  format: 'csv',
  label: 'CSV',
  fileExtension: 'csv',
  mimeType: 'text/csv;charset=utf-8;',
  serialize: buildOperationalLogCsv,
}

export const OPERATIONAL_LOG_EXPORTERS: Record<ExportFormat, OperationalLogExporter> = {
  csv: csvExporter,
}

/** Exporta o Log Operacional só com os registros já filtrados (recebidos prontos por quem chama). */
export function exportOperationalLog(events: OperationalEvent[], format: ExportFormat = 'csv'): void {
  const exporter = OPERATIONAL_LOG_EXPORTERS[format]
  const filename = `log-operacional-${new Date().toISOString().slice(0, 10)}.${exporter.fileExtension}`
  downloadFile(exporter.serialize(events), filename, exporter.mimeType)
}
