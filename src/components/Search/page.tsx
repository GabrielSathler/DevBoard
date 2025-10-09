"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

import { SearchIcon, Loader2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

export function Search () {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchValue, setSearchValue] = useState<string>("")
  const [pending, startTransition] = useTransition()

  const handleSearch = (search: string) => {
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.delete('page')

    startTransition(() => {
      if (search && search.length > 2) {
        currentParams.set("q", search)
      } else {
        currentParams.delete("q")
      }
      router.push(`?${currentParams.toString()}`)
    })
  }

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString())
    if (currentParams.has("q")) {
      setSearchValue(currentParams.get("q") || "")
    }
  },  [searchParams])

  return (
    <div className="mb-8">
      <InputGroup className="max-w-6xl mx-auto p-4">
        <InputGroupInput
          placeholder="Digite o nome..."
          value={searchValue}
          onChange={(e) => {
            const value = e.target.value
            setSearchValue(value)
            handleSearch(value)
          }}
        />

        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">
          <InputGroupButton>Procurar</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="mt-4 relative">
        {pending && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center mx-auto min-h-[600px] max-w-[1300px]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground font-medium">
                Buscando usuários...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}