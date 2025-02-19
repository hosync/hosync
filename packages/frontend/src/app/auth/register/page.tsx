import { NextPage } from 'next'

import { RegistrationFormWrapper } from '@/components/form/registration/form-wrapper'

type Props = {
  searchParams: {
    error: string
    email: string
  }
}

const RegisterPage: NextPage<Props> = async ({ searchParams }) => {
  const { error = '', email = '' } = await searchParams
  console.log('EMAIL====>', email)
  return <RegistrationFormWrapper area="register" error={error} email={email} />
}

export default RegisterPage
