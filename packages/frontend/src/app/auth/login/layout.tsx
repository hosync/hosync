import type { Metadata } from 'next'
import { FC, ReactElement } from 'react'

import config from '@/lib/config'

type Props = {
  children: ReactElement
}

export const metadata: Metadata = {
  title: `${config.siteTitle} - Login`
}

const Layout: FC<Props> = async ({ children }) => {
  return (
    <main>
      <div>{children}</div>
    </main>
  )
}

export default Layout
