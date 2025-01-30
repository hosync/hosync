import { DB, Tier, tier } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Tier> {
  constructor(db: DB) {
    super(db, tier)
  }
}

export default CRUD
