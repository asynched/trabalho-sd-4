import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import {
  getUserProfileFromCode,
  type UserResponse,
} from '@/services/github/auth'
import { db } from '@/services/prisma/client'
import { getAvatarFromInitials } from '@/services/dicebear/avatars'
import { students, teachers } from '@/domain/auth'

export const load: PageServerLoad = async (event) => {
  const code = event.url.searchParams.get('code')

  if (!code) {
    throw redirect(301, '/')
  }

  const profile = await getUserProfileFromCode(code)

  if (!profile) {
    throw redirect(301, '/auth/fail')
  }

  const user = await findOrCreateUser(profile)

  const session = await db.session.create({
    data: {
      userId: user.userId,
    },
  })

  event.cookies.set('session', session.sessionId, {
    httpOnly: true,
    path: '/',
  })

  return {}
}

function findOrCreateUser(user: UserResponse) {
  return db.user.upsert({
    where: { username: user.login },
    create: {
      avatar: user.avatar_url || getAvatarFromInitials(user.name),
      name: user.name,
      username: user.login,
      githubApiProfileUrl: user.url,
      githubProfileUrl: user.html_url,
      role: students.includes(user.login)
        ? 'student'
        : teachers.includes(user.login)
        ? 'teacher'
        : 'guest',
    },
    update: {},
  })
}
