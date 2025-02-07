'use client'

import { SVG } from '@/components/svg'
import { useTheme } from '@/contexts/theme'

const ThemeSwitcher: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  const stroke = darkMode ? '#eab308' : '#1d4ed8'

  return (
    <div
      data-component="ThemeSwitcher"
      data-testid="theme-switcher"
      className="flex focus:outline-none items-center space-x-2"
    >
      {darkMode ? (
        <SVG.Moon
          color={stroke}
          label="changeToLightMode"
          onClick={toggleDarkMode}
          data-testid="svg-moon"
        />
      ) : (
        <SVG.Sun
          color={stroke}
          label="changeToDarkMode"
          onClick={toggleDarkMode}
          data-testid="svg-sun"
        />
      )}
    </div>
  )
}

export { ThemeSwitcher }
