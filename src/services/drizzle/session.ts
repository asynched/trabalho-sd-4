import { eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { sessions } from '@/db/schema/sessions'

export async function deleteSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.sessionId, sessionId))
}

export async function createSession(userId: string) {
  const session = await db
    .insert(sessions)
    .values({
      userId,
    })
    .returning()

  return session[0]
}
