'use client'

import React, { FC, useState } from 'react'

import HorizontalMenu from '~/design-system/HorizontalMenu'

import AmenitiesSettings from '../AmenitiesSettings'
import BusinessSettings from '../BusinessSettings'
import PhotosSettings from '../PhotosSettings'
import PricesSettings from '../PricesSettings'
import PropertySettings from '../PropertySettings'
import UserSettings from '../UserSettings'

const SettingsComponents: any = {
  User: UserSettings,
  Business: BusinessSettings,
  Property: PropertySettings,
  Amenities: AmenitiesSettings,
  Prices: PricesSettings,
  Photos: PhotosSettings
}

const Settings: FC = () => {
  const [active, setActive] = useState('User')

  const SettingsComponent = SettingsComponents[active]

  const tabs = {
    User: () => setActive('User'),
    Business: () => setActive('Business'),
    Property: () => setActive('Property'),
    Amenities: () => setActive('Amenities'),
    Prices: () => setActive('Prices'),
    Photos: () => setActive('Photos')
  }

  return (
    <div>
      <HorizontalMenu tabs={tabs} activeTab={active} />

      <div className="flex">
        <SettingsComponent />
      </div>
    </div>
  )
}

export default Settings
