import { Cancellation, cancellation, DB } from '../../..'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Cancellation> {
  constructor(db: DB) {
    super(db, cancellation)
  }
}

export default CRUD
