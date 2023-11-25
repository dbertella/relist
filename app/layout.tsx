import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Ruda } from 'next/font/google'
import { Theme } from '@/lib/constants'
import NextAuthProvider from '@/lib/auth/Provider'
import Navbar from '@/components/Navbar'
import TrpcProvider from '@/lib/trpc/Provider'

const ruda = Ruda({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Relist',
  description: 'List generated with ❤️',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={Theme.Default}
      className={cn('bg-level1-100 text--100', ruda.className)}
    >
      <body>
        <NextAuthProvider>
          <TrpcProvider>
            <main className="max-w-3xl mx-auto md:p-0 p-6">
              <Navbar />
              {children}
            </main>
          </TrpcProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
