import { Request, Response } from 'express'

import { db } from '../../..'
import { handleErrorResponse } from '../../error'
import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './crud'

const CRUDHandler = new CRUD(db)

const customBusinessRoutes: Record<string, { method: string; handler: any }> = {
  '/user/:userId': {
    method: 'GET',
    handler: async (req: Request, res: Response) => {
      try {
        const response = await CRUDHandler.by({
          userId: (req as any).params.userId
        })

        if (response) {
          return res.json({ ok: true, ...response })
        }
      } catch (error) {
        return handleErrorResponse(error, res)
      }

      return res.json({ ok: false })
    }
  }
}

const router = createCRUDRoutes(CRUD, customBusinessRoutes)

export default router
