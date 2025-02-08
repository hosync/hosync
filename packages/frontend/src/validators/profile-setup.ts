import {
  isEmpty,
  isValidEmail,
  isValidGoogleMapsUrl,
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
        errors['location.country'] = 'Country is required'
      }

      if (isEmpty(values.location.state)) {
        errors['location.state'] = 'State is required'
      }

      if (isEmpty(values.location.city)) {
        errors['location.city'] = 'City is required'
      }

      if (isEmpty(values.location.address1)) {
        errors['location.address1'] = 'Address is required'
      }

      if (isEmpty(values.location.zipCode)) {
        errors['location.zipCode'] = 'Zip code is required'
      }

      if (!isValidZipCode(values.location.zipCode)) {
        errors['location.zipCode'] = 'Please enter a valid Zip code'
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

  return {
    ...errors
  }
}
