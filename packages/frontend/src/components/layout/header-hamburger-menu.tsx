'use client'

import React, { FC, useState } from 'react'

import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { SVG } from '@/components/svg'
import { Link } from '@/components/ui/link'
import { useTheme } from '@/contexts/theme'

type Props = {
  isLogged: boolean
  connectedUser: any
}

const HamburgerMenu: FC<Props> = ({ isLogged, connectedUser }) => {
  const { darkMode } = useTheme()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const stroke = darkMode ? 'white' : 'black'

  return (
    <div data-testid="hamburger-menu">
      <SVG.Hamburger
        label="Open Menu"
        color={stroke}
        onClick={() => setIsOpen(true)}
        data-testid="svg-hamburger"
      />

      <RenderBlockIf isTrue={isOpen}>
        <div className="bg-white fixed h-full left-0 top-0 w-full z-50 dark:bg-black">
          <SVG.X
            label="Close"
            onClick={() => setIsOpen(false)}
            color={stroke}
            data-testid="svg-x"
          />

          <RenderBlockIf isTrue={isLogged}>
            <div className="flex flex-col items-center justify-center pt-20 text-black dark:text-white text-xl">
              <div className="mb-10">
                <b>Welcome,</b> {connectedUser.fullName}!
              </div>

              <Link
                href="#"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                Profile
              </Link>
              <Link
                href="/dashboard"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                Dashboard
              </Link>
              <a
                href="/logout"
                className="block mb-2 text-black text-center text-xl dark:text-white font-bold"
              >
                Logout
              </a>
            </div>
          </RenderBlockIf>

          <div className={!isLogged ? 'pt-20' : ''}>
            <Link
              href="#"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              Reservations
            </Link>
            <Link
              href="#"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              Features
            </Link>
            <Link
              href="#"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              Trusted by
            </Link>
            <Link
              href="/auth/login"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="block mb-4 text-black text-center text-xl dark:text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </RenderBlockIf>
    </div>
  )
}

export { HamburgerMenu }
