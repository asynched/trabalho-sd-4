import type { PageServerLoad } from './$types'

export const load: PageServerLoad = (event) => {
  console.log(event.cookies.get('session'))

  return {}
}
