import * as UserActions from '@/actions/auth/user'
import { FormProvider } from '@/contexts/form-context'
import validation, { RegistrationValuesOrErrors } from '@/validations'

const RegistrationFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <FormProvider<RegistrationValuesOrErrors>
      initialValues={{
        fullName: '',
        businessName: '',
        businessEmail: '',
        businessPhone: '',
        businessWebsite: '',
        country: ''
      }}
      // @ts-ignore
      validate={validation.registration}
      onSubmitAction={UserActions.initialSignup}
    >
      {children}
    </FormProvider>
  )
}

export { RegistrationFormProvider }
