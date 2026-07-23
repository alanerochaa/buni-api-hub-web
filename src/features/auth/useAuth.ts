import { useContext } from 'react'

import { AuthContext } from './AuthContext'
import type { AuthContextValue } from './AuthContext'

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de <AuthProvider>.')
  }
  return context
}
