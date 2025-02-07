import { createFormProvider } from '../contexts/form'

export interface RegistrationFormValues {
  fullName: string
  businessName: string
  businessEmail: string
  businessPhone: string
  businessWebsite: string
  country: string
}

export const RegistrationFormProvider =
  createFormProvider<RegistrationFormValues>()
