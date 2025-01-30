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
    data-component="SVG.Engine"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      fill={alternativeColor || color}
      height={size || height}
      width={size || width}
      viewBox="0 0 24 24"
    >
      <style type="text/css">{`
  .st0{fill:none;stroke:#1E1E1E;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
  .st1{fill:none;stroke:#1E1E1E;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
  .st2{fill:none;stroke:#1E1E1E;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
  .st3{fill:#1E1E1E;}
  .st4{fill:#FFFFFF;stroke:#1E1E1E;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
  .st5{fill:none;stroke:#1E1E1E;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
  .st6{fill:none;stroke:#010101;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
  .st7{fill:#010101;}
  .st8{fill:none;stroke:#010101;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
`}</style>
      <path
        className="st0"
        d="M22,12.6v-1.3c0-0.5-0.3-0.9-0.7-1L19.7,10c-0.2-0.7-0.5-1.4-0.9-2.1l0.8-1.4c0.2-0.4,0.2-0.9-0.2-1.2l-0.9-0.9
	c-0.3-0.3-0.8-0.4-1.2-0.2l-1.4,0.8c-0.6-0.4-1.3-0.7-2.1-0.9l-0.4-1.5c-0.1-0.4-0.5-0.7-1-0.7h-1.3c-0.5,0-0.9,0.3-1,0.7L10,4.3
	C9.3,4.5,8.6,4.7,7.9,5.1L6.6,4.3C6.2,4.1,5.7,4.2,5.4,4.5L4.5,5.4C4.2,5.7,4.1,6.2,4.3,6.6l0.8,1.4C4.7,8.6,4.5,9.3,4.3,10
	l-1.5,0.4c-0.4,0.1-0.7,0.5-0.7,1l0,1.3c0,0.5,0.3,0.9,0.7,1L4.3,14c0.2,0.7,0.5,1.4,0.9,2.1l-0.8,1.4c-0.2,0.4-0.2,0.9,0.2,1.2
	l0.9,0.9c0.3,0.3,0.8,0.4,1.2,0.2l1.4-0.8c0.6,0.4,1.3,0.7,2.1,0.9l0.4,1.5c0.1,0.4,0.5,0.7,1,0.7h1.3c0.5,0,0.9-0.3,1-0.7l0.4-1.5
	c0.7-0.2,1.4-0.5,2.1-0.9l1.4,0.8c0.4,0.2,0.9,0.2,1.2-0.2l0.9-0.9c0.3-0.3,0.4-0.8,0.2-1.2l-0.8-1.4c0.4-0.6,0.7-1.3,0.9-2.1
	l1.5-0.4C21.7,13.5,22,13.1,22,12.6z"
      />
      <circle className="st0" cx="12" cy="12" r="3" />
    </svg>
  </div>
)

export default SVG
