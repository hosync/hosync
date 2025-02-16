export interface FeeDTO {
  id: string
  cleaningFee: number
  emergencyOfferFee: number
  extraBedFee: number
  extraGuestFee: number
  highestFee: number
  initialOfferFee: number
  lowestFee: number
  secondOfferFee: number
  securityDepositFee: number
  weekdayFee: number
  weekendFee: number
  createdAt: Date
  updatedAt: Date
}

export const getFeeDTO = (feeData: any): FeeDTO => {
  return {
    id: '',
    cleaningFee: feeData.cleaningFee,
    emergencyOfferFee: feeData.emergencyOfferFee,
    extraBedFee: feeData.extraBedFee,
    extraGuestFee: feeData.extraGuestFee,
    highestFee: feeData.highestFee,
    initialOfferFee: feeData.initialOfferFee,
    lowestFee: feeData.lowestFee,
    secondOfferFee: feeData.secondOfferFee,
    securityDepositFee: feeData.securityDepositFee,
    weekdayFee: feeData.weekdayFee,
    weekendFee: feeData.weekendFee,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
