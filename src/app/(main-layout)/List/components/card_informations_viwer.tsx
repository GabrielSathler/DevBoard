"use server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/db/client"
import { usuarios } from "@/db/schema/schema"
import { ilike, sql } from "drizzle-orm"
import axios from "axios"
import Image from "next/image"
import { Mail, User } from 'lucide-react'
import { ModalIformation } from "@/components/modalInformation/page"

type Props = {
  searchQuery?: string
  page?: string
}

export default async function UserInformations({ searchQuery, page }: Props) {

  const paginaAtual = parseInt(page ?? '1', 10)
  const limite = 6
  const offset = (paginaAtual - 1) * limite

  const listarUsuarios = searchQuery && searchQuery.length >= 1
    ? await db
      .select()
      .from(usuarios)
      .limit(limite)
      .offset(offset)
      .where(ilike(usuarios.github_username, `%${searchQuery}%`))
    : await db
      .select()
      .from(usuarios)
      .orderBy(usuarios.id)
      .limit(limite)
      .offset(offset)

  const counter = db.select({ count: sql`count(*)` }).from(usuarios)

  if (searchQuery) {
    counter.where(ilike(usuarios.username, `%${searchQuery}%`))
  }

  const counterPages = await counter
  const total = Number(counterPages[0].count)
  const totalPaginas = Math.ceil(total / limite)
  const nextPage = paginaAtual < totalPaginas

  if (searchQuery && searchQuery.length >= 1 && listarUsuarios.length === 0) {
    return {
      content: (
        <p className="text-center text-muted-foreground max-w-6xl mx-auto">
          Nenhum usuário encontrado para &apos;{searchQuery}&apos;
        </p>
      ),
      paginaAtual,
      nextPage,
      totalPaginas
    }
  }

  const gitHubInfomations = await Promise.all(
    listarUsuarios.map(async (username) => {
      const headers: Record<string, string> = {}

      if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
      }

      try {
        const response = await axios.get(
          `https://api.github.com/users/${username.github_username}`,
          { headers }
        )
        return {
          login: response.data.login,
          name: response.data.name,
          bio: response.data.bio,
          avatar: response.data.avatar_url,
          repos: response.data.public_repos,
          email: username.email as string,
          username: username.username as string,
          github_username: username.github_username as string,
          id: username.id as number
        }
      } catch (error) {
        console.error(`Erro ao buscar ${username.github_username}:`, error)
        return null
      }
    })
  )

  const validGithubInfo = gitHubInfomations.filter(info => info !== null)
  
  return {
   content: (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {listarUsuarios.map((username, idx) => {
            const github = validGithubInfo[idx]
            if (!github) return null

            return (
              <Card key={username.github_username} className="flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Image
                      className="rounded-full flex-shrink-0"
                      src={github.avatar}
                      alt={`Avatar de ${github.name}`}
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col min-w-0">
                      <CardTitle className="text-base sm:text-lg truncate">{github.username}</CardTitle>
                      <CardDescription className="truncate">@{github.login}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground flex-grow pt-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail size={15} color="#9810fa" className="shrink-0" />
                    <span className="truncate">{username.email}</span>
                  </div>
                  <div className="flex items-start gap-2 min-w-0">
                    <User size={15} color="#9810fa" className="shrink-0 mt-0.5" />
                    <span className="line-clamp-3">{github.bio}</span>
                  </div>
                  <ModalIformation username={github} />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    ),
    paginaAtual,
    nextPage,
    totalPaginas
  }
}