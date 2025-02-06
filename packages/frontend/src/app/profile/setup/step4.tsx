'use client'

import React, { FC, useEffect } from 'react'

import { SVG } from '@/components/svg'
import { CheckCard } from '@/components/ui/check-card'
import { useTheme } from '@/contexts/theme-context'

type Props = {
  values: any
  setValues: any
  setEnableNext: any
}

const Step4: FC<Props> = ({ values, setValues, setEnableNext }) => {
  const { amenities } = values
  const { darkMode } = useTheme()

  useEffect(() => {
    const currentValues = Array.from(Object.values(values.amenities))
    setEnableNext(currentValues.includes(true))
  }, [])

  const onChangeCheck = (name: string) => {
    const value = amenities[name]

    amenities[name] = !value
    setValues({ ...values, amenities })

    const currentValues = Array.from(Object.values(values.amenities))

    if (currentValues.includes(true)) {
      setEnableNext(true)
    } else {
      setEnableNext(false)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <CheckCard
        label="Wifi"
        checked={amenities.wifi}
        icon={
          <SVG.Wifi
            size="32px"
            alternativeColor={darkMode || amenities.wifi ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('wifi')}
      />
      <CheckCard
        label="TV"
        checked={amenities.tv}
        icon={
          <SVG.TV
            size="32px"
            alternativeColor={darkMode || amenities.tv ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('tv')}
      />
      <CheckCard
        label="Kitchen"
        checked={amenities.kitchen}
        icon={
          <SVG.Kitchen
            size="42px"
            alternativeColor={darkMode || amenities.kitchen ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('kitchen')}
      />
      <CheckCard
        label="Extra bed"
        checked={amenities.extraBed}
        icon={
          <SVG.Bed
            size="32px"
            alternativeColor={darkMode || amenities.extraBed ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('extraBed')}
      />
      <CheckCard
        label="Refrigerator"
        checked={amenities.refrigerator}
        icon={
          <SVG.Refrigerator
            size="32px"
            alternativeColor={darkMode || amenities.refrigerator ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('refrigerator')}
      />
      <CheckCard
        label="Bed sheets"
        checked={amenities.bedSheets}
        icon={
          <SVG.Bed
            size="32px"
            alternativeColor={darkMode || amenities.bedSheets ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('bedSheets')}
      />
      <CheckCard
        label="Free Parking"
        checked={amenities.freeParking}
        icon={
          <SVG.Parking
            size="32px"
            alternativeColor={darkMode || amenities.freeParking ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('freeParking')}
      />
      <CheckCard
        label="Towels"
        checked={amenities.towels}
        icon={
          <SVG.Towel
            size="32px"
            alternativeColor={darkMode || amenities.towels ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('towels')}
      />
      <CheckCard
        label="Pool"
        checked={amenities.pool}
        icon={
          <SVG.Swim
            size="32px"
            alternativeColor={darkMode || amenities.pool ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('pool')}
      />
      <CheckCard
        label="Coffee machine"
        checked={amenities.coffeeMachine}
        icon={
          <SVG.Coffee
            size="32px"
            alternativeColor={darkMode || amenities.coffeeMachine ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('coffeeMachine')}
      />

      <CheckCard
        label="Hot water"
        checked={amenities.hotWater}
        icon={
          <SVG.HotWater
            size="32px"
            alternativeColor={darkMode || amenities.hotWater ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('hotWater')}
      />
      <CheckCard
        label="Oven"
        checked={amenities.oven}
        icon={
          <SVG.Oven
            size="32px"
            alternativeColor={darkMode || amenities.oven ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('oven')}
      />
      <CheckCard
        label="AC"
        checked={amenities.ac}
        icon={
          <SVG.AC
            size="32px"
            alternativeColor={darkMode || amenities.ac ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('ac')}
      />
      <CheckCard
        label="Garden"
        checked={amenities.garden}
        icon={
          <SVG.Garden
            size="32px"
            alternativeColor={darkMode || amenities.garden ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('garden')}
      />
      <CheckCard
        label="Laundry"
        checked={amenities.laundry}
        icon={
          <SVG.Laundry
            size="32px"
            alternativeColor={darkMode || amenities.laundry ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('laundry')}
      />
      <CheckCard
        label="Pet friendly"
        checked={amenities.petFriendly}
        icon={
          <SVG.Pet
            size="32px"
            alternativeColor={darkMode || amenities.petFriendly ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('petFriendly')}
      />
      <CheckCard
        label="Smoking Area"
        checked={amenities.smoking}
        icon={
          <SVG.Smoke
            size="32px"
            alternativeColor={darkMode || amenities.smoking ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('smoking')}
      />
    </div>
  )
}

export { Step4 }
