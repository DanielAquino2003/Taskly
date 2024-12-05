import { RegisterForm } from '@/components/register-form'
import { CheckSquare } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Header */}
      <header className="p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <CheckSquare className="h-8 w-8" />
            <span className="text-2xl font-bold">TaskLY</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/register" 
              className="text-zinc-600 hover:text-zinc-900"
            >
              Register
            </Link>
            <Link 
              href="/login"
              className="font-medium text-zinc-900"
            >
              Log In
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container flex items-center justify-center md:h-[calc(100vh-8rem)]">
        <div className="flex flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <RegisterForm />
          </div>
        </div>
      </main>
    </div>
  )
}

