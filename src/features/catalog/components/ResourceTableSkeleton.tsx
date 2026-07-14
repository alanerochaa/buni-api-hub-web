import { Skeleton } from '@/components/ui'

import { ResourceTableHeader } from './ResourceTableHeader'

const SKELETON_ROW_COUNT = 8

/** Mesma forma da ResourceTable real — cabeçalho de verdade (mesmos rótulos), linhas em blocos. */
export function ResourceTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <ResourceTableHeader />
        <tbody>
          {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
            <tr key={index} className="border-b border-neutral-100 last:border-0">
              <td className="px-3 py-2.5">
                <Skeleton className="size-4 rounded" />
              </td>
              <td className="px-3 py-2.5">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-2.5">
                <Skeleton className="h-4 w-36" />
              </td>
              <td className="px-3 py-2.5">
                <Skeleton className="h-5 w-14 rounded-full" />
              </td>
              <td className="px-3 py-2.5">
                <Skeleton className="h-5 w-20 rounded-full" />
              </td>
              <td className="px-3 py-2.5">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-2.5">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-2.5">
                <Skeleton className="ml-auto h-4 w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
