import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'

import { Button, Card, Input } from '@/components/ui'
import { getErrorMessage } from '@/lib/errors'
import { Logo } from '@/layout/Logo'
import { paths } from '@/routes'

import { useAuth } from '../useAuth'
import { LoginBackground } from './LoginBackground'

interface LocationState {
  from?: { pathname: string }
}

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  if (isAuthenticated) {
    const from = (location.state as LocationState | null)?.from?.pathname ?? paths.catalog.getHref()
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login(email, password)
      const from = (location.state as LocationState | null)?.from?.pathname ?? paths.catalog.getHref()
      navigate(from, { replace: true })
    } catch (submitError) {
      setError(getErrorMessage(submitError, 'Não foi possível entrar. Verifique suas credenciais.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="from-brand-950 via-brand-900 to-brand-800 relative flex min-h-svh items-center justify-center overflow-hidden bg-gradient-to-br p-4">
      <LoginBackground />

      <div className="relative w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo />
          <div>
            <h1 className="text-2xl leading-tight font-bold tracking-tight text-white">
              Portal de Serviços
            </h1>
            <p className="mt-0.5 text-sm font-light tracking-wide text-white/65">
              Catálogo de APIs, Web Services e Sites
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="bg-brand-300 absolute -inset-8 -z-10 rounded-[2rem] opacity-[0.15] blur-2xl"
          />

          <Card className="!shadow-[0_25px_60px_-15px_rgba(7,28,51,0.5)] p-6">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <Input
                label="E-mail"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Input
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              {error && <p className="text-danger text-sm">{error}</p>}

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="!bg-brand-700 hover:!bg-brand-800 mt-2"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
