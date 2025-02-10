'use client'

import { FC, useEffect, useState } from 'react'

import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const Step5: FC = () => {
  const { state, setFormValues } = useProfileSetupForm()
  const { values } = state

  const { pricePerNight, currency: originalCurrency } = values.pricing

  const [price, setPrice] = useState<number>(pricePerNight)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(price.toString())
  const [error, setError] = useState<string | null>(null)
  const [currency, setCurrency] = useState<string>(originalCurrency)

  const [checkInHour, setCheckInHour] = useState('03')
  const [checkInMinute, setCheckInMinute] = useState('00')
  const [checkInPeriod, setCheckInPeriod] = useState('PM')
  const [checkOutHour, setCheckOutHour] = useState('12')
  const [checkOutMinute, setCheckOutMinute] = useState('00')
  const [checkOutPeriod, setCheckOutPeriod] = useState('PM')

  const t = i18n(locale)

  useEffect(() => {
    setInputValue(price.toString())
  }, [price, setValues, values])

  useEffect(() => {
    if (
      values.checkInHour !== checkInHour ||
      values.checkInMinute !== checkInMinute ||
      values.checkInPeriod !== checkInPeriod ||
      values.checkOutHour !== checkOutHour ||
      values.checkOutMinute !== checkOutMinute ||
      values.checkOutPeriod !== checkOutPeriod ||
      values.price !== price ||
      values.currency !== currency
    ) {
      setValues((prevValues: any) => ({
        ...prevValues,
        checkInHour,
        checkInMinute,
        checkInPeriod,
        checkOutHour,
        checkOutMinute,
        checkOutPeriod,
        price,
        currency
      }))
    }
  }, [
    checkInHour,
    checkInMinute,
    checkInPeriod,
    checkOutHour,
    checkOutMinute,
    checkOutPeriod,
    price,
    setValues
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (/^\d*$/.test(value)) {
      setInputValue(value)

      if (parseInt(value, 10) > 100000) {
        setError('Value cannot exceed 100,000')
      } else {
        setError(null)
      }
    }
  }

  const handleBlur = () => {
    const newValue = parseInt(inputValue, 10)

    if (!isNaN(newValue) && newValue <= 100000) {
      setPrice(newValue)
    } else {
      setInputValue(price.toString()) // Reset to current price if invalid input
    }

    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD':
        return '$'
      case 'MXN':
        return 'MX$'
      default:
        return '$'
    }
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value)
  }

  return (
    <div className="text-center mt-10">
      <div className="text-7xl sm:text-8xl font-bold flex justify-center items-center">
        <span className="mr-2">{getCurrencySymbol()}</span>
        {isEditing ? (
          <input
            data-testid="price"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`text-8xl text-center border-none focus:ring-0 outline-none w-48 dark:bg-gray-900 ${error ? 'text-red-500' : ''}`}
          />
        ) : (
          <span
            data-testid="fixed-price"
            onClick={() => setIsEditing(true)}
            className={`${error ? 'text-red-500' : ''}`}
          >
            {formatNumber(price)}
          </span>
        )}
      </div>
      {error && <div className="text-red-500 text-xl mt-2">{error}</div>}

      <div className="mt-4">
        <label htmlFor="currency" className="mr-2">
          {t('profile.setup.step5.currency')}:
        </label>
        <select
          id="currency"
          value={currency}
          onChange={handleCurrencyChange}
          className="border p-1 rounded dark:text-white dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="USD">USD</option>
          <option value="MXN">MXN</option>
        </select>
      </div>

      <div className="mt-8 space-y-4 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <label htmlFor="checkIn" className="text-lg font-semibold mb-2">
            Check In:
          </label>
          <div className="flex space-x-2">
            <select
              id="checkInHour"
              value={checkInHour}
              onChange={(e) => setCheckInHour(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="self-center">:</span>
            <select
              id="checkInMinute"
              value={checkInMinute}
              onChange={(e) => setCheckInMinute(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
            >
              {['00', '15', '30', '45'].map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </select>
            <select
              id="checkInPeriod"
              value={checkInPeriod}
              onChange={(e) => setCheckInPeriod(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="checkOut" className="text-lg font-semibold mb-2">
            Check Out:
          </label>
          <div className="flex space-x-2">
            <select
              id="checkOutHour"
              value={checkOutHour}
              onChange={(e) => setCheckOutHour(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="self-center">:</span>
            <select
              id="checkOutMinute"
              value={checkOutMinute}
              onChange={(e) => setCheckOutMinute(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
            >
              {['00', '15', '30', '45'].map((min) => (
                <option key={min} value={min}>
                  {min}
                </option>
              ))}
            </select>
            <select
              id="checkOutPeriod"
              value={checkOutPeriod}
              onChange={(e) => setCheckOutPeriod(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default { Step5 }
