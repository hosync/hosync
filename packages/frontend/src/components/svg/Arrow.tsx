import React, { FC } from 'react'

type Props = {
  alternativeColor?: string
  color?: string
  direction?: 'left' | 'right' | 'up' | 'down'
  height?: string
  label?: string
  onClick?: any
  size?: string
  width?: string
  className?: string
}

const Arrow: FC<Props> = ({
  alternativeColor = '',
  color = '#666',
  direction = 'right',
  height = '24px',
  label = undefined,
  onClick = undefined,
  size = '',
  width = '24px',
  className = undefined,
  ...svgProps
}) => {
  let polylinePoints = '9 18 15 12 9 6'

  if (direction === 'left') {
    polylinePoints = '15 18 9 12 15 6'
  }

  if (direction === 'up') {
    polylinePoints = '18 15 12 9 6 15'
  }

  if (direction === 'down') {
    polylinePoints = '6 9 12 15 18 9'
  }

  return (
    <div
      data-component="SVG.Arrow"
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
      title={label}
      className={className}
      {...svgProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || width}
        height={size || height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={alternativeColor || color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points={polylinePoints} />
      </svg>
    </div>
  )
}

export default Arrow
