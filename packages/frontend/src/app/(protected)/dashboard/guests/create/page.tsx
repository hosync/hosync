import { NextPage } from 'next'

import CreateGuestForm from '~/app/control/components/Guests/Form'
import * as cookies from '~/app/cookies'
import * as UserActions from '~/app/core/actions/user'

const GuestsCreatePage: NextPage = async () => {
  const connectedUser = await UserActions.getConnectedUser(await cookies.get('at'))

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <CreateGuestForm
        action="save"
        data={{ businessSlug: connectedUser.businessSlug, businessId: connectedUser.businessId }}
      />
    </div>
  )
}

export default GuestsCreatePage
