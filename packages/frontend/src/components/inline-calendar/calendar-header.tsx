import { SVG } from '@/components/svg'

interface CalendarHeaderProps {
  onPrevious: () => void
  onNext: () => void
  startDate: Date
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  onPrevious,
  onNext,
  startDate
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Cabin Reservations
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 font-medium">
          {formatDate(startDate)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous two weeks"
          >
            <SVG.Arrow direction="left" className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={onNext}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next two weeks"
          >
            <SVG.Arrow direction="right" className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export { CalendarHeader }
