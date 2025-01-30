'use client'

import { useRouter } from 'next/navigation'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  mode = 'redirect'
}) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return <span>Modal</span>
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  )
}

export { LoginButton }
