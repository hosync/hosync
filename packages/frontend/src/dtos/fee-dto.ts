export interface FeeDTO {
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
}

export const getFeeDTO = (feeData: any): FeeDTO => {
  return {
    cleaningFee: feeData.cleaningFee ? feeData.cleaningFee : 0,
    emergencyOfferFee: feeData.emergencyOfferFee
      ? feeData.emergencyOfferFee
      : 0,
    extraBedFee: feeData.extraBedFee ? feeData.extraBedFee : 0,
    extraGuestFee: feeData.extraGuestFee ? feeData.extraGuestFee : 0,
    highestFee: feeData.highestFee ? feeData.highestFee : 0,
    initialOfferFee: feeData.initialOfferFee ? feeData.initialOfferFee : 0,
    lowestFee: feeData.lowestFee ? feeData.lowestFee : 0,
    secondOfferFee: feeData.secondOfferFee ? feeData.secondOfferFee : 0,
    securityDepositFee: feeData.securityDepositFee
      ? feeData.securityDepositFee
      : 0,
    weekdayFee: feeData.weekdayFee ? feeData.weekdayFee : 0,
    weekendFee: feeData.weekendFee ? feeData.weekendFee : 0
  }
}
