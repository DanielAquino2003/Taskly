import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FamilyProvider } from '@/contexts/family-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskLY',
  description: 'Manage your tasks efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FamilyProvider>
          {children}
        </FamilyProvider>
      </body>
    </html>
  )
}

