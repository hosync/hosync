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
    data-component="SVG.Towel"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 32 32"
      fill={alternativeColor || color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style type="text/css">
        {`
        .st0 {
          fill: none;
          stroke: ${alternativeColor || color};
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 10;
        }
      `}
      </style>
      <path className="st0" d="M25,2H7.2C5.4,2,4,3.4,4,5.2V30h18V20" />
      <path className="st0" d="M22,20h6V5c0-1.7-1.3-3-3-3h0c-1.7,0-3,1.3-3,3V20z" />
      <line className="st0" x1="4" y1="27" x2="22" y2="27" />
      <line className="st0" x1="4" y1="24" x2="22" y2="24" />
    </svg>
  </div>
)

export default SVG
