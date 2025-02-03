import { useRef, useState } from 'react'

import { cx } from '@hosync/utils'

import { SVG } from '@/components/svg'

const EyeOffIcon = SVG.EyeOff
const EyeIcon = SVG.Eye

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string
  fullWidth?: boolean
  errorText?: string
  countryCodes?: { [code: string]: string }
  countryCodeValue?: string
  onCountryCodeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  leftIcon?: React.ReactNode
  shape?: 'rounded' | 'pill'
  dropdownItems?: string[]
}

const Input: React.FC<InputProps> = ({
  className = '',
  disabled = false,
  errorText = '',
  fullWidth = false,
  name = '',
  label = '',
  type = 'text',
  value,
  onChange,
  leftIcon = null,
  shape = 'rounded',
  dropdownItems = [],
  ...restProps
}) => {
  const [hasFocus, setHasFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inputValue, setInputValue] = useState<any>(value || '')
  const [localErrorText, setLocalErrorText] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const isPasswordType = type === 'password'
  const inputType = isPasswordType && showPassword ? 'text' : type

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setLocalErrorText('')

    if (onChange) {
      onChange(e)
    }
  }

  const handleFocus = () => {
    setHasFocus(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setHasFocus(false)
    }, 100)
  }

  return (
    <div
      data-component="Input"
      className={cx.join('text-left', fullWidth ? 'w-full block' : null)}
    >
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold text-left dark:text-gray-300"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="flex relative">
        {leftIcon && (
          <button
            type="button"
            className="absolute inset-y-0 left-2 pr-3 flex items-center text-sm leading-5"
            onClick={togglePasswordVisibility}
            style={{ top: '3px' }}
          >
            {leftIcon}
          </button>
        )}

        <input
          ref={inputRef}
          autoComplete={name === 'password' ? 'new-password' : 'off'}
          name={name}
          className={cx.join(
            'mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border shadow-sm sm:text-sm',
            'text-black dark:text-white',
            shape === 'rounded' ? 'rounded-md' : 'rounded-full',
            disabled ? 'opacity-50 cursor-not-allowed' : null,
            fullWidth ? 'w-full block' : null,
            hasFocus
              ? 'focus:outline-none focus:ring focus:ring-pacific'
              : null,
            leftIcon ? 'pl-10' : '',
            className,
            !!errorText
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          )}
          type={inputType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          value={inputValue}
          disabled={disabled}
          list={`${name}-datalist`} // Associate the input with the datalist
          {...restProps}
        />

        {isPasswordType && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            title={showPassword ? 'Hide password' : 'Show password'}
            style={{ top: '3px' }}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {/* Datalist replacing the dropdown menu */}
      {dropdownItems.length > 0 && (
        <datalist id={`${name}-datalist`}>
          {dropdownItems.map((item, index) => (
            <option key={index} value={item} />
          ))}
        </datalist>
      )}

      {(errorText || localErrorText) && (
        <div className="text-red-500 text-xxs">
          {errorText || localErrorText}
        </div>
      )}
    </div>
  )
}

export { Input }
