import { useCallback, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'

import { Toast } from './Toast'
import type { ToastVariant } from './Toast'
import { ToastContext } from './ToastContext'

const TOAST_DURATION_MS = 3000

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
