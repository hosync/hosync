export interface Guest {
  fullName: string
  email: string
  phone: string
  numberOfGuests: number
  specialRequests?: string
}

export interface Reservation {
  id: string
  cabinId: string
  startDate: string
  endDate: string
  guest: Guest
  totalPrice: number
  status: 'confirmed' | 'pending' | 'cancelled'
}

export interface Cabin {
  id: string
  name: string
  pricePerNight: number
}
