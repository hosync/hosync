import { login } from '@/actions/auth/login'
import { FormProvider } from '@/contexts/form-context'
import validation, { LoginValuesOrErrors } from '@/validations'

const LoginFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <FormProvider<LoginValuesOrErrors>
      initialValues={{
        email: '',
        password: ''
      }}
      // @ts-ignore
      validate={validation.login}
      onSubmitAction={login}
    >
      {children}
    </FormProvider>
  )
}

export default LoginFormProvider
