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
      data-theme={Theme.Neutral}
      className={cn(
        'bg-level1-100 text--100 origin-top sm:scale[1] md:scale-[1.15] lg:scale-[1.4]',
        ruda.className,
      )}
    >
      <body>{children}</body>
    </html>
  )
}
