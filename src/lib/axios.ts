import Axios from 'axios'

import { env } from '@/config/env'

export const api = Axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
