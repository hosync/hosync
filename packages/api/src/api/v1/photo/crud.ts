import { DB, Photo, photo } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Photo> {
  constructor(db: DB) {
    super(db, photo)
  }
}

export default CRUD
