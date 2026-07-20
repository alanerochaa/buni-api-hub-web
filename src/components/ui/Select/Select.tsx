import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  value: string
  label: string
}

const SIZE_CLASSES = {
  md: { wrapper: 'gap-1.5', label: 'text-sm', select: 'h-10 px-3 pr-9 text-sm' },
  sm: { wrapper: 'gap-1', label: 'text-xs', select: 'h-8 px-2.5 pr-8 text-sm' },
} as const

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'size'> {
  label: string
  options: SelectOption[]
  size?: keyof typeof SIZE_CLASSES
  hideLabel?: boolean
}

export function Select({
  label,
  options,
  size = 'md',
  hideLabel = false,
  className = '',
  id,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const sizeClasses = SIZE_CLASSES[size]

  return (
    <div className={`flex flex-col ${sizeClasses.wrapper}`}>
      <label
        htmlFor={selectId}
        className={hideLabel ? 'sr-only' : `font-medium text-neutral-700 ${sizeClasses.label}`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          className={`focus-visible:ring-brand-700 w-full appearance-none rounded-md border border-neutral-300 bg-white text-neutral-900 transition-colors outline-none focus:border-neutral-500 focus-visible:ring-2 focus-visible:ring-offset-1 ${sizeClasses.select} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-neutral-400"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}
