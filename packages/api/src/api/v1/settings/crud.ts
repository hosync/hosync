import { DB, Setting, setting } from '../../..'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Setting> {
  constructor(db: DB) {
    super(db, setting)
  }
}

export default CRUD
