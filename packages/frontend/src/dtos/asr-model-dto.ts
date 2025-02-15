export type AmenityDTO = {
  ac: boolean
  bedSheets: boolean
  coffeeMachine: boolean
  extraBed: boolean
  garden: boolean
  hotWater: boolean
  kitchen: boolean
  oven: boolean
  refrigerator: boolean
  towels: boolean
  tv: boolean
}

export type ServiceDTO = {
  freeParking: boolean
  laundry: boolean
  pool: boolean
  wifi: boolean
}

export type RuleDTO = {
  smoking: boolean
  petFriendly: boolean
}

export type ASRTypeDTO = {
  amenity: AmenityDTO
  service: ServiceDTO
  rule: RuleDTO
}

export class ASRModelDTO {
  asr: ASRTypeDTO | any = {}

  constructor(data: Partial<ASRTypeDTO>) {
    Object.assign(this.asr, { ...data })
  }

  toJSON() {
    const amenities = Object.entries(this.asr.amenity)
    const services = Object.entries(this.asr.service)
    const rules = Object.entries(this.asr.rule)

    let amenitiesFalse = {}
    let servicesFalse = {}
    let rulesFalse = {}

    const amenityKeys = Object.keys(amenities)
    const servicesKeys = Object.keys(services)
    const rulesKeys = Object.keys(rules)

    amenityKeys.forEach((element: any) => {
      if (!amenities[element][1]) {
        amenitiesFalse = { [`${amenities[element][0]}`]: false, ...amenitiesFalse }
      }
    })

    servicesKeys.forEach((element: any) => {
      if (!services[element][1]) {
        servicesFalse = { [`${services[element][0]}`]: false, ...servicesFalse }
      }
    })

    rulesKeys.forEach((element: any) => {
      if (!rules[element][1]) {
        rulesFalse = { [`${rules[element][0]}`]: false, ...rulesFalse }
      }
    })

    return {
      asr: {
        amenity: amenitiesFalse,
        service: servicesFalse,
        rule: rulesFalse
      }
    }
  }
}

export class DoupleRoomDTO extends ASRModelDTO {
  constructor(data: Partial<ASRTypeDTO>) {
    super(data)
  }
}

export class PenhouseRoomDTO extends ASRModelDTO {
  constructor(data: Partial<ASRTypeDTO>) {
    super(data)
  }
}

export class SingleRoomDTO extends ASRModelDTO {
  constructor(data: Partial<ASRTypeDTO>) {
    super(data)
  }
}

export class StudioRoomDTO extends ASRModelDTO {
  constructor(data: Partial<ASRTypeDTO>) {
    super(data)
  }
}
