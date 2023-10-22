import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { getAccessToken } from '@/routes/services/github/auth'

export const load: PageServerLoad = async (event) => {
  const code = event.url.searchParams.get('code')

  if (!code) {
    throw redirect(301, '/')
  }

  const token = await getAccessToken(code)

  if (!token) {
    throw redirect(301, '/auth/fail')
  }

  event.cookies.set('access_token', token, {
    httpOnly: true,
    secure: true,
  })

  throw redirect(301, '/home')
}
