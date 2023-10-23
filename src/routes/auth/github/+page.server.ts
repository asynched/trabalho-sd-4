import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { getUserProfileFromCode } from '@/services/github/auth'
import { findOrCreateUser } from '@/services/drizzle/users'
import { createSession } from '@/services/drizzle/session'
import { logger } from '@/services/logger/client'

export const load: PageServerLoad = async (event) => {
  logger.info('New attempt to login with GitHub')

  const code = event.url.searchParams.get('code')

  if (!code) {
    logger.error('Missing code parameter in GitHub callback')
    throw redirect(301, '/')
  }

  logger.info('Attempting to retrieve profile from GitHub')
  const profile = await getUserProfileFromCode(code)

  if (!profile) {
    logger.error('Failed to retrieve profile from GitHub')
    throw redirect(301, '/auth/fail')
  }

  logger.info('Successfully retrieved profile from GitHub')
  const user = await findOrCreateUser(profile)
  const session = await createSession(user.userId)

  logger.info(`User '@${user.username}' signed in`)
  logger.info(`User role: ${user.role}`)

  event.cookies.set('session', session.sessionId, {
    httpOnly: true,
    path: '/',
  })

  return {}
}
