import { Commission, commission, DB } from '../../..'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Commission> {
  constructor(db: DB) {
    super(db, commission)
  }
}

export default CRUD
