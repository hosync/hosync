import { Agent, agent, DB } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Agent> {
  constructor(db: DB) {
    super(db, agent)
  }
}

export default CRUD
