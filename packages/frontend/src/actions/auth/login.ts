'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import validation, { LoginValues } from '@/validations'

export const login = async (values: LoginValues) => {
  const validatedFields = validation.login(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields'
    }
  }

  const { email, password } = validatedFields.safeValues

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            error: 'Invalid credentials'
          }
        }

        default: {
          return {
            error: 'Something went wrong'
          }
        }
      }
    }

    throw error
  }

  return {
    success: 'Logged in'
  }
}
