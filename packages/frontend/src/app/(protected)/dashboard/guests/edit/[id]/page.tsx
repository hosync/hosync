import { NextPage } from 'next'
import { redirect } from 'next/navigation'

import { core } from '@hosgu/utils'

import EditGuestForm from '~/app/control/components/Guests/Form'
import * as cookies from '~/app/cookies'
import * as GuestActions from '~/app/core/actions/guest'
import * as UserActions from '~/app/core/actions/user'

type Props = {
  params: {
    id: string
  }
}

const GuestEditPage: NextPage<Props> = async ({ params: { id = null } }) => {
  const formData = core.formData.set(new FormData(), { id })
  const response = await GuestActions.getOne(formData)
  const connectedUser = await UserActions.getConnectedUser(await cookies.get('at'))

  if (response.ok && response.data.items) {
    const [guest] = response.data.items

    return (
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
        <EditGuestForm action="edit" data={{ ...guest, businessId: connectedUser.businessId }} />
      </div>
    )
  } else {
    redirect('/404')
  }
}

export default GuestEditPage
