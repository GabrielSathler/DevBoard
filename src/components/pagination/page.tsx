"use client"

import { useSearchParams } from "next/navigation"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "../ui/pagination"

type PaginationClientProps = {
  paginaAtual: number
  nextPage: boolean
}

export function PaginationView({ paginaAtual, nextPage }: PaginationClientProps) {
  const searchParams = useSearchParams()

  const buildHref = (to_page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(to_page))
    return `?${params.toString()}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={buildHref(paginaAtual > 1 ? paginaAtual - 1 : 1)}
              tabIndex={paginaAtual == 1 ? -1 : 0}
              style={
                paginaAtual == 1
                  ? { pointerEvents: 'none', opacity: 0.5 }
                  : {}
              }
              aria-disabled={paginaAtual == 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={buildHref(paginaAtual + 1)}
              tabIndex={!nextPage ? -1 : 0}
              style={
                !nextPage ? { pointerEvents: 'none', opacity: 0.5 } : {}
              }
              aria-disabled={!nextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}