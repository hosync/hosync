import { useEffect } from 'react'

import { Counter } from '@/components/ui/counter'

type Props = {
  locale: string
  values: any
  setValues: any
  setEnableNext: any
}

const Step: React.FC<Props> = ({ values, setValues, setEnableNext }) => {
  const { guests, bathrooms, bedrooms, beds } = values

  // Handlers for setting new values
  const handleGuestsChange = (count: number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      guests: count
    }))
  }

  const handleBathroomsChange = (count: number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      bathrooms: count
    }))
  }

  const handleBedroomsChange = (count: number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      bedrooms: count
    }))
  }

  const handleBedsChange = (count: number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      beds: count
    }))
  }

  useEffect(() => {
    // Validation logic if needed
    if (guests === 0 || bathrooms === 0 || bedrooms === 0 || beds === 0) {
      setEnableNext(false)
    } else {
      setEnableNext(true)
    }
  }, [guests, bathrooms, bedrooms, beds, setEnableNext])

  return (
    <div className="flex flex-col space-y-4 w-96">
      <div className="bg-white dark:bg-gray-900 p-2 rounded-xl text-black dark:text-white">
        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>{t('profile.setup.step3.guests')}</p>

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
          <p>{t('common.profile.setup.bathrooms')}</p>

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
          <p>{t('common.profile.setup.bedrooms')}</p>
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

        <div className="flex flex-row justify-between  items-center space-x-2 my-6">
          <p>{t('common.profile.setup.beds')}</p>
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

export default Step
