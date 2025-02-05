import { useEffect, useState } from 'react'

import { cx, getCitiesByState, getStates } from '@hosync/utils'

import { Input } from '@/components/ui/input'

interface Step1Props {
  locale: string
  values: any
  errors: any
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  setValues: any
  validate: any
}

const Step1: React.FC<Step1Props> = ({
  values,
  setValues,
  handleChange,
  errors
}) => {
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    if (values.state) {
      const newCities = getCitiesByState(values.country, values.state)
      setCities(newCities)
    }
  }, [values.state, values.country])

  const handleStateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleChange(e)
    const newCities = getCitiesByState(values.country, e.target.value)
    setCities(newCities)
    setValues('city', '') // Reset city when state changes
  }

  const states = getStates(values.country)

  return (
    <div className="mx-auto p-6 lg:w-[600px] flex flex-col md:flex-row md:flex-wrap bg-white dark:bg-gray-900 w-full">
      <div className="w-full md:w-1/2 md:pr-4">
        <Input
          autoComplete="new-password"
          name="googleMaps"
          label="Google Maps"
          value={values.googleMaps}
          onChange={handleChange}
          placeholder="https://www.google.com/maps/place/..."
          required
          className={
            errors.googleMaps ? 'border-red-500 dark:border-red-500' : ''
          }
          style={{ width: '100%', marginBottom: '2px' }}
        />
        <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">
          {errors.googleMaps}
        </p>
      </div>

      <div className="w-full md:w-1/2 md:pl-4">
        <Input
          name="country"
          label="common.general.country"
          value={values.country}
          onChange={handleChange}
          disabled
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.country
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <Input
          autoComplete="new-password"
          name="state"
          label="common.general.state"
          value={values.state}
          onChange={handleStateChange}
          required
          dropdownItems={states.map((state: any) => state.state)} // Extract the state names for the dropdown
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.state
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">
          {errors.state}
        </p>

        <Input
          autoComplete="new-password"
          name="city"
          label="common.general.city"
          value={values.city}
          onChange={handleChange}
          required
          dropdownItems={cities} // Populate cities based on selected state
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.city
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">
          {errors.city}
        </p>

        <Input
          autoComplete="new-password"
          name="address1"
          label="common.business.address"
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
          label="common.business.zipCode"
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
}

export { Step1 }
