function capitalize(str: string): string {
  if (typeof str !== 'string') {
    return ''
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

function ucwords(str: string): string {
  if (typeof str !== 'string') {
    return ''
  }

  const exclude = ['de', 'la', 'el', 'y', 'a', 'e', 'o', 'u', 'i']

  return str
    .split(' ')
    .map((word) => (exclude.includes(word) ? word : capitalize(word)))
    .join(' ')
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function getDashedDate(date: any) {
  if (!(date instanceof Date)) {
    console.error('Invalid date object passed:', date)
    return null // or throw an error, or return a default string
  }

  let day: any = date.getDate()

  if (day <= 9) {
    day = `0${day}`
  }

  let month: any = date.getMonth() + 1

  if (month <= 9) {
    month = `0${month}`
  }

  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

const createDateWithoutTimezone = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function isDateReserved(date: any, reservations: any, forceValidation = false) {
  return reservations.some((reservation: any) => {
    const resStartDate = createDateWithoutTimezone(reservation.startDate)
    const resEndDate = createDateWithoutTimezone(reservation.endDate)
    const dateStr = getDashedDate(date)

    if (forceValidation && dateStr === reservation.endDate) {
      return dateStr === reservation.endDate
    }

    return date >= resStartDate && date <= resEndDate
  })
}

function formatDate(date1: any, date2: any, isWeekend = false) {
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const day = date1.getDate()
  const day2 = date2.getDate()
  const monthIndex1 = date1.getMonth()
  const monthIndex2 = date2.getMonth()
  const month1 = monthNames[monthIndex1]
  const month2 = monthNames[monthIndex2]
  const divider = isWeekend ? 'y' : '-'

  if (monthIndex1 === monthIndex2) {
    return `${month1} ${day} ${divider} ${day2}`
  }

  if (monthIndex1 !== monthIndex2) {
    return `${month1} ${day} - ${month2} ${day2}`
  }

  return ''
}

// Function to get the rate based on the month
function getRate(month: number) {
  switch (month) {
    case 0:
      return 1
    case 1:
      return 1.5
    case 2:
      return 5
    case 3:
      return 4
    case 4:
      return 3
    case 5:
      return 2.5
    case 6:
      return 4
    case 7:
      return 5
    case 8:
      return 2
    case 9:
      return 1.5
    case 10:
      return 2.5
    case 11:
      return 5
    default:
      return 1.5
  }
}

function daysUntil(targetDate: string) {
  const currentDate: any = new Date()
  const currentDateString = currentDate.toISOString().split('T')[0]

  // If today is the target date, return 0
  if (currentDateString === targetDate) return 0

  const dateTarget: any = new Date(targetDate)

  const diffInMilliseconds = dateTarget - currentDate
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24))

  return diffInDays
}

const dates = {
  filterReservationsByYear: (reservations: any, currentYear: number) => {
    const reservationsByYear = reservations.filter((reservation: any) => {
      const [year] = reservation.startDate.split('-')

      return currentYear === Number(year)
    })

    return reservationsByYear
  },
  addDays: (date: any, count = 1) => {
    date.setDate(date.getDate() + count)
    return date.toISOString().split('T')[0]
  },
  getLongDate: (date: string, locale = 'en-US') => {
    const initialDate = new Date(date)

    const day = ucwords(
      initialDate.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    )

    return day
  },
  getMonthAndDay: (date: string, t: any, locale = 'en-US') => {
    const [, month, day] = date.split('-')
    const monthText = t(dates.months[Number(month) - 1].toLowerCase(), {}, locale)

    return `${monthText} ${day}`
  },
  isValidDate: (dateStr = '') => {
    if (!dateStr || typeof dateStr !== 'string') {
      return false
    }

    const splitter = dateStr && dateStr.indexOf('/') !== -1 ? '/' : '-'

    const [y = '', m = '', d = ''] = dateStr.split(splitter)

    if (d.length !== 2 || m.length !== 2 || y.length !== 4) {
      return false
    }

    if (y && m && d) {
      const year = Number(y)
      const month = Number(m)
      const day = Number(d)

      if (year > 1960 && year < 2100) {
        if (month > 0 && month < 13) {
          if (day > 0 && day < 32) {
            const testDate = new Date(year, month - 1, day)
            const testYear = testDate.getFullYear()
            const testMonth = testDate.getMonth() + 1
            const testDay = testDate.getDate()

            return testYear === year && testMonth === month && testDay === day
          }
        }
      }
    }

    return false
  },
  isWeekend: (date?: string) => {
    const newDate = new Date(date || '')

    return newDate.getDay() === 6 || newDate.getDay() === 0
  },
  weekday: (date?: string, returnStr = false) => {
    const newDate = new Date(date || '')
    const day = newDate.getDay() + 1
    const dayIndex = day === 7 ? 0 : day

    return returnStr ? days[dayIndex] : dayIndex
  },
  getDaysDifference: (date1: string, date2: string) => {
    const difference = new Date(date2).getTime() - new Date(date1).getTime()
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24))
    totalDays = totalDays < 0 ? totalDays * -1 : totalDays
    totalDays = totalDays === 0 ? 1 : totalDays
    return totalDays
  },
  getTwoDigitsDay: (day: number) => {
    if (day <= 9) {
      return `0${day}`
    }

    return day
  },
  getTwoDigitsMonth: (month: number) => {
    if (month <= 9) {
      return `0${month}`
    }

    return month
  },
  getIsToday: (currentDate: any, cDay: number) =>
    cDay === new Date().getDate() &&
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear(),
  getExistingEvents: (events: any, initialDate: number) =>
    events.filter((event: any) => {
      const start = new Date(event.startDate).getTime()
      const end = new Date(event.endDate).getTime()
      const isInRange = initialDate >= start && initialDate <= end

      return isInRange
    }),
  getAvailableDates: (reservations: any, finishOn: any, overwrites: any) => {
    // Filter reservations that have date before today
    const filteredReservations = reservations.filter((reservation: any) => {
      const [year, month, day] = reservation.endDate.split('-')
      const reservationDate = new Date(year, month - 1, day)

      return reservationDate > new Date()
    })

    const startDate = new Date()
    const endDate = finishOn ? new Date(finishOn) : new Date(startDate.getFullYear() + 1, 0, 1)
    let currentDay

    const weekends: any = []
    const sundayToTuesday: any = []
    const tuesdayToFriday: any = []
    const flexibleDates: any = []

    while (startDate < endDate) {
      currentDay = startDate.getDay()

      if (!isDateReserved(startDate, filteredReservations)) {
        const rate = getRate(startDate.getMonth())

        // Weekends
        if (currentDay === 5) {
          const fridayDate = new Date(startDate.getTime())

          const saturdayDate = new Date(startDate.getTime())
          saturdayDate.setDate(saturdayDate.getDate() + 1)

          if (
            !isDateReserved(fridayDate, filteredReservations, true) &&
            !isDateReserved(saturdayDate, filteredReservations)
          ) {
            weekends.push({
              startDate: getDashedDate(startDate),
              endDate: getDashedDate(saturdayDate),
              text: formatDate(startDate, saturdayDate, true),
              rate,
              price: null,
              offer: daysUntil(getDashedDate(startDate) || '') <= 2,
              daysUntil: daysUntil(getDashedDate(startDate) || '')
            })
          }
          // Sunday to Tuesday
        } else if (currentDay === 0) {
          const sundayDate = new Date(startDate.getTime())

          const mondayDate = new Date(startDate.getTime())
          mondayDate.setDate(mondayDate.getDate() + 1)

          const tuesdayDate = new Date(startDate.getTime())
          tuesdayDate.setDate(tuesdayDate.getDate() + 2)

          if (
            !isDateReserved(sundayDate, filteredReservations) &&
            !isDateReserved(mondayDate, filteredReservations)
          ) {
            sundayToTuesday.push({
              startDate: getDashedDate(startDate),
              endDate: getDashedDate(tuesdayDate),
              text: formatDate(startDate, tuesdayDate),
              rate,
              price: null,
              offer: daysUntil(getDashedDate(startDate) || '') <= 5,
              daysUntil: daysUntil(getDashedDate(startDate) || '')
            })
          }
          // Tuesday to Friday
        } else if (currentDay === 2) {
          const tuesdayDate = new Date(startDate.getTime())

          const wednesdayDate = new Date(startDate.getTime())
          wednesdayDate.setDate(wednesdayDate.getDate() + 1)

          const thursdayDate = new Date(startDate.getTime())
          thursdayDate.setDate(thursdayDate.getDate() + 2)

          const fridayDate = new Date(startDate.getTime())
          fridayDate.setDate(fridayDate.getDate() + 3)

          if (
            !isDateReserved(tuesdayDate, filteredReservations) &&
            !isDateReserved(wednesdayDate, filteredReservations) &&
            !isDateReserved(thursdayDate, filteredReservations)
          ) {
            tuesdayToFriday.push({
              startDate: getDashedDate(startDate),
              endDate: getDashedDate(fridayDate),
              text: formatDate(startDate, fridayDate),
              rate,
              price: null,
              offer: daysUntil(getDashedDate(startDate) || '') <= 5,
              daysUntil: daysUntil(getDashedDate(startDate) || '')
            })
          }
        }
      }

      startDate.setDate(startDate.getDate() + 1)
    }

    filteredReservations.forEach((reservation: any) => {
      const reservationIndex1 = sundayToTuesday.findIndex(
        (date: any) =>
          date.startDate === reservation.endDate || date.startDate === reservation.startDate
      )

      const reservationToMove = sundayToTuesday[reservationIndex1]

      if (reservationToMove) {
        sundayToTuesday.splice(reservationIndex1, 1)

        const reservationIndex2 = tuesdayToFriday.findIndex(
          (date: any) =>
            date.startDate === reservationToMove.endDate ||
            date.startDate === reservationToMove.startDate
        )

        // Update the startDate to one day after the reservation
        const flexibleStartDate1 = new Date(reservationToMove.startDate)
        flexibleStartDate1.setDate(flexibleStartDate1.getDate() + 2)
        reservationToMove.startDate = getDashedDate(flexibleStartDate1)

        // Update the endDate to one day after the reservation
        const flexibleEndDate1 = new Date(reservationToMove.endDate)
        flexibleEndDate1.setDate(flexibleEndDate1.getDate() + 2)
        reservationToMove.endDate = getDashedDate(flexibleEndDate1)

        reservationToMove.text = formatDate(flexibleStartDate1, flexibleEndDate1)

        flexibleDates.push(reservationToMove)

        const reservationToMove2 = tuesdayToFriday[reservationIndex2]

        if (reservationToMove2) {
          // Update the startDate to one day after the reservation
          const flexibleStartDate2 = new Date(reservationToMove2.startDate)
          flexibleStartDate2.setDate(flexibleStartDate2.getDate() + 2)
          reservationToMove2.startDate = getDashedDate(flexibleStartDate2)

          // Update the endDate to one day after the reservation
          const flexibleEndDate2 = new Date(reservationToMove2.endDate)
          flexibleEndDate2.setDate(flexibleEndDate2.getDate() + 1)
          reservationToMove2.endDate = getDashedDate(flexibleEndDate2)

          reservationToMove2.text = formatDate(flexibleStartDate2, flexibleEndDate2)

          tuesdayToFriday.splice(reservationIndex2, 1)
          flexibleDates.push(reservationToMove2)
        }
      }
    })

    const datesToReturn: any = {
      weekends,
      sundayToTuesday,
      tuesdayToFriday,
      flexibleDates
    }

    // Overwrite the data
    if (overwrites) {
      Object.keys(overwrites).forEach((key) => {
        if (datesToReturn[key]) {
          overwrites[key].forEach((overwrite: any) => {
            const index = datesToReturn[key].findIndex(
              (date: any) =>
                date.startDate === overwrite.startDate && date.endDate === overwrite.endDate
            )
            if (index !== -1) {
              if (overwrite.rate) {
                datesToReturn[key][index].rate = overwrite.rate
              }

              if (overwrite.price) {
                datesToReturn[key][index].price = overwrite.price
              }
            }
          })
        }
      })
    }

    return datesToReturn
  },
  months,
  days
}

export default dates
