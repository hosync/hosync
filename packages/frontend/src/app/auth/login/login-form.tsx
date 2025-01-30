'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { security } from '@hosync/utils'

import * as UserActions from '@/actions/auth/user'
import { SVG } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Errors = {
  invalidLogin?: string
}

const LoginForm: React.FC = () => {
  const query = useSearchParams()
  const redirectTo = query.get('redirectTo') || '/'

  const [errors, setErrors] = useState<Errors>({ invalidLogin: '' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.classList.add('bg-login')

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    formData.delete('email')
    formData.delete('password')

    formData.append(
      security.base64.encode('email', true),
      security.base64.encode(email, true)
    )

    formData.append(
      security.base64.encode('password', true),
      security.base64.encode(security.password.encrypt(password), true)
    )

    if (!email || !password) {
      return setErrors({ invalidLogin: 'Invalid login' })
    }

    const response = await UserActions.login(formData)

    if (response?.ok) {
      window.location.href = redirectTo
    } else {
      setErrors({
        invalidLogin: 'Invalid login'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center min-h-screen">
        <div
          id="form-container"
          className="bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-md w-[450px]"
        >
          <div className="flex justify-center mb-4">
            <img
              src="/images/isotype.svg"
              alt="Logo"
              className="w-16 h-16"
              data-testid="isotype"
            />
          </div>

          <h2 className="text-2xl font-medium text-center mb-4 text-gray-800 dark:text-white toggle-text-dark-mode">
            Login to your account
          </h2>

          <p className="text-red-500 mb-4 text-xs text-center">
            {errors.invalidLogin}
          </p>

          <div className="relative mb-4">
            <div className="relative">
              <Input
                name="email"
                leftIcon={<SVG.Email />}
                label="Email"
                type="email"
                placeholder="Please enter your email"
                id="email"
                required
              />
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <Input
                name="password"
                leftIcon={<SVG.Lock />}
                label="Password"
                type="password"
                placeholder="Please enter your password"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mb-4 mt-4 m-auto">
            <a
              href="#"
              className="text-sm text-green-500 dark:text-green-500 hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          <div className="m-auto">
            <Button color="primary" fullWidth type="submit">
              Login
            </Button>
          </div>

          <div className="text-gray-500 dark:text-gray-300 mt-6 flex items-center justify-center">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="mx-4 toggle-text-dark-mode" data-testid="or-text">
              Or
            </span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <div
            className="text-center mt-4 text-gray-500 dark:text-gray-300 toggle-text-dark-mode"
            data-testid="create-account"
          >
            You’re new here?{' '}
            <a
              href="/auth/register"
              className="text-green-500 dark:text-green-500 font-medium hover:underline"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </form>
  )
}

export { LoginForm }
