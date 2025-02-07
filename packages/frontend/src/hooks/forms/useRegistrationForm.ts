import type { RegistrationFormValues } from '@/providers/registration'

import { useForm } from '../useForm'

export function useRegistrationForm() {
  return useForm<RegistrationFormValues>()
}
