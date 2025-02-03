'use client'

import { cx } from '@hosync/utils'

import { RegistrationForm } from '@/components/form/registration/form'
import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { useFormContext } from '@/contexts/form-context'
import { RegistrationFormProvider } from '@/hooks/forms/useRegistrationForm'

interface RegistrationFormProps {
  area: string
}

const RegistrationFormContent: React.FC<RegistrationFormProps> = ({ area }) => {
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

  const className = {
    'w-[90%]': area === 'hero',
    'w-full': area === 'register',
    'md:w-1/2': area === 'hero',
    'bg-white': true,
    'dark:bg-black': true,
    'p-8': true,
    'rounded-md': true,
    'shadow-md': area === 'hero',
    'mb-20': true
  }

  return (
    <div className={cx.join(className)}>
      <RenderBlockIf isTrue={!!state.isSuccess}>
        <SuccessMessage />
      </RenderBlockIf>

      <RenderBlockIf isFalse={!!state.isSuccess}>
        <RegistrationForm columns={area === 'hero' ? 2 : 1} />
      </RenderBlockIf>
    </div>
  )
}

const RegistrationFormWrapper: React.FC<RegistrationFormProps> = ({
  area = 'hero'
}) => {
  return (
    <RegistrationFormProvider>
      <RegistrationFormContent area={area} />
    </RegistrationFormProvider>
  )
}

export { RegistrationFormWrapper }
