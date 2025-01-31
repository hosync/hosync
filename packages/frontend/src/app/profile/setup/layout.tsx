import { FC, ReactElement } from 'react'

import { Header } from '@/components/layout/header'

type Props = {
  children: ReactElement
}

const Layout: FC<Props> = async ({ children }) => {
  return (
    <main>
      <div className="sticky top-0 z-50 bg-white dark:bg-black dark:text-white">
        <Header />
      </div>

      <div>{children}</div>
    </main>
  )
}

export default Layout
