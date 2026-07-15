import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'

import { StarIcon } from '@/components/ui'
import { AdminIcon } from '@/features/admin'
import { ApiIcon, SiteIcon, WebServiceIcon } from '@/features/catalog'
import { paths } from '@/routes'

const FOCUS_RING_CLASSES =
  'outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-1'

function ChevronLeftIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function HomeIcon() {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function InfoIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

interface RouteNavItem {
  href: string
  label: string
  icon: ReactNode
}

// Início/APIs/Web Services/Sites são rotas reais e mutuamente
// exclusivas — cada uma decide sua própria "view" do catálogo (ver
// features/catalog/components/CatalogPage.tsx), sem query params.
const CATALOG_ITEMS: RouteNavItem[] = [
  { href: paths.catalog.getHref(), label: 'Início', icon: <HomeIcon /> },
  { href: paths.apis.getHref(), label: 'APIs', icon: <ApiIcon className="size-5" /> },
  { href: paths.webServices.getHref(), label: 'Web Services', icon: <WebServiceIcon className="size-5" /> },
  { href: paths.sites.getHref(), label: 'Sites', icon: <SiteIcon className="size-5" /> },
]

const INFO_ITEMS: RouteNavItem[] = [
  { href: paths.about.getHref(), label: 'Sobre', icon: <InfoIcon /> },
]

const ADMIN_ITEMS: RouteNavItem[] = [
  { href: paths.admin.resources.getHref(), label: 'Cadastro de Recursos', icon: <AdminIcon /> },
]

// Breakpoint md do Tailwind (768px): abaixo disso é considerado mobile
// e a sidebar inicia recolhida; tablet (>=768px) e desktop iniciam
// expandidos.
function getInitialExpandedState(): boolean {
  if (typeof window === 'undefined') return true
  return window.innerWidth >= 768
}

function itemClasses(isActive: boolean, isExpanded: boolean): string {
  const base = `flex items-center gap-2.5 rounded-md py-1.5 text-sm transition-colors duration-200 ${FOCUS_RING_CLASSES}`
  const alignment = isExpanded ? 'px-2' : 'justify-center px-0'
  const tone = isActive
    ? 'bg-brand-100 text-brand-800 shadow-sm font-medium'
    : 'text-neutral-600 hover:bg-brand-50'
  return `${base} ${alignment} ${tone}`
}

/**
 * A Sidebar é layout/ (aparece em toda rota). Todos os itens são
 * navegação real via <Link> — nenhum deles pilota filtro por query
 * param; importa ícones do barrel público de catalog só por
 * conveniência visual, sem reinventá-los aqui.
 */
export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(getInitialExpandedState)
  const location = useLocation()

  function renderLabel(label: string) {
    return (
      <span
        className={`overflow-hidden text-left whitespace-nowrap transition-all duration-200 ${
          isExpanded ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0'
        }`}
      >
        {label}
      </span>
    )
  }

  function isRouteActive(href: string): boolean {
    return location.pathname === href || (href !== '/' && location.pathname.startsWith(`${href}/`))
  }

  function renderRouteItem(item: RouteNavItem) {
    const isActive = isRouteActive(item.href)

    return (
      <Link
        key={item.href}
        to={item.href}
        title={item.label}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
        className={itemClasses(isActive, isExpanded)}
      >
        <span className="shrink-0">{item.icon}</span>
        {renderLabel(item.label)}
      </Link>
    )
  }

  function renderFavoritesItem() {
    const isActive = isRouteActive(paths.favorites.getHref())

    return (
      <Link
        to={paths.favorites.getHref()}
        title="Favoritos"
        aria-label="Favoritos"
        aria-current={isActive ? 'page' : undefined}
        className={itemClasses(isActive, isExpanded)}
      >
        <span className="shrink-0">
          <StarIcon className="size-5" filled={isActive} />
        </span>
        {renderLabel('Favoritos')}
      </Link>
    )
  }

  return (
    <aside
      className={`top-header sticky z-20 flex h-[calc(100svh-var(--spacing-header))] shrink-0 flex-col border-r border-neutral-200 bg-white transition-[width] duration-200 ease-in-out ${
        isExpanded ? 'w-60' : 'w-16'
      }`}
    >
      <div className="flex justify-end p-2">
        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          aria-label={isExpanded ? 'Recolher menu' : 'Expandir menu'}
          className={`rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 ${FOCUS_RING_CLASSES}`}
        >
          <ChevronLeftIcon
            className={`size-4 transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`}
          />
        </button>
      </div>

      <nav className="flex flex-col gap-0.5 px-2">
        {CATALOG_ITEMS.map(renderRouteItem)}
        <div className="my-1.5 border-t border-neutral-200" />
        {ADMIN_ITEMS.map(renderRouteItem)}
        {renderFavoritesItem()}
        <div className="my-1.5 border-t border-neutral-200" />
        {INFO_ITEMS.map(renderRouteItem)}
      </nav>
    </aside>
  )
}
