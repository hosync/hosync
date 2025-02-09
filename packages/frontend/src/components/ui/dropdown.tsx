import React, {
  ChangeEvent,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

/** A single option can be either a simple string or a { label: string; value: string } object. */
type RawOption = string | { label: string; value: string }

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional label to display above the dropdown. */
  label?: string
  /** Name for the underlying form field (useful for e.target.name). */
  name?: string
  /** Dropdown options (can be strings or { label, value } objects). */
  options: RawOption[]
  /** Placeholder text when nothing is selected. */
  placeholder?: string
  /**
   * A standard onChange handler that receives
   * a React.ChangeEvent<HTMLSelectElement>.
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  /** Controlled value for the dropdown. */
  value?: string
  /**
   * If provided, an error text is shown below the dropdown
   * and the border changes to red.
   */
  errorText?: string
}

/** Transform raw options into a consistent { label, value } format. */
function transformOptions(options: RawOption[]) {
  return options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  options,
  placeholder = 'Select an option',
  onChange,
  value,
  errorText,
  className,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // Convert raw options into { label, value } format
  const transformedOptions = useMemo(() => transformOptions(options), [options])

  // Internal fallback state if not controlled
  const [internalValue, setInternalValue] = useState('')
  const selectedValue = value !== undefined ? value : internalValue

  // Ref for the entire dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null)

  /**
   * Close dropdown if user clicks outside of it.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  /**
   * Simulate a standard HTMLSelectElement change event when using
   * the custom desktop dropdown.
   */
  const triggerOnChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          name: name || '',
          value: newValue
        },
        currentTarget: {
          name: name || '',
          value: newValue
        },
        // Noops to avoid errors if called
        preventDefault: () => {},
        stopPropagation: () => {}
      } as unknown as React.ChangeEvent<HTMLSelectElement>

      onChange(syntheticEvent)
    }
  }

  const handleSelect = (newVal: string) => {
    setInternalValue(newVal)
    triggerOnChange(newVal)
    setIsOpen(false)
  }

  /**
   * If there's an error, use red border. Otherwise, use normal border classes.
   */
  const borderColorClasses = errorText
    ? 'border-red-500 dark:border-red-400'
    : 'border-gray-300 dark:border-gray-600'

  return (
    <div
      // Make sure the container is relative so the absolute dropdown panel can appear correctly
      className={`relative flex flex-col w-full ${className ?? ''}`}
      ref={dropdownRef}
      {...rest}
    >
      {/* Optional Label */}
      {label && (
        <label className="block text-gray-700 text-sm font-bold text-left dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Desktop dropdown (hidden on small screens) */}
      <div className="hidden md:block w-full">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`
            inline-flex w-full items-center justify-between
            bg-white dark:bg-gray-800
            px-6 py-2 text-sm
            text-gray-700 dark:text-gray-200
            hover:bg-gray-50 dark:hover:bg-gray-700
            transition-colors
            border ${borderColorClasses}
            ${
              isOpen
                ? // When open: top corners only + remove bottom border
                  'rounded-t-md border-b-0'
                : // When closed: fully rounded
                  'rounded-md'
            }
          `}
        >
          {selectedValue
            ? transformedOptions.find((opt) => opt.value === selectedValue)
                ?.label
            : placeholder}
          {/* Chevron icon */}
          <svg
            className="ml-2 h-5 w-5 text-gray-500 dark:text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.294l3.71-4.06a.75.75 0 111.08 1.04l-4.24 4.625a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={`
              absolute left-0 top-full z-50 w-full
              bg-white dark:bg-gray-800
              shadow-lg rounded-b-md
              border-t-0 border ${borderColorClasses}
            `}
          >
            {/* max-height and scroll for large lists */}
            <div className="max-h-48 overflow-y-auto py-1">
              {transformedOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`
                    block w-full px-4 py-2 text-left text-sm
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-600
                    ${selectedValue === opt.value ? 'font-semibold' : ''}
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile select (hidden on md and above) */}
      <div className="block md:hidden w-full">
        <select
          name={name}
          className={`
            block w-full
            rounded-md
            px-6 py-2 text-sm
            text-gray-700 dark:text-gray-200
            bg-white dark:bg-gray-800
            hover:bg-gray-50 dark:hover:bg-gray-700
            transition-colors
            border ${borderColorClasses}
          `}
          value={selectedValue}
          onChange={(e) => {
            setInternalValue(e.target.value)
            onChange?.(e)
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {transformedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error Text (if present) */}
      {errorText && (
        <p className="mt-1 text-[10px] text-red-500 dark:text-red-400">
          {errorText}
        </p>
      )}
    </div>
  )
}

export { Dropdown }
