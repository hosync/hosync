import React, { FC } from 'react'

type Props = {
  alternativeColor?: string
  color?: string
  height?: string
  label?: string
  onClick?: any
  size?: string
  width?: string
  className?: string
}

const SVG: FC<Props> = ({
  alternativeColor = '',
  color = '#666',
  height = '24px',
  label = undefined,
  onClick = undefined,
  size = '',
  width = '24px',
  className = undefined,
  ...svgProps
}) => (
  <div
    data-component="SVG.Reports"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={alternativeColor || color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size || width}
      height={size || height}
    >
      <rect x="6" y="10" width="4" height="9"></rect>
      <rect x="10" y="8" width="4" height="11"></rect>
      <rect x="14" y="3" width="4" height="16"></rect>

      <line x1="4" y1="20" x2="20" y2="20"></line>
    </svg>
  </div>
)

export default SVG
