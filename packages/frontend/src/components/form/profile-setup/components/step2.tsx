'use client'

import Image from 'next/image'

import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const Step2: React.FC = () => {
  const { onChange } = useProfileSetupForm()

  return (
    <>
      <div className="flex w-full justify-between mt-20">
        <div
          className="cursor-pointer w-48"
          onClick={() => {
            onChange(null, { name: 'propertyType', value: 'cabin' })
          }}
          title="Cabin"
        >
          <div className="w-24 h-24 ml-14 mb-2 bg-gray-300 dark:bg-black rounded-full flex items-center justify-center">
            <Image
              src="/images/icons/cabin.png"
              alt="Cabin"
              width={64}
              height={64}
            />
          </div>
          <div className="text-center text-base font-bold">Entire Place</div>
          <div className="text-center text-sm">Cabin</div>
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {
            onChange(null, { name: 'propertyType', value: 'hotel' })
          }}
          title="Hotel"
        >
          <div className="w-24 h-24 mx-auto mb-2 bg-gray-300 dark:bg-black rounded-full flex items-center justify-center">
            <Image
              src="/images/icons/hotel.png"
              alt="Hotel"
              width={64}
              height={64}
            />
          </div>
          <div className="text-center text-base font-bold">Hotel</div>
          <div className="text-center text-sm">Hotel</div>
        </div>
      </div>
    </>
  )
}

export { Step2 }
