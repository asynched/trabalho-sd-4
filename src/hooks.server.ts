import type { User } from '@prisma/client'
import { redirect, type Handle } from '@sveltejs/kit'
import { db } from '@/services/prisma/client'

export const handle: Handle = async ({ event, resolve }) => {
  const isPrivate = event.url.pathname.includes('/app')

  let user: User | null = null
  const token = event.cookies.get('session')

  if (token) {
    const session = await db.session.findUnique({
      where: { sessionId: token },
      include: {
        user: true,
      },
    })

    user = session?.user || null
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
