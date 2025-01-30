import React from 'react'

import { SVG } from '@/components/svg'

import { Reservation } from './types'

interface ReservationCellProps {
  date: Date
  reservation: Reservation | undefined
  isStart: boolean
  onClick: () => void
}

const ReservationCell: React.FC<ReservationCellProps> = ({
  date,
  reservation,
  isStart,
  onClick
}) => {
  const dateStr = date.toISOString().split('T')[0]

  return (
    <div
      className={`
        min-w-[100px] h-16 border-r border-t border-b border-gray-100
        transition-colors cursor-pointer relative flex-1
        ${!reservation && 'hover:bg-blue-50'}
        ${reservation && isStart ? 'border-l rounded-l-lg' : ''}
        ${reservation && reservation.endDate === dateStr ? 'rounded-r-lg' : ''}
        ${reservation ? 'bg-blue-100' : ''}
      `}
      onClick={onClick}
    >
      {reservation && isStart && (
        <div className="absolute inset-0 p-1">
          <div className="h-full w-full rounded bg-white bg-opacity-90 p-1 text-xs">
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                reservation.status === 'confirmed'
                  ? 'bg-green-500'
                  : reservation.status === 'pending'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              } mb-1`}
            />
            <div className="font-medium truncate">
              {reservation.guest.fullName}
            </div>
            <div className="flex items-center text-gray-600">
              <SVG.User className="w-3 h-3 mr-1" />
              {reservation.guest.numberOfGuests}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { ReservationCell }
