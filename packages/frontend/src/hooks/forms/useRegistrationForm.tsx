import * as UserActions from '@/actions/auth/user'
import { FormProvider } from '@/contexts/form-context'
import validation, { RegistrationValues } from '@/validations'

const RegistrationFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <FormProvider<RegistrationValues>
      initialValues={{
        fullName: '',
        businessName: '',
        businessEmail: '',
        businessPhone: '',
        businessWebsite: '',
        country: ''
      }}
      validate={validation.registration}
      onSubmitAction={UserActions.initialSignup}
    >
      {children}
    </FormProvider>
  )
}

export { RegistrationFormProvider }
