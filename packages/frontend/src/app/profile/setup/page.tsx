import { NextPage } from 'next'

import * as UserActions from '@/actions/auth/user'
import { NotFound } from '@/components/ui/not-found'
import * as cookies from '@/lib/cookies'

import ProfileSetupForm from './form'

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

  return (
    <div className="min-h-screen flex justify-center bg-white dark:bg-gray-900 w-full">
      <div className="p-6 dark:text-white w-full">
        <ProfileSetupForm user={user} />
      </div>
    </div>
  )
}

export default Page
