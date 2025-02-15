export interface BusinessDTO {
  id: string
  userId: string
  name: string
  slug: string
  email: string
  phone: string
  priceRange: string
  website: string
  facebook: string
  instagram: string
  logo: string
  rating: number
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  currency: string
  taxesPercentage: number
  minimumBooking: number
  zipCode: string
  googleMapsUrl: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export const getBusinessDTO = (data: any, businessId: string): BusinessDTO => {
  const currentDate = new Date().toJSON()
  return {
    id: businessId,
    userId: data.userId,
    name: data.propertyName,
    slug: '',
    email: data.email,
    phone: data.phone,
    priceRange: data.priceRange,
    website: data.website,
    facebook: data.facebook,
    instagram: data.instagram,
    logo: data.logo,
    rating: 0,
    addressLine1: data.location.address1,
    addressLine2: data.location.address2,
    city: data.location.city,
    state: data.location.state,
    country: data.location.country,
    currency: data.pricing.currency,
    taxesPercentage: 0,
    minimumBooking: 1,
    zipCode: data.location.zipCode,
    googleMapsUrl: data.googleMapsUrl,
    active: true,
    createdAt: '',
    updatedAt: currentDate
  }
}
