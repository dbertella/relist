import { Card } from "@/components/ui/card"
import { H1, H2, H3 } from "@/components/ui/typography"
import { getDataFromSheet } from "@/lib/sheets"
import { Toggle } from "@/components/ui/toggle"
import Link from "next/link"
import { PageProps } from "./type"

export default async function PageLayout({
  params,
  children,
}: {
  children: React.ReactNode
} & PageProps) {
  const [info] = await getDataFromSheet(params.sheetId, 'info')

  return (
    <main className="max-w-3xl m-auto">
      <Card className="p-2 border-none rounded-none bg-background">
        <H3>A {info.author}&apos;s list</H3>
        <H1>
          {info.title}</H1>
        <H2>
          {info.description}
        </H2>
      </Card>

      <menu className="m-4 justify-between items-start flex text-white">
        <Link href={`/${params.sheetId}/filter`}>FILTER</Link>
        <Link href={`/${params.sheetId}/sort`}>SORT</Link>
        <Toggle>DETAILS</Toggle>
        <Toggle>FAV</Toggle>
      </menu>
      {children}
    </main>
  )
}
