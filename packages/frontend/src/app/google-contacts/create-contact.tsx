'use client'

import { useState } from 'react'

export default function CreateContact() {
  const [givenName, setGivenName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      let photoData = null

      // Convert photo to Base64 if provided
      if (photo) {
        const reader = new FileReader()
        photoData = await new Promise<string | null>((resolve) => {
          reader.onloadend = () =>
            resolve(reader.result?.toString().split(',')[1] || null)
          reader.readAsDataURL(photo)
        })
      }

      const response = await fetch('/api/contacts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          givenName,
          familyName,
          email,
          phoneNumber,
          photoData
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Contact created successfully!')
        setGivenName('')
        setFamilyName('')
        setEmail('')
        setPhoneNumber('')
        setPhoto(null)
      } else {
        setMessage(data.error || 'Failed to create contact.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Create a New Contact</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="givenName"
              className="block text-sm font-medium mb-2"
            >
              Given Name
            </label>
            <input
              id="givenName"
              type="text"
              className="w-full border rounded p-2"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="familyName"
              className="block text-sm font-medium mb-2"
            >
              Family Name
            </label>
            <input
              id="familyName"
              type="text"
              className="w-full border rounded p-2"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              className="w-full border rounded p-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-sm font-medium mb-2">
              Contact Photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              className="w-full border rounded p-2"
              onChange={handlePhotoUpload}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Contact'}
          </button>
        </form>
        {message && (
          <div
            className="mt-4 p-2 text-center text-white rounded"
            style={{
              background: message.includes('success') ? 'green' : 'red'
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
