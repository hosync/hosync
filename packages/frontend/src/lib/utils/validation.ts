import {
  isValidDate,
  isValidEmail,
  isValidFullName,
  isValidGoogleMapsUrl,
  isValidPhone,
  isValidUrl,
  isValidZipCode
} from './validations'

type ValidationResult = string

type PasswordValidation = {
  min: (length: number) => PasswordValidation
  lowercase: () => PasswordValidation
  uppercase: () => PasswordValidation
  digit: () => PasswordValidation
  special: () => PasswordValidation
  getMessage: () => ValidationResult
}

type Validator = {
  isValidFullName: (message: string) => ValidationResult
  isEmail: (message: string) => ValidationResult
  isPhone: (message: string) => ValidationResult
  isZipCode: (message: string) => ValidationResult
  isUrl: (message: string) => ValidationResult
  isDate: (message: string) => ValidationResult
  isGoogleMapsUrl: (message: string) => ValidationResult
  isRequired: (message: string) => ValidationResult
  minLength: (length: number, message: string) => ValidationResult
  maxLength: (length: number, message: string) => ValidationResult
  required: (message: string) => ValidationResult
  password: (messages: Record<string, string>) => PasswordValidation
}

type ValidatedResult<T> = {
  success: boolean
  values: T
  safeValues: T
  error?: Record<string, ValidationResult>
}

function verify(key: string, value: any): Validator {
  return {
    isValidFullName(message: string): ValidationResult {
      const isValid = isValidFullName(value)
      return isValid ? '' : message
    },
    isEmail(message: string): ValidationResult {
      const isValid = isValidEmail(value)
      return isValid ? '' : message
    },
    isPhone(message: string): ValidationResult {
      const isValid = isValidPhone(value)
      return isValid ? '' : message
    },
    isZipCode(message: string): ValidationResult {
      const isValid = isValidZipCode(value)
      return isValid ? '' : message
    },
    isUrl(message: string): ValidationResult {
      const isValid = isValidUrl(value)
      return isValid ? '' : message
    },
    isDate(message: string): ValidationResult {
      const isValid = isValidDate(value)
      return isValid ? '' : message
    },
    isGoogleMapsUrl(message: string): ValidationResult {
      const isValid = isValidGoogleMapsUrl(value)
      return isValid ? '' : message
    },
    isRequired(message: string): ValidationResult {
      const isValid = value !== '' && value !== null && value !== undefined
      return isValid ? '' : message
    },
    minLength(length: number, message: string): ValidationResult {
      const isValid = value.length >= length
      return isValid ? '' : message
    },
    maxLength(length: number, message: string): ValidationResult {
      const isValid = value.length <= length
      return isValid ? '' : message
    },
    required(message: string): ValidationResult {
      const isValid = value !== '' && value !== null && value !== undefined
      return isValid ? '' : message
    },
    password(messages: Record<string, string>): PasswordValidation {
      let lastError: string = ''

      return {
        min(length: number): PasswordValidation {
          if (value.length < length) lastError = messages.min
          return this
        },
        lowercase(): PasswordValidation {
          if (!/[a-z]/.test(value)) lastError = messages.lowercase
          return this
        },
        uppercase(): PasswordValidation {
          if (!/[A-Z]/.test(value)) lastError = messages.uppercase
          return this
        },
        digit(): PasswordValidation {
          if (!/\d/.test(value)) lastError = messages.digit
          return this
        },
        special(): PasswordValidation {
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
            lastError = messages.special
          return this
        },
        getMessage(): ValidationResult {
          return lastError || ''
        }
      }
    }
  }
}

function sanitizeValues<T>(values: T): T {
  const sanitized: any = {}

  Object.entries(values as Record<string, any>).forEach(([key, value]) => {
    if (typeof value === 'string') {
      sanitized[key] = value.trim().replace(/(<([^>]+)>)/gi, '')
    } else {
      sanitized[key] = value
    }
  })

  return sanitized as T
}

/**
 * Validate a set of inputs against a set of validation rules
 * @param validations - A set of validation rules
 * @param inputs - A set of inputs to validate
 * @returns An object with the following properties:
 * - success: A boolean indicating if the validation was successful
 * - values: The original values passed to the function
 * - safeValues: The sanitized values
 * - error: An object containing the validation errors
 */
function validate<T>(
  validations: Record<string, ValidationResult>,
  inputs: T
): ValidatedResult<T> {
  let success = true
  const errors: Record<string, ValidationResult> = {}
  const values: T = { ...inputs }
  let safeValues: T = { ...inputs }

  Object.entries(validations).forEach(([key, result]) => {
    if (result) {
      success = false
      errors[key] = result
    }
  })

  safeValues = sanitizeValues(values)

  return success
    ? { success, values, safeValues }
    : { success, values, safeValues, error: errors }
}

export { validate, verify }
