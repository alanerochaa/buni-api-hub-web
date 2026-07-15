import { PageContainer } from './PageContainer'

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <PageContainer className="flex items-center justify-center py-4 text-xs text-neutral-500">
        <span>
          Desenvolvido por{' '}
          <span className="font-medium text-neutral-700">Catarse Tecnologia & Consultoria</span>
        </span>
      </PageContainer>
    </footer>
  )
}
