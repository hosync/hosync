export interface PropertyDTO {
  id: string
  businessId: string
  asrId: string
  typeOfBuilding?: string // cabin, house, apartment, hotel, etc
  name?: string
  slug?: string
  description?: string
  floors?: number
  rooms?: number
  generalRules?: string
  safetyRules?: string
  cancellationPolicy?: string
  checkIn?: string
  checkOut?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export const getPropertyDTO = (
  businessId: string,
  amenityId: string,
  typeOfBuilding: string,
  propertyName: string,
  capacity: any,
  pricing: any
): PropertyDTO => {
  return {
    id: '',
    businessId: businessId,
    asrId: amenityId,
    typeOfBuilding: typeOfBuilding,
    name: propertyName,
    slug: '',
    description: '',
    floors: 1,
    rooms: capacity.bedrooms,
    generalRules: '',
    safetyRules: '',
    cancellationPolicy: '',
    checkIn: `${pricing.checkInHour} : ${pricing.checkInMinute} ${pricing.checkInPeriod}`,
    checkOut: `${pricing.checkOutHour} : ${pricing.checkOutMinute} ${pricing.checkOutPeriod}`,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
