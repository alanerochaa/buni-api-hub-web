import type { ReactNode } from 'react'

import { Badge, Card } from '@/components/ui'

interface FeatureItem {
  title: string
  description: string
}

const FEATURES: FeatureItem[] = [
  {
    title: 'Pesquisa por nome funcional, nome técnico ou URL',
    description:
      'Localização de recursos a partir de diferentes formas de identificação, sem exigir conhecimento prévio da nomenclatura técnica.',
  },
  {
    title: 'Consulta centralizada de APIs, Web Services e Sites',
    description:
      'Catálogo único reunindo os principais tipos de recursos tecnológicos utilizados pela organização.',
  },
  {
    title: 'Filtros por tipo, ambiente e status',
    description:
      'Refinamento da consulta considerando a natureza do recurso, o ambiente de execução e a disponibilidade verificada.',
  },
  {
    title: 'Visualização dos detalhes de cada recurso',
    description:
      'Acesso às informações complementares de cada recurso, incluindo URL, ambiente e status de disponibilidade.',
  },
  {
    title: 'Compartilhamento por URL',
    description:
      'Consultas, buscas e filtros refletidos na URL, permitindo o envio direto de uma consulta específica.',
  },
  {
    title: 'Favoritos persistidos localmente',
    description: 'Marcação de recursos de uso frequente, armazenada no navegador do usuário.',
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

// Barrinha de destaque em `brand` antes do título — mesmo tom de acento
// usado no restante do Portal (links, estado ativo da Sidebar), só para
// dar mais peso visual ao cabeçalho de cada seção da página.
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

function TechGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-100 bg-neutral-50 p-4">
      <h3 className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-10 pb-12">
      <div className="border-b border-neutral-200 pb-6">
        <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase">Institucional</p>
        <h1 className="mt-1 text-2xl font-semibold text-neutral-900">Sobre</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          Conheça o catálogo corporativo de APIs, Web Services e Sites utilizados pela organização.
        </p>
      </div>

      <Section title="Visão Geral">
        <Card className="!rounded-xl !p-6">
          <p className="text-sm leading-relaxed text-neutral-700">
            O Catálogo de Serviços reúne, em um único ambiente, as APIs, Web Services e Sites
            utilizados pela organização, permitindo consultas rápidas, pesquisa padronizada e
            acesso centralizado às informações dos recursos tecnológicos.
          </p>
        </Card>
      </Section>

      <Section title="Objetivo">
        <Card className="!rounded-xl !p-6">
          <p className="text-sm leading-relaxed text-neutral-700">
            Centralizar os recursos tecnológicos da organização em um único catálogo, facilitando
            a consulta por equipes de desenvolvimento, arquitetura e integração, reduzindo a
            dispersão da documentação e promovendo a padronização das informações.
          </p>
        </Card>
      </Section>

      <Section title="Principais Funcionalidades">
        <Card className="!rounded-xl !p-6">
          <ul className="-mx-6 -my-6 divide-y divide-neutral-200">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex flex-col gap-1 px-6 py-4">
                <span className="text-sm font-medium text-neutral-900">{feature.title}</span>
                <span className="text-sm text-neutral-500">{feature.description}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section title="Arquitetura Tecnológica">
        <Card className="!rounded-xl !p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TechGroup title="Frontend" items={FRONTEND_STACK} />
            <TechGroup title="Backend" items={BACKEND_STACK} />
          </div>
        </Card>
      </Section>
    </div>
  )
}
