interface CustomValueObject {
  name: string
}

interface Amenity {
  ac?: boolean
  bedSheets?: boolean
  coffeeMachine?: boolean
  extraBed?: boolean
  garden?: boolean
  hotWater?: boolean
  glassesPlates?: boolean
  kitchen?: boolean
  oven?: boolean
  refrigerator?: boolean
  towels?: boolean
  tv?: boolean
}

interface Service {
  freeParking?: boolean
  laundry?: boolean
  pool?: boolean
  wifi?: boolean
}

interface Rule {
  smoking?: boolean
  petFriendly?: boolean
}

interface ASRType {
  asr: {
    amenity: CustomValueObject[]
    service: CustomValueObject[]
    rule: CustomValueObject[]
  }
}

export interface ASRDTO {
  id: string
  asr: ASRType
  createdAt: string
  updatedAt: string
  amenities: Amenity
  services: Service
  rules: Rule
}
