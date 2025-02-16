import { useEffect, useState } from 'react'

import { getCitiesByState, getStates } from '@hosync/utils'

import { Dropdown } from '@/components/ui/dropdown'
import { Input } from '@/components/ui/input'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const Step1: React.FC = () => {
  const { state, onChange } = useProfileSetupForm()
  const { values, errors } = state

  const states = getStates(values.location.country)
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    if (values.location.state) {
      const newCities = getCitiesByState(
        values.location.country,
        values.location.state
      )

      setCities(newCities)
    }
  }, [values.location.state])

  return (
    <div className="mx-auto p-6 lg:w-[600px] flex flex-col md:flex-row md:flex-wrap bg-white dark:bg-black w-full">
      <div className="w-full md:w-1/2 md:pr-4">
        <Input name="email" label="Email" value={values.email} disabled />

        <div className="mt-4" />

        <Input
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={onChange}
          errorText={errors.error.password}
        />

        <div className="mt-4" />

        <Input
          name="propertyName"
          label="Property Name"
          value={values.propertyName}
          onChange={onChange}
          errorText={errors.error.propertyName}
        />

        <div className="mt-4" />

        <Input
          name="googleMapsUrl"
          label="Google Maps"
          value={values.googleMapsUrl}
          onChange={onChange}
          errorText={errors.error.googleMapsUrl}
          placeholder="https://www.google.com/maps/place/..."
          required
        />

        <div className="mt-4" />
      </div>

      <div className="w-full md:w-1/2 md:pl-4">
        <Input
          name="location.country"
          label="Country"
          value={values.location.country}
          onChange={onChange}
          disabled
          required
        />

        <div className="mt-4" />

        <Dropdown
          label="State"
          name="location.state"
          options={states.map((state: any) => state.state)}
          placeholder="Pick a state..."
          value={values.location.state}
          onChange={onChange}
          errorText={errors.error.state}
        />

        <div className="mt-4" />

        <Dropdown
          label="City"
          name="location.city"
          options={cities}
          placeholder="Pick a city..."
          value={values.location.city}
          onChange={onChange}
          errorText={errors.error.city}
        />

        <div className="mt-4" />

        <Input
          autoComplete="new-password"
          name="location.address1"
          label="Address"
          value={values.location.address1}
          onChange={onChange}
          placeholder="Street Address"
          required
          errorText={errors.error.address1}
        />

        <Input
          autoComplete="new-password"
          name="location.address2"
          value={values.location.address2}
          onChange={onChange}
          placeholder="Apartment, suite, unit, building, floor, etc."
          required
          errorText={errors.error.address1}
        />

        <div className="mt-4" />

        <Input
          autoComplete="new-password"
          name="location.zipCode"
          label="Zip Code"
          value={values.location.zipCode}
          onChange={onChange}
          required
          errorText={errors.error.zipCode}
        />
      </div>
    </div>
  )
}

export { Step1 }
