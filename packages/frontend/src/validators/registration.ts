import {
  isEmpty,
  isValidEmail,
  isValidFullName,
  isValidPhone,
  sanitizeValues,
  ValidatorResult
} from '@/lib/utils/validations'
import { RegistrationFormValues } from '@/providers/registration'

export const registrationValidator = (
  values: RegistrationFormValues
): ValidatorResult => {
  const errors: Record<string, string> = {}

  if (!isValidEmail(values.businessEmail)) {
    errors.businessEmail = 'Please enter a valid email address'
  }

  if (!isValidFullName(values.fullName)) {
    errors.fullName = 'Please enter a valid full name'
  }

  if (!isValidPhone(values.businessPhone)) {
    errors.businessPhone = 'Please enter a valid phone number'
  }

  if (isEmpty(values.businessEmail)) {
    errors.businessEmail = 'Email is required'
  }

  if (isEmpty(values.fullName)) {
    errors.fullName = 'Full name is required'
  }

  if (isEmpty(values.businessName)) {
    errors.businessName = 'Business name is required'
  }

  if (isEmpty(values.businessPhone)) {
    errors.businessPhone = 'Phone number is required'
  }

  if (isEmpty(values.businessWebsite)) {
    errors.businessWebsite = 'Website is required'
  }

  if (isEmpty(values.country)) {
    errors.country = 'Country is required'
  }

  return {
    isSuccess: Object.keys(errors).length === 0,
    error: errors,
    safeValues: sanitizeValues(values)
  }
}
