'use client'

import { Link } from '@/components/ui/link'

const Step8: React.FC = () => {
  return (
    <div className="h-screen flex flex-row content-center">
      <div className="flex flex-col justify-center items-center text-center w-full">
        <h1 className="p-0 text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
          Congratulations! Your property is now listed!
        </h1>
        <p className="mb-5">
          Your business has been properly registered.
          <br />
          Proceed to the{' '}
          <Link href="/dashboard">
            <b>dashboard</b>
          </Link>{' '}
          to start using the platform
        </p>
      </div>
    </div>
  )
}

export { Step8 }
