import { eq } from 'drizzle-orm'

import { api, security } from '@hosync/utils'

import { business as businessTable, db, user as userTable } from '../../..'
import { UsersFields, usersFields } from './props'

export type Login = {
  email: string
  password: string
}

export const getUserData = async (accessToken: any): Promise<any> => {
  const response = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, accessToken.userId))

  return response
}

export const getUserBy = async (
  where: any,
  roles: string[],
  fields: string
): Promise<any> => {
  const selectedFields: Partial<UsersFields> = api.fields(fields, usersFields)

  if (fields.includes('password')) {
    selectedFields.password = 'password'
  }

  const response = await db
    .select()
    .from(userTable)
    .where(
      eq(
        where.code ? userTable.code : userTable.email,
        where.code || where.email
      )
    )

  if (response[0] && roles.includes(response[0].role || '')) {
    const businessResponse = await db
      .select()
      .from(businessTable)
      .where(eq(businessTable.userId, response[0].id))

    const user = {
      ...response[0],
      businessId: businessResponse[0].id,
      businessLogo: businessResponse[0].logo || '',
      businessName: businessResponse[0].name || '',
      businessSlug: businessResponse[0].slug || '',
      country: businessResponse[0].country || ''
    }

    return user
  } else {
    throw {
      type: 'FORBIDDEN_ERROR',
      code: 'INVALID_LOGIN',
      message: 'invalidLogin'
    }
  }
}

export const authenticate = async (
  email: string,
  password: string
): Promise<any> => {
  const where = { email }

  const user = await getUserBy(
    where,
    [
      'global.god',
      'global.admin',
      'business.admin',
      'business.editor',
      'business.agent',
      'visitor'
    ],
    'id,tier,username,password,email,role,fullName,birthday,avatar,website,phone,active'
  )

  if (!user) {
    throw {
      type: 'FORBIDDEN_ERROR',
      code: 'INVALID_LOGIN',
      message: 'invalidLogin'
    }
  }

  const passwordMatch = security.password.match(password, user.password, true)

  const isActive = user.active

  if (!passwordMatch.isValid) {
    throw {
      type: 'FORBIDDEN_ERROR',
      code: 'INVALID_LOGIN',
      message: 'invalidLogin'
    }
  }

  if (!isActive) {
    throw {
      type: 'FORBIDDEN_ERROR',
      code: 'ACCOUNT_NOT_ACTIVATED',
      message: 'accountNotActivated'
    }
  }

  return user
}
