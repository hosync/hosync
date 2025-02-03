'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { SVG } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@/components/ui/link'
import { useFormContext } from '@/contexts/form-context'
import { useTheme } from '@/contexts/theme-context'
import { LoginValues } from '@/validations'

const LoginForm: React.FC = () => {
  const { darkMode } = useTheme()
  const { state, onChange, onSubmit } = useFormContext<LoginValues>()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        id="form-container"
        className="bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-md w-[450px]"
      >
        <div className="flex justify-center mb-4">
          <Link href="/">
            <img
              src="/images/isotype.svg"
              alt="Logo"
              className="w-16 h-16"
              data-testid="isotype"
            />
          </Link>
        </div>

        <h2 className="text-2xl font-medium text-center mb-4 text-gray-800 dark:text-white toggle-text-dark-mode">
          Login to your account
        </h2>

        <p className="text-red-500 mb-4 text-xs text-center">{error}</p>

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
  )
}

export { LoginForm }
