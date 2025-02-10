import { createFormProvider } from '../contexts/form'

export interface ProfileSetupFormValues {
  propertyName: string
  email: string
  password: string
  googleMapsUrl: string
  location: {
    country: string
    state: string
    city: string
    address1: string
    address2?: string
    zipCode: string
  }
  propertyType: 'cabin' | 'hotel' | ''
  capacity: {
    guests: number
    bathrooms: number
    bedrooms: number
    beds: number
  }
  amenities: {
    ac: boolean
    bedSheets: boolean
    coffeeMachine: boolean
    extraBed: boolean
    freeParking: boolean
    garden: boolean
    glassesPlates: boolean
    hotWater: boolean
    kitchen: boolean
    laundry: boolean
    oven: boolean
    petFriendly: boolean
    pool: boolean
    refrigerator: boolean
    smoking: boolean
    towels: boolean
    tv: boolean
    wifi: boolean
  }
  pricing: {
    price: number
    currency: 'USD' | 'MXN'
    checkInHour: number
    checkInMinute: number
    checkInPeriod: 'AM' | 'PM'
    checkOutHour: number
    checkOutMinute: number
    checkOutPeriod: 'AM' | 'PM'
  }
  images: string[]
}

export const ProfileSetupFormProvider =
  createFormProvider<ProfileSetupFormValues>()
