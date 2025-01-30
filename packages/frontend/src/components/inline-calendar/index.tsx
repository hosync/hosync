'use client'

import { useEffect, useState } from 'react'

import { Calendar } from './calendar'
import { CalendarHeader } from './calendar-header'
import { ReservationModal } from './reservation-modal'
import { Cabin, Guest, Reservation } from './types'

const InlineCalendar = () => {
  const cabins: Cabin[] = [
    { id: '1', name: 'Cabaña de Piedra', pricePerNight: 150 },
    { id: '2', name: 'Cabaña Victoria', pricePerNight: 180 },
    { id: '3', name: 'Cabaña Vista del Rio', pricePerNight: 200 }
  ]

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      cabinId: '1',
      startDate: '2025-01-31',
      endDate: '2025-02-02',
      guest: {
        fullName: 'Maria Rodriguez',
        email: 'maria.rodriguez@email.com',
        phone: '+1 (555) 123-4567',
        numberOfGuests: 2,
        specialRequests: 'Early check-in requested'
      },
      totalPrice: 300,
      status: 'confirmed'
    },
    {
      id: '2',
      cabinId: '2',
      startDate: '2025-02-03',
      endDate: '2025-02-05',
      guest: {
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 987-6543',
        numberOfGuests: 4,
        specialRequests: 'Late checkout needed'
      },
      totalPrice: 540,
      status: 'confirmed'
    },
    {
      id: '3',
      cabinId: '3',
      startDate: '2025-02-07',
      endDate: '2025-02-09',
      guest: {
        fullName: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 456-7890',
        numberOfGuests: 3,
        specialRequests: 'Allergic to feathers'
      },
      totalPrice: 400,
      status: 'confirmed'
    },
    {
      id: '4',
      cabinId: '1',
      startDate: '2025-02-10',
      endDate: '2025-02-12',
      guest: {
        fullName: 'David Wilson',
        email: 'david.w@email.com',
        phone: '+1 (555) 234-5678',
        numberOfGuests: 2
      },
      totalPrice: 300,
      status: 'pending'
    }
  ])

  const [startDate, setStartDate] = useState(() => {
    const today = new Date()
    return new Date(today.setDate(today.getDate() - 7))
  })

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null)
  const [editedReservation, setEditedReservation] =
    useState<Reservation | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        moveCalendar('prev')
      } else if (e.key === 'ArrowRight') {
        moveCalendar('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const getDates = (start: Date): Date[] => {
    const dates: Date[] = []
    const current = new Date(start)
    for (let i = 0; i < 14; i++) {
      dates.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    return dates
  }

  const moveCalendar = (direction: 'prev' | 'next') => {
    setStartDate((prev) => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 14 : -14))
      return newDate
    })
  }

  const handleDateChange = (direction: number) => {
    setStartDate((prev) => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() + direction * 7) // Move by a week at a time for smoother scrolling
      return newDate
    })
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay()
    return day === 5 || day === 6
  }

  const getReservation = (
    cabinId: string,
    date: Date
  ): Reservation | undefined => {
    const dateStr = date.toISOString().split('T')[0]
    return reservations.find(
      (reservation) =>
        reservation.cabinId === cabinId &&
        dateStr >= reservation.startDate &&
        dateStr <= reservation.endDate
    )
  }

  const handleNewReservation = (cabinId: string, date: Date) => {
    const cabin = cabins.find((c) => c.id === cabinId)
    if (!cabin) return

    const dateStr = date.toISOString().split('T')[0]
    const nextDay = new Date(date)
    nextDay.setDate(date.getDate() + 1)
    const nextDayStr = nextDay.toISOString().split('T')[0]

    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      cabinId,
      startDate: dateStr,
      endDate: nextDayStr,
      guest: {
        fullName: '',
        email: '',
        phone: '',
        numberOfGuests: 1
      },
      totalPrice: cabin.pricePerNight,
      status: 'pending'
    }

    setSelectedReservation(newReservation)
    setEditedReservation(newReservation)
  }

  const handleInputChange = (
    field: keyof Reservation | keyof Guest,
    value: string | number,
    isGuestField: boolean = false
  ) => {
    if (!editedReservation) return

    setEditedReservation((prev) => {
      if (!prev) return prev

      if (isGuestField) {
        return {
          ...prev,
          guest: {
            ...prev.guest,
            [field]: value
          }
        }
      }

      return {
        ...prev,
        [field]: value
      }
    })
  }

  const handleSave = () => {
    if (!editedReservation) return

    setReservations((prevReservations) => {
      const existingIndex = prevReservations.findIndex(
        (r) => r.id === editedReservation.id
      )
      if (existingIndex >= 0) {
        return prevReservations.map((res) =>
          res.id === editedReservation.id ? editedReservation : res
        )
      }
      return [...prevReservations, editedReservation]
    })

    setSelectedReservation(null)
    setEditedReservation(null)
  }

  const dates = getDates(startDate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-[98vw] mx-auto bg-white rounded-2xl shadow-xl p-6">
        <CalendarHeader
          onPrevious={() => moveCalendar('prev')}
          onNext={() => moveCalendar('next')}
          startDate={startDate}
        />

        <Calendar
          dates={dates}
          cabins={cabins}
          getReservation={getReservation}
          onReservationClick={(reservation) => {
            setSelectedReservation(reservation)
            setEditedReservation(reservation)
          }}
          onNewReservation={handleNewReservation}
          isToday={isToday}
          isWeekend={isWeekend}
          onDateChange={handleDateChange}
        />
      </div>

      {selectedReservation && editedReservation && (
        <ReservationModal
          selectedReservation={selectedReservation}
          editedReservation={editedReservation}
          cabins={cabins}
          onClose={() => {
            setSelectedReservation(null)
            setEditedReservation(null)
          }}
          onSave={handleSave}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  )
}

export { InlineCalendar }
