import { security } from '@hosync/utils'

import { DB, User, UserFields, user as userTable } from '../../..'
import CRUDHandler from '../../CRUD'
import { DataResponse, ItemData } from '../../types'
import { authenticate, getUserBy, Login } from './actions'

const roles = [
  'global.god',
  'global.admin',
  'global.editor',
  'global.agent',
  'business.admin',
  'business.editor'
]

const stringFields =
  'id,tier,email,role,fullName,phone,avatar,birthday,website,active'

class CRUD extends CRUDHandler<User> {
  constructor(db: DB) {
    super(db, userTable)
  }

  async create({
    user
  }: {
    user: UserFields
  }): Promise<DataResponse<ItemData>> {
    const encryptedPassword =
      user.password?.length === 40 && /^[a-f0-9]{40}$/i.test(user.password)
        ? user.password
        : security.password.encrypt(user.password || '')

    // Check if required fields are filled out
    if (!user.email || !user.password) {
      throw {
        code: 'MISSING_REQUIRED_FIELDS',
        message: 'missingRequiredFields'
      }
    }

    // Set default values
    const code = security.password
      .encrypt(`${user.email}${new Date().toISOString()}`)
      .substring(0, 10)

    user.tier = user.tier || 'free'
    user.role = user.role || 'business.admin'
    user.fullName = user.fullName || ''
    user.phone = user.phone || ''
    user.avatar = user.avatar || ''
    user.birthday = user.birthday || ''
    user.website = user.website || ''
    user.active = user.active || false
    user.code = code

    const data = await this.db
      .select(this.selectedFields)
      .from(this.table)
      .where(this.sql`email = ${user.email}`)

    if (data.length > 0) {
      throw {
        type: 'CONFLICT_ERROR',
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'emailAlreadyExists'
      }
    }

    // Create new record
    const toInsert = {
      ...user,
      password: encryptedPassword
    }

    const newUser = await super.create(toInsert)

    return newUser
  }

  async by(by: any): Promise<any> {
    try {
      const user = await getUserBy(by, roles, stringFields)

      if (user) {
        return {
          items: [user]
        }
      }
    } catch (error) {
      throw error
    }
  }

  async login({
    email = '',
    password = ''
  }: Login): Promise<DataResponse<ItemData>> {
    try {
      const user = await authenticate(email, password)

      return {
        items: [
          {
            user
          }
        ]
      }
    } catch (error) {
      throw error
    }
  }
}

export default CRUD
