interface DateHeaderProps {
  date: Date
  isToday: boolean
  isWeekend: boolean
}

const DateHeader: React.FC<DateHeaderProps> = ({
  date,
  isToday,
  isWeekend
}) => {
  return (
    <div
      className={`
        flex flex-col items-center p-3 min-w-[100px] flex-1
        ${
          isToday
            ? 'bg-blue-500 text-white shadow-lg scale-110 z-10'
            : isWeekend
              ? 'bg-blue-50'
              : 'hover:bg-gray-50'
        }
      `}
    >
      <span
        className={`text-xs font-medium mb-1 ${isWeekend && !isToday ? 'text-blue-600' : ''}`}
      >
        {date.toLocaleDateString('en-US', { weekday: 'short' })}
      </span>
      <span
        className={`
        text-lg font-semibold
        ${isToday ? 'text-white' : isWeekend ? 'text-blue-600' : 'text-gray-800'}
      `}
      >
        {date.getDate()}
      </span>
      <span
        className={`text-xs mt-1 ${isWeekend && !isToday ? 'text-blue-600' : ''}`}
      >
        {date.toLocaleDateString('en-US', { month: 'short' })}
      </span>
    </div>
  )
}

export { DateHeader }
