export interface ToastProps {
  message: string
  visible: boolean
  variant?: 'default' | 'error'
}

const VARIANT_CLASSES = {
  default: 'bg-neutral-900',
  error: 'bg-danger',
} as const

export function Toast({ message, visible, variant = 'default' }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-2.5 text-sm text-white shadow-lg transition-all duration-200 ${VARIANT_CLASSES[variant]} ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      {message}
    </div>
  )
}
