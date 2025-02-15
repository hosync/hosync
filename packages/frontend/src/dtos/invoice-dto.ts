export interface InvoiceDto {
  id: string
  businessId: string
  reservationId: string
  invoiceNumber: number
  invoiceDate: string
  dueDate: string
  totalAmount: number
  paidAmount: number
  discount: number
  status: string
  paymentMethod: string
  paymentDate: string
  nights: number
  nightPrice: number
  cleaningFee: number
  serviceFee: number
  tax: number
  currency: string
  checkIn: string
  checkOut: string
  createdAt: Date
  updatedAt: Date
}
