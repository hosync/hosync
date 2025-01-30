'use client'

import { cx } from '@hosync/utils'

import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { Nav } from '@/components/layout/nav'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import { Link } from '@/components/ui/link'
import { Logo } from '@/components/ui/logo'
import { useTheme } from '@/contexts/theme-context'

import { HamburgerMenu } from './header-hamburger-menu'
import { ThemeSwitcher } from './header-theme-switcher'

interface HeaderProps {
  connectedUser?: any
  page?: string
}

const Header: React.FC<HeaderProps> = ({ connectedUser = {}, page }) => {
  const isLogged = connectedUser?.active
  const showLogin = !isLogged && page !== 'dashboard'
  const showTryForFree = !isLogged && page !== 'dashboard'
  const showSecondaryNav = page !== 'dashboard'
  const showHamburgerMenu = page !== 'dashboard'

  const { darkMode } = useTheme()

  const handleTryFree = () => {
    const inputElement = document.getElementById('fullName')

    if (inputElement) {
      inputElement.focus()
    }
  }

  const loginLink = showLogin ? (
    <Link href="/login" data-testid="login-link">
      Login
    </Link>
  ) : (
    ''
  )

  const tryForFreeButton = showTryForFree ? (
    <Button bold shape="circle" onClick={handleTryFree} testId="try-now-btn">
      Try Now
    </Button>
  ) : (
    ''
  )

  const fullName = connectedUser?.fullName
    ? connectedUser?.fullName
    : 'common.user.guestUser'
  const name = fullName.split(' ')[0]
  const lastName = fullName.split(' ')[1]

  return (
    <header
      data-component="Header"
      className={cx.join(
        'sticky top-0 m-0 bg-white flex items-center justify-between p-6 text-white border-slate-300 dark:bg-black dark:border-slate-600',
        'shadow-md',
        'z-50'
      )}
    >
      <Logo key={darkMode.toString()} />

      <div className="flex justify-between">
        {showSecondaryNav && !isLogged && (
          <div>
            <Nav isSecondaryNav items={[loginLink, tryForFreeButton]} />
          </div>
        )}

        {isLogged && (
          <div className="flex items-center space-x-2 mr-2">
            <Dropdown
              trigger={
                <div className="cursor-pointer rounded-md text-sm hidden text-gray-600 dark:text-white md:flex outline-none focus:outline-none user-select-none">
                  {name} {lastName}
                </div>
              }
            >
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-600 focus:outline-none user-select-none"
              >
                Profile
              </Link>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-600 focus:outline-none user-select-none"
              >
                Dashboard
              </Link>
              <a
                href="/logout"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:no-underline dark:hover:bg-gray-600 focus:outline-none user-select-none"
              >
                Logout
              </a>
            </Dropdown>
          </div>
        )}

        <div className={cx.join('ml-2', { 'lg:mt-2': !isLogged })}>
          <ThemeSwitcher />
        </div>

        <RenderBlockIf isTrue={showHamburgerMenu}>
          <div className="ml-2 lg:hidden">
            <HamburgerMenu isLogged={isLogged} connectedUser={connectedUser} />
          </div>
        </RenderBlockIf>

        <RenderBlockIf isTrue={connectedUser && page === 'dashboard'}>
          <div className="-mt-1 ml-4">
            <Avatar
              url={connectedUser.businessLogo || ''}
              name="1 G"
              size="medium"
            />
          </div>
        </RenderBlockIf>
      </div>
    </header>
  )
}

export { Header }
