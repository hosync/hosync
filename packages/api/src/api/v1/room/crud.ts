import { DB, Room, room } from '../../..'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Room> {
  constructor(db: DB) {
    super(db, room)
  }
}

export default CRUD
