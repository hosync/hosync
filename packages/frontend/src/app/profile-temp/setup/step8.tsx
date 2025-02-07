'use client'

import { Link } from '@/components/ui/link'

type Props = {
  locale: string
}

const Step8: React.FC<Props> = () => {
  return (
    <div className="h-screen flex flex-row content-center">
      <div className="flex flex-col justify-center items-center text-center w-full">
        <h1 className="p-0 text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
          profile.setup.step8.headline
        </h1>

        <p className="mb-5">
          profile.setup.step8.subheadline
          <br />
          profile.setup.step8.subheadline2
          <Link href="/control">
            <b>dashboard</b>
          </Link>{' '}
          profile.setup.step8.subheadline2cont
        </p>
      </div>
    </div>
  )
}

export { Step8 }
