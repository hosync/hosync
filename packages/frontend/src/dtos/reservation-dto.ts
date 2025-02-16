export interface ReservationDTO {
  guestId: string
  assetId: string
  startDate: string
  endDate: string
  nights: number
  freeNights: number
  occupancy: number
  adults: number
  children: number
  infants: number
  pets: number
  extraOccupancy: number
  pendingAmount: number
  totalAmount: number
  paidAmount: number
  discount: number
  taxes: number
  cleaningFee: number
  serviceFee: number
  securityDeposit: number
  securityDepositFile: string
  needCrib: boolean
  isCancelled: boolean
  isOffer: boolean
  offerDetails: string
  notes: string
}
