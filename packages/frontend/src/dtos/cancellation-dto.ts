export interface CancellationDTO {
  id: string
  reservationId: string
  cancellationDate: string
  securityDepositReturned: number
  securityDepositHeld: number
  securityDepositFile: string
  reason: string
  createdAt: string
  updatedAt: string
}
