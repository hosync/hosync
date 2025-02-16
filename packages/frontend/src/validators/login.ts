import {
  isEmpty,
  isValidEmail,
  sanitizeValues,
  ValidatorResult
} from '@/lib/utils/validations'
import { LoginFormValues } from '@/providers/login'

export const loginValidator = (values: LoginFormValues): ValidatorResult => {
  const errors: Record<string, string> = {}

  if (isEmpty(values.email)) {
    errors.email = 'Email is required'
  }

  if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (isEmpty(values.password)) {
    errors.password = 'Password is required'
  }

  return {
    isSuccess: Object.keys(errors).length === 0,
    error: errors,
    safeValues: sanitizeValues(values)
  }
}
