import type { Actions, PageServerLoad } from './$types'

import { Role } from '@/domain/auth'
import { fail, redirect } from '@sveltejs/kit'
import { getUserGrades, updateGrade } from '@/services/drizzle/users'
import { deleteSession } from '@/services/drizzle/session'
import type { User } from '@/db/schema/user'
import { logger } from '@/services/logger/client'

type Data = {
  user: User
  studentGrades?: {
    name: string
    grade: number
    avatar: string
    userId: string
  }[]
}

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user!

  const data: Data = {
    user,
  }

  if (user.role === Role.TEACHER) {
    const grades = await getUserGrades()

    data.studentGrades = grades
  }

  return data
}

export const actions: Actions = {
  async signOut(event) {
    const user = event.locals.user

    if (!user) {
      return fail(400, {
        message: 'You must be logged in to access this page.',
      })
    }

    const session = event.cookies.get('session')

    if (!session) {
      return fail(400, {
        message: 'You must be logged in to access this page.',
      })
    }

    logger.info(`User '@${user.username}' signed out`)
    await deleteSession(session)

    throw redirect(301, '/')
  },
  async update(event) {
    const user = event.locals.user

    if (!user) {
      return fail(400, {
        message: 'You must be logged in to access this page.',
      })
    }

    if (user.role !== Role.STUDENT) {
      return fail(400, {
        message: 'You must be a student to access this page.',
      })
    }

    const grade = await event.request.formData().then((f) => f.get('grade'))

    if (!grade) {
      return fail(400, {
        message: 'You must provide a grade.',
      })
    }

    const gradeNumber = Number(grade)

    if (gradeNumber < 0 || gradeNumber > 4) {
      return fail(400, {
        message: 'The grade must be between 0 and 4.',
      })
    }

    logger.info(
      `User '@${user.username}' updated their grade to ${gradeNumber}`,
    )
    await updateGrade(user.userId, gradeNumber)

    return { success: true }
  },
}
