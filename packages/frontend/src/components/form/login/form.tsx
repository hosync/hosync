'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { SVG } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/contexts/theme'
import { useLoginForm } from '@/hooks/forms/useLoginForm'

const LoginForm: React.FC = () => {
  const { darkMode } = useTheme()
  const { state, onChange, submitForm } = useLoginForm()
  const { redirectTo = '' } = state.responseData || {}

  if (redirectTo) {
    window.location.href = redirectTo
  }

  return (
    <>
      <div className="relative mb-4">
        <div className="relative">
          <Input
            id="email"
            name="email"
            label="Email:"
            leftIcon={<SVG.Email />}
            placeholder="Please enter your email"
            type="email"
            required
            onChange={onChange}
            value={state.values.email}
            errorText={state.errors.error.email}
          />
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <Input
            name="password"
            label="Password:"
            leftIcon={<SVG.Lock />}
            placeholder="Please enter your password"
            type="password"
            required
            onChange={onChange}
            value={state.values.password}
            errorText={state.errors.error.password}
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
        <Button color="primary" onClick={submitForm} fullWidth type="submit">
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

      <div className="flex items-center w-full gap-x-2">
        <Button
          size="large"
          className="w-full"
          color={darkMode ? 'dark' : 'light'}
          onClick={() => signIn('google')}
        >
          <FcGoogle className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}

export { LoginForm }
