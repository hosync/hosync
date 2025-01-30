import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface HeaderProps {
  label: string
}

const Header: React.FC<HeaderProps> = ({ label }) => {
  return (
    <header className="w-full flex flex-col gap-y-4 items-center">
      <h1 className={cn('text-3xl font-semibold', font.className)}>HoSync</h1>

      <p className="text-muted-foreground text-sm">{label}</p>
    </header>
  )
}

export { Header }
