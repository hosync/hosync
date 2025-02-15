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
