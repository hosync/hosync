import React, { useEffect, useRef } from 'react'

import { DateHeader } from './date-header'
import { ReservationCell } from './reservation-cell'
import { Cabin, Reservation } from './types'

interface CalendarProps {
  dates: Date[]
  cabins: Cabin[]
  getReservation: (cabinId: string, date: Date) => Reservation | undefined
  onReservationClick: (reservation: Reservation) => void
  onNewReservation: (cabinId: string, date: Date) => void
  isToday: (date: Date) => boolean
  isWeekend: (date: Date) => boolean
  onDateChange: (direction: number) => void
}

export function Calendar({
  dates,
  cabins,
  getReservation,
  onReservationClick,
  onNewReservation,
  isToday,
  isWeekend,
  onDateChange
}: CalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<NodeJS.Timeout>(0)
  const lastScrollPosition = useRef(0)
  const scrollThreshold = 150
  const isScrollingRef = useRef(false)
  const lastDateChangeTime = useRef(Date.now())
  const dateChangeThrottle = 100

  const handleDateChangeThrottled = (direction: number) => {
    const now = Date.now()
    if (now - lastDateChangeTime.current >= dateChangeThrottle) {
      onDateChange(direction)
      lastDateChangeTime.current = now
      lastScrollPosition.current = 0
    }
  }

  useEffect(() => {
    const calendar = calendarRef.current
    if (!calendar) return

    let startX = 0
    let scrollLeft = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      const deltaX = e.deltaX
      lastScrollPosition.current += deltaX

      calendar.scrollLeft += deltaX

      scrollTimeout.current = setTimeout(() => {
        if (Math.abs(lastScrollPosition.current) > scrollThreshold) {
          const direction = lastScrollPosition.current > 0 ? 1 : -1
          handleDateChangeThrottled(direction)
        }
        lastScrollPosition.current = 0
      }, 100)
    }

    const handleMouseDown = (e: MouseEvent) => {
      isScrollingRef.current = true
      startX = e.pageX - calendar.offsetLeft
      scrollLeft = calendar.scrollLeft
      calendar.style.cursor = 'grabbing'
    }

    const handleMouseUp = () => {
      isScrollingRef.current = false
      calendar.style.cursor = 'grab'

      if (Math.abs(lastScrollPosition.current) > scrollThreshold) {
        const direction = lastScrollPosition.current > 0 ? 1 : -1
        handleDateChangeThrottled(direction)
      }
      lastScrollPosition.current = 0
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isScrollingRef.current) return
      e.preventDefault()

      const x = e.pageX - calendar.offsetLeft
      const walk = x - startX
      lastScrollPosition.current = -walk

      calendar.scrollLeft = scrollLeft - walk
    }

    const handleMouseLeave = () => {
      if (isScrollingRef.current) {
        handleMouseUp()
      }
    }

    calendar.addEventListener('wheel', handleWheel, { passive: false })
    calendar.addEventListener('mousedown', handleMouseDown)
    calendar.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      calendar.removeEventListener('wheel', handleWheel)
      calendar.removeEventListener('mousedown', handleMouseDown)
      calendar.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [onDateChange])

  return (
    <div
      ref={calendarRef}
      className="overflow-x-auto cursor-grab select-none"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div className="w-full">
        {/* Calendar Header */}
        <div className="flex border-b border-gray-200 pb-4">
          <div className="w-48 flex-shrink-0"></div>
          <div className="flex flex-1">
            {dates.map((date) => (
              <DateHeader
                key={date.toISOString()}
                date={date}
                isToday={isToday(date)}
                isWeekend={isWeekend(date)}
              />
            ))}
          </div>
        </div>

        {/* Cabin Rows */}
        <div className="mt-4">
          {cabins.map((cabin) => (
            <div
              key={cabin.id}
              className="flex items-center py-2 hover:bg-gray-50"
            >
              <div className="w-48 flex-shrink-0 font-medium text-gray-700 pl-4">
                {cabin.name}
              </div>
              <div className="flex flex-1">
                {dates.map((date) => {
                  const reservation = getReservation(cabin.id, date)
                  const dateStr = date.toISOString().split('T')[0]
                  const isStart = reservation?.startDate === dateStr

                  return (
                    <ReservationCell
                      key={`${cabin.id}-${date.toISOString()}`}
                      date={date}
                      reservation={reservation}
                      isStart={isStart}
                      onClick={() => {
                        if (reservation) {
                          onReservationClick(reservation)
                        } else {
                          onNewReservation(cabin.id, date)
                        }
                      }}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
