import { cx } from '@hosync/utils'

interface CheckCardProps {
  checked: boolean
  icon: React.ReactElement
  onChange: () => void
  label: string
}

const CheckCard: React.FC<CheckCardProps> = ({
  checked,
  onChange,
  label,
  icon
}) => {
  return (
    <div
      className={cx.join(
        'relative cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center p-6 pb-4 rounded-lg text-center',
        {
          'bg-gradient-to-r from-blue-500 to-green-500 border-none': checked
        }
      )}
      onClick={onChange}
    >
      {icon}
      <p className={cx.join('font-semibold', checked ? 'text-white' : '')}>
        {label}
      </p>
    </div>
  )
}

export { CheckCard }
