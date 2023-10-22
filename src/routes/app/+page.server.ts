import { Role } from '@/domain/auth'
import type { Actions, PageServerLoad } from './$types'
import { db } from '@/services/prisma/client'
import type { User } from '@prisma/client'
import { fail, redirect } from '@sveltejs/kit'

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

  if (user.role === Role.STUDENT) {
    const grades = await db.user.findMany({
      where: {
        role: Role.STUDENT,
      },
      select: {
        name: true,
        grade: true,
        avatar: true,
        userId: true,
      },
    })

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

    await db.session.delete({
      where: {
        sessionId: event.cookies.get('session'),
      },
    })

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

    await db.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        grade: gradeNumber,
      },
    })

    return { success: true }
  },
}
