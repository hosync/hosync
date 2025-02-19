import { response } from 'express'

import { Account, account, DB } from '../../..'
import CRUDHandler from '../../CRUD'
import { linkAccount } from './actions'

class CRUD extends CRUDHandler<Account> {
  constructor(db: DB) {
    super(db, account)
  }

  async link({ user }: { user: any }): Promise<any> {
    const response: any = await linkAccount(user)
    console.log('RESPONSE EN LINK ===>', response)
    if (response.status !== 404) {
      return {
        ok: true,
        items: response
      }
    }

    return {
      ok: false,
      error: {
        message: response.message
      }
    }
  }
}

export default CRUD
