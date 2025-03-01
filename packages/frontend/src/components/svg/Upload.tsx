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
    data-component="SVG.Upload"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      fill={alternativeColor || color}
      width={size || width}
      height={size || height}
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1451.06 557.975C1456.76 557.082 1462.44 556.191 1468.24 556.191C1717.38 556.191 1920 761.334 1920 1013.33C1920 1265.33 1717.38 1470.48 1468.24 1470.48H1016.47V1094.13L1202.37 1282.36L1282.33 1201.45L960 875.391L637.666 1201.45L717.628 1282.36L903.529 1094.13V1470.48H395.294C177.318 1470.48 0 1291.05 0 1070.48C0 849.905 177.318 670.477 395.294 670.477C416.188 670.477 436.631 673.22 456.847 676.534C482.598 417.105 697.073 213.334 960 213.334C1181.82 213.334 1368.85 358.705 1438.08 559.62C1442.45 559.325 1446.76 558.649 1451.06 557.975ZM1016.47 1813.33H903.53V1470.48H1016.47V1813.33Z"
      />
    </svg>
  </div>
)

export default SVG
