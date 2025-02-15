export interface AgentDTO {
  id: string
  businessId: string
  userId: string
  isCompany: boolean
  commissionType: string
  highestCommissionWithoutOffer: number
  highestCommissionWithOffer: number
  lowestCommissionWithoutOffer: number
  lowestCommissionWithOffer: number
  createdAt: string
  updatedAt: string
}
