import { NextPage } from 'next'

import * as UserActions from '@/actions/user'
import { Blocks } from '@/components/layout/blocks'
import Footer from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Hero } from '@/components/layout/hero'

const Page: NextPage = async () => {
  const connectedUser = {}
  return (
    <>
      <main className="bg-white dark:bg-black m-auto">
        <Header connectedUser={connectedUser} />
        <Hero />
        <Blocks />
        <Footer />
      </main>
    </>
  )
}

export default Page
