import { DB, Property, property } from '../../..'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Property> {
  constructor(db: DB) {
    super(db, property)
  }
}

export default CRUD
