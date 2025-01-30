import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'

// APIs
import agentApiV1 from './v1/agent'
import asrApiV1 from './v1/asr'
import assetApiV1 from './v1/asset'
import businessApiV1 from './v1/business'
import cancellationApiV1 from './v1/cancellation'
import commissionApiV1 from './v1/commission'
import employeeApiV1 from './v1/employee'
import feeApiV1 from './v1/fee'
import guestApiV1 from './v1/guest'
import photoApiV1 from './v1/photo'
import propertyApiV1 from './v1/property'
import reservationApiV1 from './v1/reservation'
import roomApiV1 from './v1/room'
import settingsApiV1 from './v1/settings'
import tierApiV1 from './v1/tier'
import unitApiV1 from './v1/unit'
import uploaderApiV1 from './v1/uploader'
import userApiV1 from './v1/user'

const corsOptions = {
  origin: '*',
  credentials: true
}

// Express application
const app: Application = express()
const port = 4000

const start = () => {
  app.use(cors(corsOptions))

  // Cookies
  app.use(cookieParser())

  app.use(bodyParser.json())

  // API
  app.use('/api/v1/agent', agentApiV1)
  app.use('/api/v1/asr', asrApiV1)
  app.use('/api/v1/asset', assetApiV1)
  app.use('/api/v1/business', businessApiV1)
  app.use('/api/v1/cancellation', cancellationApiV1)
  app.use('/api/v1/commission', commissionApiV1)
  app.use('/api/v1/employee', employeeApiV1)
  app.use('/api/v1/fee', feeApiV1)
  app.use('/api/v1/guest', guestApiV1)
  app.use('/api/v1/photo', photoApiV1)
  app.use('/api/v1/property', propertyApiV1)
  app.use('/api/v1/reservation', reservationApiV1)
  app.use('/api/v1/room', roomApiV1)
  app.use('/api/v1/setting', settingsApiV1)
  app.use('/api/v1/tier', tierApiV1)
  app.use('/api/v1/unit', unitApiV1)
  app.use('/api/v1/uploader', uploaderApiV1)
  app.use('/api/v1/user', userApiV1)

  app.get('/api', (req: Request, res: Response) => {
    res.send('Hello, world!')
  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

start()
