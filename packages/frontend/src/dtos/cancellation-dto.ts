export interface CancellationDTO {
  reservationId: string
  cancellationDate: string
  securityDepositReturned: number
  securityDepositHeld: number
  securityDepositFile: string
  reason: string
}
