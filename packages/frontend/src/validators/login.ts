import {
  isEmpty,
  isValidEmail,
  sanitizeValues,
  ValidatorResult
} from '@/lib/utils/validations'
import { LoginFormValues } from '@/providers/login'

// type PasswordValidation = {
//   min: (length: number) => PasswordValidation
//   lowercase: () => PasswordValidation
//   uppercase: () => PasswordValidation
//   digit: () => PasswordValidation
//   special: () => PasswordValidation
//   getMessage: () => string
// }

// function password(
//   value: string,
//   messages: Record<string, string>
// ): PasswordValidation {
//   let lastError: string = ''

//   return {
//     min(length: number): PasswordValidation {
//       if (value.length < length) lastError = messages.min
//       return this
//     },
//     lowercase(): PasswordValidation {
//       if (!/[a-z]/.test(value)) lastError = messages.lowercase
//       return this
//     },
//     uppercase(): PasswordValidation {
//       if (!/[A-Z]/.test(value)) lastError = messages.uppercase
//       return this
//     },
//     digit(): PasswordValidation {
//       if (!/\d/.test(value)) lastError = messages.digit
//       return this
//     },
//     special(): PasswordValidation {
//       if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) lastError = messages.special
//       return this
//     },
//     getMessage(): string {
//       return lastError || ''
//     }
//   }
// }

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
    errors,
    safeValues: sanitizeValues(values)
  }
}
