import { createFormProvider } from '@/contexts/form'

export interface LoginFormValues {
  email: string
  password: string
}

export const LoginFormProvider = createFormProvider<LoginFormValues>()
