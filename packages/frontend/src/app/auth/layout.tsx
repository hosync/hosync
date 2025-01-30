import { NextPage } from 'next'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout: NextPage<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 to-green-500">
      {children}
    </div>
  )
}

export default AuthLayout
