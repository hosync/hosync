export interface CommissionDTO {
  id: string
  agentId: string
  reservationId: string
  commission: number
  isOffer: boolean
  isPaid: boolean
  paymentMethod: string
  reservationCost: number
  month: string
  year: string
  createdAt: string
  updatedAt: string
}
