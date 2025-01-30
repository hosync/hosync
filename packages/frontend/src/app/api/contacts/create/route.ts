import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(req: NextRequest) {
  const session: any = await auth()

  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { givenName, familyName, email, phoneNumber, photoData } =
    await req.json()

  if (!givenName || !email) {
    return NextResponse.json(
      { error: 'Missing required fields: givenName and email' },
      { status: 400 }
    )
  }

  try {
    // Step 1: Create Contact
    const contactResponse = await fetch(
      'https://people.googleapis.com/v1/people:createContact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.accessToken || ''}`
        },
        body: JSON.stringify({
          names: [{ givenName, familyName }],
          emailAddresses: [{ value: email }],
          phoneNumbers: phoneNumber ? [{ value: phoneNumber }] : undefined
        })
      }
    )

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text()
      console.error('Contact Creation Error Response:', errorText)
      throw new Error('Failed to create contact')
    }

    const contact = await contactResponse.json()
    const resourceName = contact.resourceName
    console.log('Contact Resource Name:', resourceName)

    // Step 2: Wait a bit before uploading the photo
    if (photoData) {
      console.log('Waiting before uploading photo...')
      await delay(1000) // Wait 1 second

      const photoResponse = await fetch(
        `https://people.googleapis.com/v1/${resourceName}:updateContactPhoto`,
        {
          method: 'PATCH', // Corrected HTTP method
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.accessToken || ''}`
          },
          body: JSON.stringify({
            photoBytes: photoData
          })
        }
      )

      if (!photoResponse.ok) {
        const errorText = await photoResponse.text()
        console.error('Photo Upload Error Response:', errorText)
        throw new Error('Failed to upload contact photo')
      }

      console.log('Photo uploaded successfully!')
    }

    return NextResponse.json({ contact }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create contact' },
      { status: 500 }
    )
  }
}
