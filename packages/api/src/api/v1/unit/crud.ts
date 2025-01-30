import { DB, Unit, unit } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Unit> {
  constructor(db: DB) {
    super(db, unit)
  }
}

export default CRUD
