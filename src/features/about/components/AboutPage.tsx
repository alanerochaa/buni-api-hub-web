import type { ReactNode } from 'react'

import { Badge, Card } from '@/components/ui'

interface FeatureItem {
  icon: ReactNode
  title: string
  description: string
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function DetailsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function StarOutlineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function ServerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <rect x="2" y="3" width="20" height="6" rx="1.5" />
      <rect x="2" y="15" width="20" height="6" rx="1.5" />
      <line x1="6" y1="6" x2="6" y2="6" />
      <line x1="6" y1="18" x2="6" y2="18" />
    </svg>
  )
}

const FEATURES: FeatureItem[] = [
  {
    icon: <LayersIcon />,
    title: 'Catálogo consolidado',
    description:
      'APIs, Web Services e Sites da organização em um único catálogo, com cada recurso representado uma só vez, mesmo quando existe em mais de um ambiente.',
  },
  {
    icon: <SearchIcon />,
    title: 'Pesquisa flexível',
    description:
      'Localize recursos pelo nome funcional, pelo nome técnico ou pela URL, sem depender da nomenclatura interna.',
  },
  {
    icon: <FilterIcon />,
    title: 'Filtros por tipo, ambiente e status',
    description:
      'Refine a consulta pelo tipo de recurso, pelo ambiente de execução ou pela disponibilidade verificada em tempo real.',
  },
  {
    icon: <PulseIcon />,
    title: 'Monitoramento contínuo',
    description:
      'Verificação automática e periódica da disponibilidade de cada ambiente, com status e horário da última checagem sempre visíveis.',
  },
  {
    icon: <DetailsIcon />,
    title: 'Detalhes centralizados',
    description:
      'URL, status e ambientes disponíveis de cada recurso reunidos em uma única tela, sem alternar entre fontes.',
  },
  {
    icon: <StarOutlineIcon />,
    title: 'Favoritos e compartilhamento',
    description:
      'Marcação de recursos de uso frequente e compartilhamento direto de consultas, filtros e buscas pela URL.',
  },
]

const FRONTEND_STACK = [
  'React',
  'TypeScript',
  'Vite',
  'React Router',
  'TanStack Query',
  'Axios',
  'Tailwind CSS',
]

const BACKEND_STACK = ['Node.js', 'Express', 'TypeScript', 'Zod']

interface SectionProps {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-900 uppercase">
        <span className="bg-brand-600 h-3.5 w-1 rounded-full" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  )
}

function FeatureCard({ icon, title, description }: FeatureItem) {
  return (
    <Card className="flex h-full flex-col gap-2.5 !p-5">
      <span className="bg-brand-50 text-brand-700 flex size-9 shrink-0 items-center justify-center rounded-md">
        {icon}
      </span>
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-500">{description}</p>
    </Card>
  )
}

function TechGroup({
  title,
  icon,
  accentClassName,
  items,
}: {
  title: string
  icon: ReactNode
  accentClassName: string
  items: string[]
}) {
  return (
    <Card className="flex h-full flex-col gap-3 !p-5">
      <div className="flex items-center gap-2">
        <span className={`flex size-7 shrink-0 items-center justify-center rounded-md ${accentClassName}`}>
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </Card>
  )
}

export function AboutPage() {
  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-8 pb-12">
      <div className="border-b border-neutral-200 pb-6">
        <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase">Institucional</p>
        <h1 className="mt-1 text-2xl font-semibold text-neutral-900">Sobre</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          Propósito, modelo de recursos e stack tecnológica por trás do Portal de Serviços.
        </p>
      </div>

      <Section title="Visão Geral">
        <Card className="!rounded-xl !p-6">
          <p className="text-sm leading-relaxed text-neutral-700">
            O Portal de Serviços centraliza o catálogo de APIs, Web Services e Sites da
            organização em um único lugar, com pesquisa padronizada e informações sempre
            atualizadas. O objetivo é reduzir a dispersão da documentação técnica e dar às equipes
            de desenvolvimento, arquitetura e integração uma fonte única e confiável de consulta.
          </p>
        </Card>
      </Section>

      <Section title="Recursos e Ambientes">
        <Card className="!rounded-xl !p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="bg-brand-50 text-brand-700 flex size-9 shrink-0 items-center justify-center rounded-md">
              <LayersIcon />
            </span>
            <div className="flex flex-col gap-2">
              <p className="text-sm leading-relaxed text-neutral-700">
                No Portal, cada recurso — uma API, um Web Service ou um Site — representa uma
                capacidade de negócio, não um registro isolado por ambiente. Um mesmo recurso pode
                estar disponível em Homologação e em Produção simultaneamente; o Portal reconhece
                as duas versões como o mesmo recurso e apresenta uma visão consolidada, com o
                status de disponibilidade de cada ambiente exibido lado a lado.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Recurso único</Badge>
                <Badge>Homologação</Badge>
                <Badge>Produção</Badge>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Principais Funcionalidades">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Section>

      <Section title="Arquitetura Tecnológica">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TechGroup
            title="Frontend"
            icon={<MonitorIcon />}
            accentClassName="bg-brand-50 text-brand-700"
            items={FRONTEND_STACK}
          />
          <TechGroup
            title="Backend"
            icon={<ServerIcon />}
            accentClassName="bg-neutral-100 text-neutral-600"
            items={BACKEND_STACK}
          />
        </div>
      </Section>
    </div>
  )
}
