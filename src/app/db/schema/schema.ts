// Drizzle
import { sql } from "drizzle-orm"
import { pgTable, varchar, timestamp, serial, pgEnum } from "drizzle-orm/pg-core"


export const usuarios = pgTable("usuarios", {
    id: serial().primaryKey().notNull(),

    created_at : timestamp({ withTimezone: true }).defaultNow().notNull(),
    github_username: varchar({ length: 255 }),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }),
    curriculun: varchar({ length: 255 }).notNull(),
})