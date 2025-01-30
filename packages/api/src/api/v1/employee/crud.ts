import { DB, Employee, employee } from '../../../db'
import CRUDHandler from '../../CRUD'

class CRUD extends CRUDHandler<Employee> {
  constructor(db: DB) {
    super(db, employee)
  }
}

export default CRUD
