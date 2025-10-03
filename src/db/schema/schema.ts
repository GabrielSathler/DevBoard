// Drizzle
import { pgTable, varchar, timestamp, serial, uuid} from "drizzle-orm/pg-core"
import { files } from "./files"
 
 
export const usuarios = pgTable("usuarios", {
    id: serial().primaryKey().notNull(),

    created_at : timestamp({ withTimezone: true }).defaultNow().notNull(),
    github_username: varchar({ length: 255 }).unique(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }),
    curriculun: uuid().notNull().references(()=>files.token).unique(),
})