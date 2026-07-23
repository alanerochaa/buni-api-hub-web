import { Link } from 'react-router'

import { Button, EmptyState } from '@/components/ui'
import { paths } from '@/routes'

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-6"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function AccessDeniedPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <EmptyState
        icon={<LockIcon />}
        title="Acesso negado"
        description="Você não tem permissão para acessar esta página."
        action={
          <Link to={paths.catalog.getHref()}>
            <Button variant="secondary" size="sm">
              Voltar para o início
            </Button>
          </Link>
        }
      />
    </div>
  )
}
