import { sql, type InferSelectModel } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  userId: text('user_id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name', { length: 255 }).notNull(),
  username: text('username', { length: 32 }).notNull().unique(),
  avatar: text('avatar', { length: 255 }).notNull(),
  role: text('role', { enum: ['student', 'teacher', 'guest'] })
    .notNull()
    .default('guest'),
  grade: integer('grade').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
})

export type User = InferSelectModel<typeof users>
