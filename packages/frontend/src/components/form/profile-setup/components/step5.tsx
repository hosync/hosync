'use client'

import { FC, useState } from 'react'

import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const Step5: FC = () => {
  const { state, setFormValues, onChange } = useProfileSetupForm()
  const { values } = state

  const [isEditing, setIsEditing] = useState(false)

  const {
    price,
    currency,
    checkInHour,
    checkInMinute,
    checkInPeriod,
    checkOutHour,
    checkOutMinute,
    checkOutPeriod
  } = values.pricing
  console.log('checkInHour==>', checkInHour)
  console.log('checkOutHour===>', checkOutHour)
  const handleBlur = () => {
    const newValue = price

    if (!isNaN(newValue) && newValue <= 100000) {
      setFormValues({
        ...values,
        pricing: { ...values.pricing, price: newValue }
      })
    } else {
      // setInputValue(price.toString()) // Reset to current price if invalid input
    }

    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  const formatNumber = (num: number) => {
    const newPrice = new Intl.NumberFormat('en-US').format(num)
    console.log('NEW PRICE==>', num, newPrice)
    return newPrice
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
    setFormValues({
      ...values,
      pricing: { ...values.pricing, currency: e.target.value as 'USD' | 'MXN' }
    })
  }

  return (
    <div className="text-center mt-10">
      <div className="text-7xl sm:text-8xl font-bold flex justify-center items-center">
        <span className="mr-2">{getCurrencySymbol()}</span>
        {isEditing ? (
          <input
            data-testid="price"
            type="text"
            value={price}
            onChange={onChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`text-8xl text-center border-none focus:ring-0 outline-none w-48 dark:bg-gray-900`}
          />
        ) : (
          <span data-testid="fixed-price" onClick={() => setIsEditing(true)}>
            {formatNumber(price)}
          </span>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="currency" className="mr-2">
          Currency:
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
              onChange={(e) =>
                setFormValues({
                  ...values,
                  pricing: {
                    ...values.pricing,
                    checkInHour: Number(e.target.value)
                  }
                })
              }
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
              onChange={(e) =>
                setFormValues({
                  ...values,
                  pricing: {
                    ...values.pricing,
                    checkInMinute: Number(e.target.value)
                  }
                })
              }
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
              onChange={(e) =>
                setFormValues({
                  ...values,
                  pricing: {
                    ...values.pricing,
                    checkInPeriod: e.target.value as 'AM' | 'PM'
                  }
                })
              }
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
              onChange={(e) =>
                setFormValues({
                  ...values,
                  pricing: {
                    ...values.pricing,
                    checkOutHour: Number(e.target.value)
                  }
                })
              }
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
              onChange={(e) =>
                setFormValues({
                  ...values,
                  pricing: {
                    ...values.pricing,
                    checkOutMinute: Number(e.target.value)
                  }
                })
              }
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
              onChange={(e) =>
                setFormValues({
                  ...values,
                  pricing: {
                    ...values.pricing,
                    checkOutPeriod: e.target.value as 'AM' | 'PM'
                  }
                })
              }
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

export { Step5 }
