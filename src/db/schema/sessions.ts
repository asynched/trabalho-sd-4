import { sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { users } from './user'

export const sessions = sqliteTable('sessions', {
  sessionId: text('session_id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.userId),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
})
