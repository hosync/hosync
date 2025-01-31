import { NextPage } from 'next'

import { auth, signIn, signOut } from '@/auth'

import CreateContact from './create-contact'

const SignIn: NextPage = async () => {
  const session = await auth()
  const user = session?.user as { name: string; accessToken: string }

  const response = await fetch(
    'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,birthdays,urls,photos,addresses,userDefined,biographies,metadata,organizations&sortOrder=FIRST_NAME_ASCENDING',
    {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session?.user?.accessToken ?? ''}`
      }
    }
  )

  if (!response.ok) {
    console.log('Failed to fetch contacts')
  }

  const data = await response.json()

  const contacts: any = []
  console.log('data===>', data)

  if (data && data.connections) {
    data.connections.forEach((contact: any) => {
      const {
        resourceName = '',
        names = [{}],
        emailAddresses = [{}],
        photos = [{}],
        phoneNumbers = [{}],
        urls = [{}],
        addresses = [{}],
        userDefined = [{}],
        biographies = [{}],
        metadata = [{}],
        organizations = [{}],
        birthdays = [{}]
      } = contact

      const guest = {
        googleContactId: metadata.sources[0].id,
        accountId: resourceName.replace('people/', ''),
        fullName: names[0].displayName,
        email: emailAddresses[0].value,
        photo: photos[0].url.replace('=s100', '') || '',
        phone:
          phoneNumbers[0].canonicalForm ||
          phoneNumbers[0].value ||
          phoneNumbers[0].formattedType ||
          '+52',
        socialMedia: urls[0].value || '',
        location: addresses[0].city || '',
        gender: userDefined[0].value || '',
        organization: organizations[0].name || '',
        note: biographies[0].value || '',
        birthday: birthdays[0].text || ''
      }

      contacts.push(guest)
    })
  }

  if (user) {
    return (
      <div>
        <p>Hello, {user.name}</p>

        <CreateContact />

        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    )
  }

  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  )
}

export default SignIn
