import { FC, ReactElement } from 'react'

import Header from './components/Header'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  // const { businessName } = connectedUser || {}

  return (
    <main>
      <div className="flex flex-col h-screen dark:bg-gray-950">
        <Header logoText="Cabañas San Pancho" />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  )
}

export default Layout
