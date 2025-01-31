import { RequestHandler } from 'express'

import { db } from '../../..'
import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './crud'

const customCRUD = new CRUD(db)

const customRoutes: Record<
  string,
  { method: string; handler: RequestHandler }
> = {
  '/guest/:id': {
    method: 'GET',
    handler: async (req, res) => {
      try {
        const { id } = req.params
        const response = await customCRUD.getByGuestId(id)
        res.json({ ok: true, data: response })
      } catch (error) {
        res.status(500).json({ ok: false, error: error })
      }
    }
  }
}

const router = createCRUDRoutes(CRUD, customRoutes)

export default router
