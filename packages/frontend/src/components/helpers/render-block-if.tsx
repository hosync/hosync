interface RenderBlockIfProps {
  children: React.ReactElement[] | React.ReactElement | string | any
  isTrue?: boolean
  isFalse?: boolean
}

const RenderBlockIf: React.FC<RenderBlockIfProps> = ({
  children,
  isTrue,
  isFalse
}) => {
  if (isTrue === true) {
    return <>{children}</>
  }

  if (isFalse === false) {
    return <>{children}</>
  }

  return null
}

export { RenderBlockIf }
