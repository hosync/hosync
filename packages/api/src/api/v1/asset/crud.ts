import { Asset, asset, DB } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Asset> {
  constructor(db: DB) {
    super(db, asset)
  }
}

export default CRUD
