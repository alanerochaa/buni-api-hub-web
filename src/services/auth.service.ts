import { api } from '@/lib/axios'

export type Role = 'ROLE_ADMIN' | 'ROLE_USER'

export interface AuthUser {
  id: string
  nome: string
  email: string
  role: Role
}

export interface LoginInput {
  email: string
  password: string
}

export interface LoginResult {
  token: string
  user: AuthUser
}

export async function login(input: LoginInput): Promise<LoginResult> {
  const { data } = await api.post<LoginResult>('/auth/login', input)
  return data
}
