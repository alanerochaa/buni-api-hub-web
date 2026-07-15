const COLUMNS = ['Nome', 'URL', 'Tipo', 'Ambiente', 'Status', 'Última verificação', 'Ações']

export function ResourceTableHeader() {
  return (
    <thead className="sticky top-0 z-10 bg-white">
      <tr className="border-b border-neutral-200 text-left text-xs font-medium text-neutral-500">
        <th scope="col" className="px-3 py-2.5 whitespace-nowrap">
          <span className="sr-only">Favorito</span>
        </th>
        {COLUMNS.map((column) => (
          <th key={column} scope="col" className="px-3 py-2.5 whitespace-nowrap">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  )
}
