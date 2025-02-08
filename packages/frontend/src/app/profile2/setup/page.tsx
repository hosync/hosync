import { NextPage } from 'next'

import * as UserActions from '@/actions/auth/user'
import { NotFound } from '@/components/ui/not-found'
import * as cookies from '@/lib/utils/cookies'

import { StepsForm } from './steps-form'

type Props = {
  params: {
    code: string
  }
  searchParams: {
    code: string
  }
}

const Page: NextPage<Props> = async ({ searchParams: { code } }) => {
  const loggedFromProfileSetup = await cookies.get(
    'loggedFromProfileSetup',
    false
  )

  const user = await UserActions.getUserByCode(code)

  if (!user || (user.active && !loggedFromProfileSetup)) {
    return <NotFound />
  }

  return <StepsForm user={user} />
}

export default Page
