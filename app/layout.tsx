import './globals.css'
import type { Metadata } from 'next'
import { Ruda } from 'next/font/google'

const ruda = Ruda({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Relist',
  description: 'List generated with ❤️',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-level1-100 text-wording">
      <body className={ruda.className}>{children}</body>
    </html>
  )
}
