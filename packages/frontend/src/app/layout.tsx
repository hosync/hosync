import type { Metadata, Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'

import { cx } from '@hosync/utils'

import { ThemeProvider } from '@/contexts/theme'
import config from '@/lib/config'
import * as cookies from '@/lib/utils/cookies'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: config.siteTitle
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false
}

const RootLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const darkMode = await cookies.get('darkMode')

  return (
    <html lang="en" className={cx.join({ dark: darkMode })}>
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>

      <body className={cx.join(inter.className)}>
        <SessionProvider>
          <ThemeProvider defaultDarkMode={darkMode}>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
