export interface TierDTO {
  id: string
  tier: string
  description: string
  agents: number
  guests: number
  invoices: number
  users: number
  createdAt: Date
  updatedAt: Date
}
