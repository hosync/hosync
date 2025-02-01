import { db } from '../../..'
import { handleErrorResponse } from '../../error'
import { createCRUDRoutes } from '../../routerGenerator'
import CRUD from './crud'

const CRUDHandler = new CRUD(db)

const customRoutes: Record<string, { method: string; handler: any }> = {
  '/link': {
    method: 'POST',
    handler: async (req: Request, res: Response) => {
      try {
        const response = await CRUDHandler.link({ user: req.body })

        if (response) {
          // @ts-ignore
          return res.json({ ok: true, ...response })
        }
      } catch (error) {
        // @ts-ignore
        return handleErrorResponse(error, res)
      }

      // @ts-ignore
      return res.json({ ok: false })
    }
  }
}

const router = createCRUDRoutes(CRUD, customRoutes)

export default router
