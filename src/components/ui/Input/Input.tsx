import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

const SIZE_CLASSES = {
  md: {
    wrapper: 'gap-1.5',
    label: 'text-sm',
    input: 'h-10 text-sm',
    padX: 'px-3',
    padXWithIcon: 'pl-9 pr-3',
    icon: 'left-3',
  },
  sm: {
    wrapper: 'gap-1',
    label: 'text-xs',
    input: 'h-8 text-sm',
    padX: 'px-2.5',
    padXWithIcon: 'pl-8 pr-2.5',
    icon: 'left-2.5',
  },
} as const

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  error?: string
  size?: keyof typeof SIZE_CLASSES
  hideLabel?: boolean
  icon?: ReactNode
}

export function Input({
  label,
  error,
  size = 'md',
  hideLabel = false,
  icon,
  className = '',
  id,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const sizeClasses = SIZE_CLASSES[size]

  return (
    <div className={`flex flex-col ${sizeClasses.wrapper}`}>
      <label
        htmlFor={inputId}
        className={hideLabel ? 'sr-only' : `font-medium text-neutral-700 ${sizeClasses.label}`}
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-neutral-400 ${sizeClasses.icon}`}
          >
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`focus-visible:ring-brand-700 w-full rounded-md border bg-white text-neutral-900 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${sizeClasses.input} ${
            icon ? sizeClasses.padXWithIcon : sizeClasses.padX
          } ${
            error ? 'border-danger focus:border-danger' : 'border-neutral-300 focus:border-neutral-500'
          } ${className}`}
          aria-invalid={error ? true : undefined}
          {...props}
        />
      </div>
      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  )
}
