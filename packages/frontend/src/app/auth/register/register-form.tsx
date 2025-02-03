'use client'

import { RegistrationFormWrapper } from '@/components/form/registration/form-wrapper'
import { Link } from '@/components/ui/link'

const RegisterForm: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        id="form-container"
        className="bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-md"
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
          Registration
        </h2>

        <RegistrationFormWrapper area="register" />
      </div>
    </div>
  )
}

export { RegisterForm }
