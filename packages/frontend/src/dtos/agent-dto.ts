export interface AgentDTO {
  businessId: string
  userId: string
  isCompany: boolean
  commissionType: string
  highestCommissionWithoutOffer: number
  highestCommissionWithOffer: number
  lowestCommissionWithoutOffer: number
  lowestCommissionWithOffer: number
}
