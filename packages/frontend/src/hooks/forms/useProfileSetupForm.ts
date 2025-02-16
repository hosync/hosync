import type { ProfileSetupFormValues } from '@/providers/profile-setup'

import { useForm } from '../useForm'

export function useProfileSetupForm() {
  return useForm<ProfileSetupFormValues>()
}
