import { DB, Room, room } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Room> {
  constructor(db: DB) {
    super(db, room)
  }
}

export default CRUD
