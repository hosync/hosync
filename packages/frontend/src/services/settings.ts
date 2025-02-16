import ServiceHandler from './Service'

class Service extends ServiceHandler {
  constructor() {
    super('settings')
  }
}

const settingService = new Service()

export default settingService
