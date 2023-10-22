import { redirect, type Handle } from '@sveltejs/kit'
import { getUserFromSession } from './services/drizzle/users'
import type { User } from '@/db/schema/user'

export const handle: Handle = async ({ event, resolve }) => {
  const isPrivate = event.url.pathname.includes('/app')

  let user: User | null = null
  const token = event.cookies.get('session')

  if (token) {
    user = await getUserFromSession(token)
  }

  event.locals.user = user

  if (isPrivate && !user) {
    throw redirect(301, '/')
  }

  if (!isPrivate && user) {
    throw redirect(301, '/app')
  }

  return resolve(event)
}
