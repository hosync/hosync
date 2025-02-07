import React from 'react'

import { cx, getCitiesByState, getStates } from '@hosync/utils'

import { Input } from '@/components/ui/input'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const countries = ['United States', 'Mexico', 'Canada']
const states = {
  'United States': ['California', 'New York', 'Texas'],
  Mexico: ['Jalisco', 'Nuevo León', 'Quintana Roo'],
  Canada: ['Ontario', 'British Columbia', 'Quebec']
}

const cities = {
  California: ['Los Angeles', 'San Francisco', 'San Diego'],
  'New York': ['New York City', 'Buffalo', 'Albany'],
  Texas: ['Austin', 'Houston', 'Dallas']
}

const Step1: React.FC = () => {
  const { state, setFormValues } = useProfileSetupForm()
  const { values, errors } = state

  const states = getStates(values.location.country)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name.includes('.')) {
      const [parent, child] = name.split('.')

      setFormValues({
        [parent]: {
          // @ts-ignore
          ...values[parent as keyof typeof values],
          [child]: value
        }
      })
    } else {
      setFormValues({ [name]: value })
    }
  }

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
          onChange={handleChange}
          errorText={errors.propertyName}
        />

        <Input
          name="googleMaps"
          label="Google Maps"
          value={values.googleMapsUrl}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          required
          dropdownItems={cities}
          errorText={errors.city}
        />

        <Input
          autoComplete="new-password"
          name="address1"
          label="Address"
          value={values.address1}
          onChange={handleChange}
          placeholder="profile.setup.step1.streetAddress"
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.address1
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <Input
          autoComplete="new-password"
          name="address2"
          value={values.address2}
          onChange={handleChange}
          placeholder="profile.setup.step1.placeholder"
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.address1
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">
          {errors.address1}
        </p>

        <Input
          autoComplete="new-password"
          name="zipCode"
          label="Zip Code"
          value={values.zipCode}
          onChange={handleChange}
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.zipCode
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">
          {errors.zipCode}
        </p>
      </div>
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Property Information</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Name *
          </label>
          <input
            type="text"
            name="propertyName"
            value={values.propertyName}
            onChange={handleChange}
            className={getInputClassName(errors.propertyName)}
          />
          {errors.propertyName && (
            <p className="mt-1 text-sm text-red-500">{errors.propertyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={getInputClassName(errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Maps URL *
          </label>
          <input
            type="url"
            name="googleMapsUrl"
            value={values.googleMapsUrl}
            onChange={handleChange}
            className={getInputClassName(errors.googleMapsUrl)}
          />
          {errors.googleMapsUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.googleMapsUrl}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              name="location.country"
              value={values.location.country}
              onChange={handleChange}
              className={getInputClassName(errors['location.country'])}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors['location.country'] && (
              <p className="mt-1 text-sm text-red-500">
                {errors['location.country']}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <select
              name="location.state"
              value={values.location.state}
              onChange={handleChange}
              className={getInputClassName(errors['location.state'])}
            >
              <option value="">Select State</option>
              {values.location.country &&
                states[values.location.country as keyof typeof states]?.map(
                  (state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  )
                )}
            </select>
            {errors['location.state'] && (
              <p className="mt-1 text-sm text-red-500">
                {errors['location.state']}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <select
              name="location.city"
              value={values.location.city}
              onChange={handleChange}
              className={getInputClassName(errors['location.city'])}
            >
              <option value="">Select City</option>
              {values.location.state &&
                cities[values.location.state as keyof typeof cities]?.map(
                  (city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  )
                )}
            </select>
            {errors['location.city'] && (
              <p className="mt-1 text-sm text-red-500">
                {errors['location.city']}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code *
            </label>
            <input
              type="text"
              name="location.zipCode"
              value={values.location.zipCode}
              onChange={handleChange}
              className={getInputClassName(errors['location.zipCode'])}
            />
            {errors['location.zipCode'] && (
              <p className="mt-1 text-sm text-red-500">
                {errors['location.zipCode']}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            name="location.address"
            value={values.location.address}
            onChange={handleChange}
            className={getInputClassName(errors['location.address'])}
          />
          {errors['location.address'] && (
            <p className="mt-1 text-sm text-red-500">
              {errors['location.address']}
            </p>
          )}
        </div>
      </div>

      <FormFooter showBack={false} />
    </div>
  )
}

export default Step1
