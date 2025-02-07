import type { LoginFormValues } from '@/providers/login'

import { useForm } from '../useForm'

export function useLoginForm() {
  return useForm<LoginFormValues>()
}
