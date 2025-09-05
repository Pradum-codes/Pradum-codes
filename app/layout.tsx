import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'

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
                {children}
                <Toaster />
            </ThemeProvider>
        </body>
    </html>
  )
}
