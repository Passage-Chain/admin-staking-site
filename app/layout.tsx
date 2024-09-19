import './globals.css'

import type { Metadata } from 'next'
import NavBar from '@/components/site/nav/nav-bar'
import Providers from './providers'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nft Staking Admin Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${inter.className} flex flex-col dark bg-background text-foreground min-h-screen`}
      >
        <Providers>
          <NavBar />
          <Toaster richColors position="top-right" />
          <main className="mt-10 flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
