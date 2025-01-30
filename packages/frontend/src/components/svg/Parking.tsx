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
    data-component="SVG.Parking"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill={alternativeColor || color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5,22H19a3,3,0,0,0,3-3V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V19A3,3,0,0,0,5,22ZM4,5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1ZM9,18a1,1,0,0,0,1-1V14h2a4,4,0,0,0,0-8H9A1,1,0,0,0,8,7V17A1,1,0,0,0,9,18ZM10,8h2a2,2,0,0,1,0,4H10Z" />
    </svg>
  </div>
)

export default SVG
