import { FC, ReactElement } from 'react'

import { auth } from '@/auth'

import Header from './components/Header'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  const session = await auth()

  return (
    <main>
      <div className="flex flex-col h-screen dark:bg-gray-950">
        <Header user={session?.user} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  )
}

export default Layout
