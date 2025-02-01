import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'

const corsOptions = {
  origin: '*',
  credentials: true
}

// Express application
const app: Application = express()
const port = 4000

const loadAPIRoutes = async () => {
  const routesPath = join(__dirname, 'v1')

  try {
    const items = await readdir(routesPath)

    for (const item of items) {
      const itemPath = join(routesPath, item)
      const itemStat = await stat(itemPath)

      if (itemStat.isDirectory()) {
        // Only process directories
        const indexPath = join(itemPath, 'index.ts') // Look for index.ts

        try {
          const routeModule = await import(indexPath) // Dynamically import index.ts

          if (routeModule.default) {
            app.use(`/api/v1/${item}`, routeModule.default)
            console.log(`Registered route: /api/v1/${item}`)
          }
        } catch (error) {
          console.warn(`No index.ts found for: ${item}, skipping...`, error)
        }
      }
    }
  } catch (error) {
    console.error('Error loading routes:', error)
  }
}

const start = async () => {
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.use(bodyParser.json())

  // Dynamically load API routes
  await loadAPIRoutes()

  app.get('/api', (req: Request, res: Response) => {
    res.send('Hello, world!')
  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

start()
