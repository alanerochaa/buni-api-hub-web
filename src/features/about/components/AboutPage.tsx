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

function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold tracking-wide text-neutral-900 uppercase">{title}</h2>
      {children}
    </section>
  )
}

function TechGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-medium text-neutral-500">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="mx-auto flex max-w-[1000px] flex-col gap-8 pb-12">
      <div className="border-b border-neutral-200 pb-6">
        <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
          Buni API Hub
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-neutral-900">Sobre o Portal</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          Documentação institucional do sistema de catálogo de recursos tecnológicos.
        </p>
      </div>

      <Section title="Visão Geral">
        <Card>
          <p className="text-sm leading-relaxed text-neutral-700">
            O Buni API Hub é um portal corporativo destinado à centralização do catálogo de APIs,
            Web Services e Sites utilizados pela organização, permitindo consulta padronizada,
            pesquisa rápida e gerenciamento dos recursos disponíveis.
          </p>
        </Card>
      </Section>

      <Section title="Objetivo">
        <Card>
          <p className="text-sm leading-relaxed text-neutral-700">
            O portal tem como objetivo centralizar os recursos tecnológicos da organização em um
            catálogo único e padronizado, facilitando a consulta por equipes de desenvolvimento,
            arquitetura e integração. A padronização das informações reduz a dependência de
            documentação dispersa entre planilhas, repositórios e canais de comunicação,
            estabelecendo uma fonte única e atualizada para consulta dos recursos disponíveis.
          </p>
        </Card>
      </Section>

      <Section title="Principais Funcionalidades">
        <Card>
          <ul className="-mx-4 -my-4 divide-y divide-neutral-200">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex flex-col gap-1 px-4 py-3.5">
                <span className="text-sm font-medium text-neutral-900">{feature.title}</span>
                <span className="text-sm text-neutral-500">{feature.description}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section title="Arquitetura Tecnológica">
        <Card>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <TechGroup title="Frontend" items={FRONTEND_STACK} />
            <TechGroup title="Backend" items={BACKEND_STACK} />
          </div>
        </Card>
      </Section>

      <p className="text-center text-xs text-neutral-400">
        Desenvolvido por Catarse Tecnologia & Consultoria.
      </p>
    </div>
  )
}
