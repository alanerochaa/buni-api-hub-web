import type { OperationalEvent } from '../types'
import { downloadFile } from './downloadFile'
import { buildOperationalLogCsv } from './operationalLogCsv'

export type ExportFormat = 'csv'
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

export function exportOperationalLog(events: OperationalEvent[], format: ExportFormat = 'csv'): void {
  const exporter = OPERATIONAL_LOG_EXPORTERS[format]
  const filename = `log-operacional-${new Date().toISOString().slice(0, 10)}.${exporter.fileExtension}`
  downloadFile(exporter.serialize(events), filename, exporter.mimeType)
}
