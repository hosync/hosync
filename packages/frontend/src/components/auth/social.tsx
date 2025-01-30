'use client'

import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'

export const Social = () => {
  const { data: session } = useSession()
  console.log('Session', session)
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => signIn('google')}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  )
}
