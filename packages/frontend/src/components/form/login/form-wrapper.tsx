'use client'

import { LoginForm } from '@/components/form/login/form'
import { Link } from '@/components/ui/link'
import { useFormContext } from '@/contexts/form'
import FormProvider from '@/hooks/forms/useLoginForm'

const Content: React.FC = () => {
  const { state } = useFormContext()

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

        <p className="text-red-500 mb-4 text-xs text-center">
          {state.errors.responseError}
        </p>

        <LoginForm />

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

const LoginFormWrapper: React.FC = () => {
  return (
    <FormProvider>
      <Content />
    </FormProvider>
  )
}

export { LoginFormWrapper }
