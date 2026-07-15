import type { ReactNode } from 'react'

export interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-lg"
      >
        <h2 id="modal-title" className="text-base font-semibold text-neutral-900">
          {title}
        </h2>
        <div className="mt-3 text-sm text-neutral-600">{children}</div>
      </div>
    </div>
  )
}
