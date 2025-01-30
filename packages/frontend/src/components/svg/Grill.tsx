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
    data-component="SVG.Grill"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width}
      height={size || height}
    >
      <path
        id="primary"
        d="M3,3H21M20,5V3H4V5a8,8,0,0,0,8,8h0A8,8,0,0,0,20,5Zm-3.14,6.36L19,21M5,21l2.14-9.61M6,17H18"
        style={{
          fill: 'none',
          stroke: alternativeColor || color,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '2px'
        }}
      ></path>
    </svg>
  </div>
)

export default SVG
