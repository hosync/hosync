'use client'

import { RegistrationForm } from '@/components/form/registration/form'
import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { useFormContext } from '@/contexts/form-context'
import { RegistrationFormProvider } from '@/hooks/forms/useRegistrationForm'

const RegistrationFormContent: React.FC = () => {
  const { state } = useFormContext()

  const SuccessMessage = () => (
    <div className="flex min-h-[519px] flex-col text-black dark:text-white justify-center m-auto p-1 text-center">
      <h2 className="text-black dark:text-white">
        Just One More Step to Get Started!
      </h2>
      <p className="w-11/12" style={{ margin: '0 auto' }}>
        Thank you for registering! Please check your email to complete your
        profile setup and activate your account.
      </p>
    </div>
  )

  return (
    <div className="w-[90%] md:w-1/2 bg-white dark:bg-black p-8 rounded-md shadow-md mb-20">
      <RenderBlockIf isTrue={!!state.isSuccess}>
        <SuccessMessage />
      </RenderBlockIf>

      <RenderBlockIf isFalse={!!state.isSuccess}>
        <RegistrationForm />
      </RenderBlockIf>
    </div>
  )
}

const RegistrationFormWrapper: React.FC = () => {
  return (
    <RegistrationFormProvider>
      <RegistrationFormContent />
    </RegistrationFormProvider>
  )
}

export { RegistrationFormWrapper }
