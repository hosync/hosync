import { Account, account, DB } from '../../..'
import CRUDHandler from '../../CRUD'
import { linkAccount } from './actions'

class CRUD extends CRUDHandler<Account> {
  constructor(db: DB) {
    super(db, account)
  }

  async link({ user }: { user: any }): Promise<any> {
    try {
      const response = await linkAccount(user)

      if (response) {
        return {
          ok: true,
          items: response
        }
      }
    } catch (error) {
      return {
        ok: false,
        error
      }
    }

    return {
      ok: false
    }
  }
}

export default CRUD
