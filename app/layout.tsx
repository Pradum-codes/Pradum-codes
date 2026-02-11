import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'

import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Background } from '@/components/bacground/background'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pradum Kumar',
  description: 'Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Background />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
