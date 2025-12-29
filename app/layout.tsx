import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Background } from '@/components/bacground/background2'

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
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Background />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
