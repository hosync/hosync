import { Business, business, DB } from '../../..'
import CRUDHandler from '../../CRUD'
import { getBusinessBy } from './actions'

class CRUD extends CRUDHandler<Business> {
  constructor(db: DB) {
    super(db, business)
  }

  async by(by: any): Promise<any> {
    try {
      const business = await getBusinessBy(by)

      if (business) {
        return {
          items: business
        }
      }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, data: any): Promise<any> {
    data.updatedAt = new Date()
    if (data.createdAt === '') delete data.createdAt
    return super.update(id, data)
  }
}

export default CRUD
