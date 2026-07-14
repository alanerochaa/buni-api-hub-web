import type { InputHTMLAttributes } from 'react'

export type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

export function SearchInput({
  placeholder = 'Pesquisar por nome, código, palavra-chave, descrição ou URL...',
  className = '',
  ...props
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-base ${className}`}
      {...props}
    />
  )
}
