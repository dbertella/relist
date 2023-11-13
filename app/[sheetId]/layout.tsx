import { Card } from '@/components/ui/card'
import { H1, H2, H3 } from '@/components/ui/typography'
import { PageProps } from './type'
import { NavBar } from './NavBar'
import { getRelistData } from '@/lib/relistData'

import { Alfa_Slab_One } from 'next/font/google'
const alfa_slab_one = Alfa_Slab_One({ weight: '400', subsets: ['latin'] })

export default async function PageLayout({
  params,
  children,
}: {
  children: React.ReactNode
} & PageProps) {
  const { info } = await getRelistData(params.sheetId)

  return (
    <main className="max-w-md m-auto px-4 leading-normal">
      <Card className="py-4 px-1 border-none rounded-none bg-level2">
        <H3>A {info.author}&apos;s list</H3>
        <div className={alfa_slab_one.className}>
          <H1>{info.title}</H1>
        </div>
        <H2>{info.description}</H2>
      </Card>

      <NavBar />
      {children}
    </main>
  )
}
