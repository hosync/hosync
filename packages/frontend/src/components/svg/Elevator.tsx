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
    data-component="SVG.Elevator"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={size || width}
      height={size || height}
    >
      <path
        d="M12 8H17C17.5523 8 18 8.44772 18 9V19C18 19.5523 17.5523 20 17 20H12M12 8H7C6.44772 8 6 8.44772 6 9V19C6 19.5523 6.44772 20 7 20H12M12 8V20M7.5 4.5L9 3L10.5 4.5M13.5 3L15 4.5L16.5 3"
        stroke={alternativeColor || color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

export default SVG
