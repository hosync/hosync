'use client'

import Image from 'next/image'

interface Step2Props {
  setValues: any
  setStep: any
}

const Step2: React.FC<Step2Props> = ({ setValues, setStep }) => {
  return (
    <>
      <div className="flex w-full justify-between mt-20">
        <div
          className="cursor-pointer w-48"
          onClick={() => {
            setValues((prevState: any) => ({
              ...prevState,
              propertyType: 'cabin'
            }))
            setStep((prevState: any) => prevState + 1)
          }}
          title="common.general.cabin"
        >
          <div className="w-24 h-24 ml-14 mb-2 bg-gray-300 dark:bg-black rounded-full flex items-center justify-center">
            <Image
              src="/images/icons/cabin.png"
              alt="Cabin"
              width={64}
              height={64}
            />
          </div>
          <div className="text-center text-base font-bold">
            profile.setup.step2.entirePlace
          </div>

          <div className="text-center text-sm">profile.setup.step2.cabin</div>
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {
            setValues((prevState: any) => ({
              ...prevState,
              propertyType: 'hotel'
            }))
            setStep((prevState: any) => prevState + 1)
          }}
          title="common.general.hotel"
        >
          <div className="w-24 h-24 mx-auto mb-2 bg-gray-300 dark:bg-black rounded-full flex items-center justify-center">
            <Image
              src="/images/icons/hotel.png"
              alt="Hotel"
              width={64}
              height={64}
            />
          </div>

          <div className="text-center text-base font-bold">
            profile.setup.step2.hotel
          </div>

          <div className="text-center text-sm">
            profile.setup.step2.hotelPlaceholder
          </div>
        </div>
      </div>
    </>
  )
}

export { Step2 }
