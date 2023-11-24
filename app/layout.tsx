import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Ruda } from 'next/font/google'
import { Theme } from '@/lib/constants'

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
      className={cn(
        'bg-level1-100 text--100',
        ruda.className,
      )}
    >
      <body>{children}</body>
    </html>
  )
}
