import { validate, verify } from '@/lib/utils/validation'

export type AlertValues = {
  error?: string
  success?: string
}

export type LoginValuesOrErrors = {
  responseError?: string
  email: string
  password: string
}

export type RegistrationValuesOrErrors = {
  responseError?: string
  fullName: string
  businessName: string
  businessEmail: string
  businessPhone: string
  businessWebsite: string
  country: string
}

const validation = {
  login: <T extends LoginValuesOrErrors>(values: T) => {
    const validations = {
      email: verify('email', values.email).isEmail('Invalid Email'),
      password: verify('password', values.password).minLength(
        1,
        'Password is required'
      )
    }

    return validate<T>(validations, values)
  },
  registration: <T extends RegistrationValuesOrErrors>(values: T) => {
    const validations = {
      fullName: verify('fullName', values.fullName).isValidFullName(
        'Invalid full name (e.g. John Smith)'
      ),
      businessName: verify('businessName', values.businessName).minLength(
        1,
        'Business name is required'
      ),
      businessEmail: verify('businessEmail', values.businessEmail).isEmail(
        'Invalid email (e.g. myemail@gmail.com)'
      ),
      businessPhone: verify('businessPhone', values.businessPhone).isPhone(
        'Invalid phone number (e.g. +1 234-5677-2233)'
      ),
      businessWebsite: verify('businessWebsite', values.businessWebsite).isUrl(
        'Invalid URL (e.g. http://example.com)'
      ),
      country: verify('country', values.country).minLength(
        1,
        'Country is required'
      )
    }

    return validate<T>(validations, values)
  }
}

export default validation
