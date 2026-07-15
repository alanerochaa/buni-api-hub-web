import { useCallback, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'

import { Toast } from './Toast'
import type { ToastVariant } from './Toast'
import { ToastContext } from './ToastContext'

const TOAST_DURATION_MS = 3000

/**
 * Toast único e global, montado uma vez acima do <RouterProvider/>
 * (ver app/providers.tsx) — sobrevive a navegações, então uma mensagem
 * disparada logo antes de um redirect (ex.: "Recurso cadastrado com
 * sucesso." seguido de voltar para a listagem) continua visível na
 * tela seguinte, em vez de ser desmontada junto com a página de
 * origem. Substitui o padrão anterior de cada página manter seu
 * próprio `useState` + `<Toast/>` local.
 */
export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
    clearTimeout(timeoutRef.current)
    setToast({ message, variant })
    timeoutRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toast?.message ?? ''} visible={toast !== null} variant={toast?.variant} />
    </ToastContext.Provider>
  )
}
