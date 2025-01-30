'use client'

import React, { ButtonHTMLAttributes, FC } from 'react'

import { cx } from '@hosync/utils'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  bold?: boolean
  className?: string
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
  disabled?: boolean
  frontColor?: string
  fullWidth?: boolean
  hoverColor?: string
  href?: string
  isLoading?: boolean
  loadingText?: string
  shape?: 'regular' | 'rounded' | 'circle' | 'square'
  size?: 'small' | 'medium' | 'large' | 'xLarge'
  target?: string
  testId?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'contained' | 'outlined' | 'transparent'
}

const Button: FC<Props> = ({
  bold = false,
  children,
  className = '',
  color = 'primary',
  disabled = false,
  frontColor,
  fullWidth = false,
  hoverColor,
  href,
  isLoading = false,
  loadingText = 'Loading...',
  onClick = () => {},
  shape = 'regular',
  size = 'medium',
  target,
  testId = undefined,
  type = 'button',
  variant = 'contained'
}) => {
  const baseStyles =
    'flex items-center justify-center p-2 transition duration-300'

  const colorClasses = (variant: string) => {
    switch (variant) {
      case 'contained':
        return {
          danger: 'bg-cinnabar hover:bg-thunderbird text-white',
          dark: 'bg-gray-900 hover:bg-gray-800 text-gray-100',
          info: 'bg-blue-500 hover:bg-blue-600 text-white',
          light: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
          primary:
            'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white',
          secondary: 'bg-green-600 hover:bg-green-700 text-white',
          success: 'bg-emerald hover:bg-forest text-white',
          warning: 'bg-orange hover:bg-fire text-white'
        }[color]
      case 'outlined':
        return {
          danger:
            'bg-white hover:bg-thunderbird text-thunderbird border border-thunderbird hover:border-thunderbird hover:text-white',
          dark: 'bg-white hover:bg-gray-900 text-gray-900 border border-gray-900 hover:border-gray-800 hover:text-white',
          info: 'bg-white hover:bg-blue-600 text-blue-600 border border-blue-600 hover:border-blue-600 hover:text-white',
          light:
            'bg-white hover:bg-gray-100 text-gray-900 border border-gray-100 hover:border-gray-200 hover:text-white',
          primary:
            'bg-white hover:bg-cerulean text-cerulean border border-cerulean hover:border-cerulean hover:text-white',
          secondary:
            'bg-white hover:bg-forest text-forest border border-forest hover:border-forest hover:text-white',
          success:
            'bg-white hover:bg-emerald text-emerald border border-emerald hover:border-emerald hover:text-white',
          warning:
            'bg-white hover:bg-fire text-fire border border-fire hover:border-fire hover:text-white'
        }[color]
      case 'transparent':
        return `bg-transparent text-${color}-500 hover:bg-${color}-100`
      default:
        return ''
    }
  }

  const sizeClasses = {
    small: 'px-2 py-1.5 text-xs',
    medium: 'px-6 py-2.5 text-sm',
    large: 'px-6 py-3.5 text-base',
    xLarge: 'px-8 py-4 text-lg'
  }[size]

  const shapeClasses = {
    regular: 'rounded',
    rounded: 'rounded-lg',
    circle: 'rounded-full',
    square: 'rounded-none'
  }[shape]

  const fullWidthClass = fullWidth ? 'w-full' : ''

  const boldClass = bold ? 'font-bold' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const buttonClasses = cx.join([
    baseStyles,
    boldClass,
    className,
    colorClasses(variant),
    disabledClass,
    fullWidthClass,
    shapeClasses,
    sizeClasses
  ])

  const content = isLoading ? loadingText : children

  return href ? (
    <a
      href={disabled ? undefined : href}
      target={target}
      className={cx.join(buttonClasses, 'hover:no-underline')}
      style={{ color: frontColor, backgroundColor: hoverColor }}
      aria-disabled={disabled}
    >
      {content}
    </a>
  ) : (
    <button
      className={buttonClasses}
      style={{ color: frontColor, backgroundColor: hoverColor }}
      disabled={disabled}
      onClick={onClick || undefined}
      type={type}
      data-testid={testId}
    >
      {content}
    </button>
  )
}

export { Button }
