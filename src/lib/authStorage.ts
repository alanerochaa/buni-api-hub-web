import type { AuthUser } from '@/services/auth.service'

const TOKEN_KEY = 'buni:auth:token'
const USER_KEY = 'buni:auth:user'

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setStoredSession(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearStoredSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isTokenExpired(token: string): boolean {
  const payloadSegment = token.split('.')[1]
  if (!payloadSegment) return true

  try {
    const normalized = payloadSegment.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(normalized)) as { exp?: number }
    if (!payload.exp) return false
    return Date.now() >= payload.exp * 1000
  } catch {
    return true
  }
}
