import {
  isEmpty,
  isValidEmail,
  isValidGoogleMapsUrl,
  isValidPassword,
  isValidUrl,
  isValidZipCode
} from '@/lib/utils/validations'
import { ProfileSetupFormValues } from '@/providers/profile-setup'

export const profileSetupValidator = (
  values: ProfileSetupFormValues,
  step: number = 0
): any => {
  const errors: Record<string, string> = {}
  const newStep = step + 1

  switch (newStep) {
    case 1: {
      const passwordError = isValidPassword(values.password, {
        min: 'Password must be at least 8 characters long',
        lowercase: 'Password must contain at least one lowercase letter',
        uppercase: 'Password must contain at least one uppercase letter',
        digit: 'Password must contain at least one digit',
        special: 'Password must contain at least one special character'
      })
        .min(8)
        .lowercase()
        .uppercase()
        .digit()
        .special()
        .getMessage()

      if (passwordError) {
        errors.password = passwordError
      }

      if (isEmpty(values.password)) {
        errors.password = 'Password is required'
      }

      if (isEmpty(values.propertyName)) {
        errors.propertyName = 'Property name is required'
      }

      if (isEmpty(values.email)) {
        errors.email = 'Email is required'
      }

      if (!isValidEmail(values.email)) {
        errors.email = 'Please enter a valid email address'
      }

      if (
        !isValidGoogleMapsUrl(values.googleMapsUrl) ||
        !isValidUrl(values.googleMapsUrl)
      ) {
        errors.googleMapsUrl = 'Please enter a valid Google Maps URL'
      }

      if (isEmpty(values.location.country)) {
        errors.country = 'Country is required'
      }

      if (isEmpty(values.location.state)) {
        errors.state = 'State is required'
      }

      if (isEmpty(values.location.city)) {
        errors.city = 'City is required'
      }

      if (isEmpty(values.location.address1)) {
        errors.address1 = 'Address is required'
      }

      if (isEmpty(values.location.zipCode)) {
        errors.zipCode = 'Zip code is required'
      }

      if (!isValidZipCode(values.location.zipCode)) {
        errors.zipCode = 'Please enter a valid Zip code'
      }

      break
    }
    case 6: {
      if (values.images.length === 0) {
        errors.images = 'At least one image is required'
      }
      break
    }
  }

  console.log('ERRORS====>', errors)

  return {
    ...errors
  }
}
