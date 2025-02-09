import { NextPage } from 'next'

import { Blocks } from '@/components/layout/blocks'
import Footer from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Hero } from '@/components/layout/hero'

const Page: NextPage = async () => {
  return (
    <>
      <main className="bg-white dark:bg-black m-auto">
        <Header />
        <Hero />
        <Blocks />
        <Footer />
      </main>
    </>
  )
}

export default Page
