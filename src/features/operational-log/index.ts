// Barrel público da feature "operational-log". Outras camadas só devem
// importar a partir daqui.
export { OperationalLogPage } from './components/OperationalLogPage'
export { LogIcon } from './icons'
export type {
  OperationalEvent,
  OperationalLogFilters,
  OperationalLogOrigin,
  OperationalLogStatus,
} from './types'
