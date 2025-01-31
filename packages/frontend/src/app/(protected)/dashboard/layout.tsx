import { redirect } from 'next/navigation'
import { FC, ReactElement } from 'react'

import * as UserActions from '@/actions/auth/user'
import * as cookies from '@/lib/utils/cookies'

import Header from './components/Header'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  const locale = await cookies.get('locale', 'en-us')

  // const { businessName } = connectedUser || {}

  return (
    <main>
      <div className="flex flex-col h-screen dark:bg-gray-950">
        <Header locale={locale} logoText="Cabañas San Pancho" />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  )
}

export default Layout
