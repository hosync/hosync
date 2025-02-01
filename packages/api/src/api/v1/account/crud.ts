import { Account, account, DB } from '../../..'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Account> {
  constructor(db: DB) {
    super(db, account)
  }
}

export default CRUD
