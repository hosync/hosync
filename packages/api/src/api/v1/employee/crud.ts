import { DB, Employee, employee } from '../../..'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Employee> {
  constructor(db: DB) {
    super(db, employee)
  }
}

export default CRUD
