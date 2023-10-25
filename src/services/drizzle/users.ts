import { eq } from 'drizzle-orm'
import { db } from '@/db/client'
import { users } from '@/db/schema/user'
import type { UserResponse } from '@/services/github/auth'
import { getAvatarFromInitials } from '@/services/dicebear/avatars'
import { Role, students, teachers } from '@/domain/auth'
import { sessions } from '@/db/schema/sessions'

export async function findOrCreateUser(data: UserResponse) {
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.username, data.login))

  if (userResult.length > 0) {
    return userResult[0]
  }

  const rows = await db
    .insert(users)
    .values({
      name: data.name,
      username: data.login,
      avatar: data.avatar_url
        ? data.avatar_url
        : getAvatarFromInitials(data.name),
      role: students.includes(data.login)
        ? Role.STUDENT
        : teachers.includes(data.login)
        ? Role.TEACHER
        : Role.GUEST,
      grade: 0,
    })
    .returning()

  const user = rows[0]

  return user
}

export async function getUserGrades() {
  const grades = await db
    .select({
      name: users.name,
      grade: users.grade,
      avatar: users.avatar,
      userId: users.userId,
    })
    .from(users)
    .where(eq(users.role, Role.STUDENT))

  return grades
}

export async function updateGrade(userId: string, grade: number) {
  await db
    .update(users)
    .set({
      grade,
    })
    .where(eq(users.userId, userId))
}

export async function getUserFromSession(sessionId: string) {
  const userResult = await db
    .select()
    .from(users)
    .innerJoin(sessions, eq(sessions.userId, users.userId))
    .where(eq(sessions.sessionId, sessionId))
    .limit(1)

  return userResult[0]?.users || null
}
