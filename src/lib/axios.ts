import Axios from 'axios'

import { env } from '@/config/env'
import { paths } from '@/routes'

import { resolveApiErrorMessage } from './apiErrorMessage'
import { clearStoredSession, getStoredToken } from './authStorage'

export const api = Axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error && typeof error === 'object') {
      Object.assign(error, { friendlyMessage: resolveApiErrorMessage(error) })
    }

    if (Axios.isAxiosError(error) && error.response?.status === 401) {
      clearStoredSession()
      if (window.location.pathname !== paths.login.path) {
        window.location.href = paths.login.getHref()
      }
    }

    return Promise.reject(error)
  },
)
