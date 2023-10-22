import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { getUserProfileFromCode } from '@/services/github/auth'
import { findOrCreateUser } from '@/services/drizzle/users'
import { createSession } from '@/services/drizzle/session'

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
  const session = await createSession(user.userId)

  event.cookies.set('session', session.sessionId, {
    httpOnly: true,
    path: '/',
  })

  return {}
}
