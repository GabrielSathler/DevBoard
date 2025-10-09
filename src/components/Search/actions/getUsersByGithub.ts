"use server"

import { db } from "@/db/client"
import { usuarios } from "@/db/schema/schema"
import { ilike } from "drizzle-orm"

export async function getUsersByGithub(search: string) {
  if (!search || search.length < 3) return []

  const result = await db
    .select()
    .from(usuarios)
    .where(ilike(usuarios.github_username, `%${search}%`))

  return result
}
