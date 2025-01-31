import { DB, Photo, photo } from '../../..'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Photo> {
  constructor(db: DB) {
    super(db, photo)
  }
}

export default CRUD
