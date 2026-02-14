import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@/components/drawer/Drawer.css'
import './comparison-buttons.css'

export const metadata: Metadata = {
  title: 'Drawer Component Test',
  description: 'Interactive test page for the drawer component',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}