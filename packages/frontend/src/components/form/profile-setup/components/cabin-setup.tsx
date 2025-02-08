import { FC } from 'react'

import { Counter } from '@/components/ui/counter'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const CabinSetup: FC = () => {
  const { state, onChange } = useProfileSetupForm()
  const { values } = state
  const { guests = 1, bathrooms = 1, bedrooms = 1, beds = 1 } = values.capacity

  // Handlers for setting new values
  const handleGuestsChange = (count: number) => {
    onChange(null, {
      name: 'capacity.guests',
      value: count
    })
  }

  const handleBathroomsChange = (count: number) => {
    onChange(null, {
      name: 'capacity.bathrooms',
      value: count
    })
  }

  const handleBedroomsChange = (count: number) => {
    onChange(null, {
      name: 'capacity.bedrooms',
      value: count
    })
  }

  const handleBedsChange = (count: number) => {
    onChange(null, {
      name: 'capacity.beds',
      value: count
    })
  }

  return (
    <div className="flex flex-col space-y-4 w-96">
      <div className="bg-white dark:bg-gray-900 p-2 rounded-xl text-black dark:text-white">
        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Guests</p>

          <Counter
            onChange={handleGuestsChange}
            defaultValue={guests}
            max={25}
            spaces={5}
            style={{ width: '120px' }}
            data_testid="guests"
          />
        </div>
        <hr className="border-solid dark:border-gray-700" />

        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Bathrooms</p>

          <Counter
            onChange={handleBathroomsChange}
            max={10}
            defaultValue={bathrooms}
            spaces={5}
            style={{ width: '120px' }}
            data_testid="bathrooms"
          />
        </div>
        <hr className="border-solid dark:border-gray-700" />

        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Bedrooms</p>

          <Counter
            onChange={handleBedroomsChange}
            defaultValue={bedrooms}
            max={6}
            spaces={5}
            style={{ width: '120px' }}
            data_testid="bedrooms"
          />
        </div>

        <hr className="border-solid dark:border-gray-700" />

        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Beds</p>

          <Counter
            onChange={handleBedsChange}
            defaultValue={beds}
            max={6}
            spaces={5}
            style={{ width: '120px' }}
            data_testid="beds"
          />
        </div>
      </div>
    </div>
  )
}

export default CabinSetup
