// layout secundario
/* import { Inter } from 'next/font/google' */
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import '../globals.css'

/* const inter = Inter({ subsets: ['latin'] }) */

export const metadata = {
  title: 'TaskLY',
  description: 'Manage your tasks efficiently',
}

export default function SecondaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
