import { DB, Fee, fee } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Fee> {
  constructor(db: DB) {
    super(db, fee)
  }
}

export default CRUD
