'use client'

import { cx } from '@hosync/utils'

import { RegistrationFormWrapper } from '@/components/form/registration/wrapper'

const Hero: React.FC = () => {
  return (
    <div
      className={cx.join(
        'bg-cover bg-center py-20 lg:py-40 3xl:mb-20',
        `min-h-[1150px] 3xl:min-h-[700px]`,
        `bg-[url('/images/bg-hero.svg')] 3xl:bg-[url('/images/bg-hero-flat.svg')]`
      )}
    >
      <div className="container mx-auto mt-10 mb-40 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left md:pr-10 mb-10 md:mb-0">
          <h1 className="text-5xl text-white font-bold">
            Boost Your Business Revenue by +30% in just 6 months
          </h1>
          <p className="text-white mt-4 p-6 text-center md:p-0 md:text-left">
            Elevate your bookings by +30% in just six months. Our intelligent
            platform streamlines your workflow, slashing operational expenses
            and freeing up to 80% of your time—empowering you to focus on other
            areas of your business. Transform your booking experience and
            leverage cutting-edge tools for effortless expansion with
            hosync.com.
          </p>
        </div>

        <RegistrationFormWrapper />
      </div>
    </div>
  )
}

export { Hero }
