import { PageContainer } from './PageContainer'

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <PageContainer className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-neutral-500 sm:flex-row">
        <span>
          Desenvolvido por{' '}
          <span className="font-medium text-neutral-700">Catarse Tecnologia & Consultoria</span>
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldIcon />
          Ambiente seguro • dados protegidos conforme a LGPD
        </span>
      </PageContainer>
    </footer>
  )
}
