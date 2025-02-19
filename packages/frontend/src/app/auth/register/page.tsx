import { NextPage } from 'next'

import { RegistrationFormWrapper } from '@/components/form/registration/form-wrapper'

type Props = {
  searchParams: {
    error: string
  }
}

const RegisterPage: NextPage<Props> = async ({ searchParams }) => {
  const { error = '' } = await searchParams

  return <RegistrationFormWrapper area="register" error={error} />
}

export default RegisterPage
