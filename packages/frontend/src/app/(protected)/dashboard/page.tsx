import { NextPage } from 'next'

import { auth } from '@/auth'

const DashboardPage: NextPage = async () => {
  const session = await auth()

  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(session)}
    </div>
  )
}

export default DashboardPage
