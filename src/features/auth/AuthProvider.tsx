import { useCallback, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'

import {
  clearStoredSession,
  getStoredToken,
  getStoredUser,
  isTokenExpired,
  setStoredSession,
} from '@/lib/authStorage'
import { login as loginRequest } from '@/services/auth.service'
import type { AuthUser } from '@/services/auth.service'

import { AuthContext } from './AuthContext'

function readStoredUser(): AuthUser | null {
  const token = getStoredToken()
  const user = getStoredUser()

  if (!token || !user || isTokenExpired(token)) {
    clearStoredSession()
    return null
  }

  return user
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser)

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginRequest({ email, password })
    setStoredSession(result.token, result.user)
    setUser(result.user)
  }, [])

  const logout = useCallback(() => {
    clearStoredSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
