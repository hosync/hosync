import React from 'react'

import { cx, getCitiesByState, getStates } from '@hosync/utils'

import { Input } from '@/components/ui/input'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const Step1: React.FC = () => {
  const { state, onChange } = useProfileSetupForm()
  const { values, errors } = state

  const states = getStates(values.location.country)
  const cities = getCitiesByState(
    values.location.country,
    values.location.state
  )

  const getInputClassName = (error: string) =>
    `w-full px-4 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
      error ? 'border-red-500' : 'border-gray-200'
    }`

  return (
    <div className="mx-auto p-6 lg:w-[600px] flex flex-col md:flex-row md:flex-wrap bg-white dark:bg-gray-900 w-full">
      <div className="w-full md:w-1/2 md:pr-4">
        <Input name="email" label="Email" value={values.email} disabled />

        <Input
          name="propertyName"
          label="Property Name"
          value={values.propertyName}
          onChange={onChange}
          errorText={errors.propertyName}
        />

        <Input
          name="googleMaps"
          label="Google Maps"
          value={values.googleMapsUrl}
          onChange={onChange}
          errorText={errors.googleMapsUrl}
          placeholder="https://www.google.com/maps/place/..."
          required
        />
      </div>

      <div className="w-full md:w-1/2 md:pl-4">
        <Input
          name="country"
          label="Country"
          value={values.location.country}
          onChange={onChange}
          disabled
          required
          errorText={errors.googleMapsUrl}
        />

        <Input
          name="state"
          label="State"
          value={values.location.state}
          required
          dropdownItems={states.map((s: any) => s.state)}
          errorText={errors.state}
        />

        <Input
          name="city"
          label="City"
          value={values.location.city}
          onChange={onChange}
          required
          dropdownItems={cities}
          errorText={errors.city}
        />

        <Input
          autoComplete="new-password"
          name="address1"
          label="Address"
          value={values.location.address}
          onChange={onChange}
          placeholder="profile.setup.step1.streetAddress"
          required
          errorText={errors.address1}
        />

        <Input
          autoComplete="new-password"
          name="zipCode"
          label="Zip Code"
          value={values.location.zipCode}
          onChange={onChange}
          required
          errorText={errors.zipCode}
        />
      </div>
    </div>
  )
}

export { Step1 }
