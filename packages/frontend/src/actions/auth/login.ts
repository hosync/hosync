'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { LoginFormValues } from '@/providers/login'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { loginValidator } from '@/validators/login'

export const login = async (values: LoginFormValues) => {
  const validatedFields = loginValidator(values)

  if (!validatedFields.isSuccess) {
    return {
      ok: false,
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid credentials'
      }
    }
  }

  const { email, password } = validatedFields.safeValues

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })

    return {
      ok: true
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            ok: false,
            status: 400,
            error: {
              code: 'INVALID_CREDENTIALS',
              message: 'Invalid credentials'
            }
          }
        }

        default: {
          return {
            ok: false,
            status: 500,
            error: {
              code: 'UNKNOWN_ERROR',
              message: 'Something went wrong'
            }
          }
        }
      }
    }

    return {
      ok: false,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred'
      }
    }
  }
}
