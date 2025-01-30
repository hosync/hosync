import { DB, Property, property } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Property> {
  constructor(db: DB) {
    super(db, property)
  }
}

export default CRUD
