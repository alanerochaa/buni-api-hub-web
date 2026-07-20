import { PageContainer } from './PageContainer'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="from-brand-900 via-brand-800 to-brand-600 sticky top-0 z-30 bg-gradient-to-br shadow-[0_8px_20px_-14px_rgba(7,28,51,0.45)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(255,255,255,0.08),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10"
      />

      <PageContainer className="h-header relative flex items-center gap-3">
        <Logo />
        <div
          aria-hidden="true"
          className="h-12 w-px shrink-0 bg-gradient-to-b from-white/0 via-white/20 to-white/0"
        />
        <div className="min-w-0">
          <h1 className="text-2xl leading-tight font-bold tracking-tight text-white">
            Portal de Serviços
          </h1>
          <p className="mt-0.5 truncate text-sm font-light tracking-wide text-white/65">
            Catálogo de APIs, Web Services e Sites
          </p>
        </div>
      </PageContainer>
    </header>
  )
}
