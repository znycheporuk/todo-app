import type { User } from '@prisma/client'
import type { Session } from '@remix-run/node'
import { db } from '~/db.server'
import { commitSession } from '~/session.server'

export const getCurrentUser = async (session: Session) => {
  const userId = session.get('userId')
  let user: Partial<User> | null
  if (!userId) {
    user = await db.user.create({data: {isAnonymous: true}})
    session.set('userId', user.id)
  } else {
    user = await db.user.findUnique({where: {id: userId}, select: {id: true, isAnonymous: true, username: true}})
    if (!user) throw new Error('User not found')
  }
  return {
    user,
    headers: userId ? undefined : {'Set-Cookie': await commitSession(session)}
  }
}

export const cx = (...args: any[]) => args.filter(item => !!item).join(' ');
