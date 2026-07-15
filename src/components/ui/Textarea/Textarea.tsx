import { useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function Textarea({ label, error, className = '', id, rows = 3, ...props }: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        className={`focus-visible:ring-brand-700 w-full resize-y rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
          error ? 'border-danger focus:border-danger' : 'border-neutral-300 focus:border-neutral-500'
        } ${className}`}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  )
}
