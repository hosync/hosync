import { NextPage } from 'next'

import * as cookies from '~/app/cookies'
import * as SettingActions from '~/app/core/actions/setting'
import * as UserActions from '~/app/core/actions/user'

import Settings from './components/Settings'

const SettingsPage: NextPage = async () => {
  const connectedUser = await UserActions.getConnectedUser(await cookies.get('at'))

  const settings = await SettingActions.getBy(connectedUser.id)
  console.log('SETTINGS ====>', settings)
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <Settings />
    </div>
  )
}

export default SettingsPage
