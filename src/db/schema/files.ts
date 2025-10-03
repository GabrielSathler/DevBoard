import { integer, pgEnum, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const files = pgTable("files", {
    id: serial().primaryKey().notNull(),
    token: uuid().unique().notNull(),

    title: varchar({ length: 255 }).notNull(),
    extension: varchar({ length: 10 }).notNull(),
    size: integer().notNull(),
    mime_type: text().notNull(),

    bucket_ref: uuid().notNull(),

    created_at: timestamp({ withTimezone: true }).defaultNow().notNull()
})