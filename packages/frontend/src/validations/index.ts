import { validate, verify } from '@/lib/utils/validation'

type AlertValues = {
  error?: string
  success?: string
}

type LoginValues = {
  email: string
  password: string
}

const validation = {
  login: <T extends LoginValues>(values: T) => {
    const validations = {
      email: verify('email', values.email).isEmail('Email is required'),
      password: verify('password', values.password).minLength(
        1,
        'Password is required'
      )
    }

    return validate<T>(validations, values)
  }
}

export type { AlertValues, LoginValues }
export default validation
