import { Button } from '@/components/ui'

import { SearchInput } from './SearchInput'

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5 shrink-0 text-neutral-400"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ClearIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="focus-within:ring-brand-700 flex w-full items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-offset-1 sm:gap-4 sm:px-4">
      <SearchIcon />
      <SearchInput value={value} onChange={(event) => onChange(event.target.value)} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClear}
        disabled={!value}
        className="shrink-0 px-2 sm:px-3"
      >
        <ClearIcon />
        <span className="hidden sm:inline">Limpar</span>
      </Button>
    </div>
  )
}
