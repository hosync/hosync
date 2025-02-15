export interface EmployeeDTO {
  id: string
  businessId: string
  designation?: string
  fullName?: string
  email?: string
  phone?: string
  salary?: number
  jobTitle?: string
  photo?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  createdAt: Date
  updatedAt: Date
}
