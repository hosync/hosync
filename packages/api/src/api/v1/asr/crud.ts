import { ASR, asrTbl, DB } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<ASR> {
  constructor(db: DB) {
    super(db, asrTbl)
  }
}

export default CRUD
