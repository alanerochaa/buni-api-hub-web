import { Link } from 'react-router'

import { paths } from '@/routes'
import { Card } from '../Card'

function ConstructionIcon() {
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
      <rect x="2" y="6" width="20" height="8" rx="1" />
      <path d="M17 14v7" />
      <path d="M7 14v7" />
      <path d="M17 3v3" />
      <path d="M7 3v3" />
      <path d="M10 14 2.3 6.3" />
      <path d="m14 6 7.7 7.7" />
      <path d="m8 6 8 8" />
    </svg>
  )
}

export interface ComingSoonPageProps {
  title: string
  description?: string
}

/**
 * Placeholder genérico para itens de navegação já previstos mas ainda
 * sem funcionalidade própria (Dashboard, Documentação, Swagger,
 * Relatórios e Configurações, por exemplo) — cada um vira só uma rota
 * nova apontando pra este mesmo componente, sem precisar reescrever a
 * Sidebar nem criar uma tela nova do zero.
 */
export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <div className="flex justify-center py-12">
      <Card className="flex max-w-md flex-col items-center gap-3 px-8 py-10 text-center">
        <span className="bg-brand-100 text-brand-800 flex size-12 items-center justify-center rounded-full">
          <ConstructionIcon />
        </span>
        <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
        <p className="text-sm text-neutral-500">
          {description ??
            'Esta funcionalidade está em desenvolvimento e estará disponível em breve.'}
        </p>
        <Link
          to={paths.catalog.getHref()}
          className="text-brand-800 focus-visible:ring-brand-700 mt-2 rounded-sm text-sm underline outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        >
          Voltar ao catálogo
        </Link>
      </Card>
    </div>
  )
}
