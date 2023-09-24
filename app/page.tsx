import { ItemList } from '@/components/ItemList'
import { Badge } from '@/components/ui/badge'
import { H1, H2, H3 } from '@/components/ui/typography'
import { getDataFromSheet } from '@/lib/sheets'
import { camelCase } from 'lodash'
import { Card } from '../components/ui/card'
import { Attribute, AttributeItem, OtherAttribute, PrimaryAttribute } from '@/components/Attributes'

const SHEET_ID = '1ZyDFUqVNyhiN7I-E2AKytdwv_NrNY6K1Ch-zkFwytCs'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [info] = await getDataFromSheet(SHEET_ID, 'info')
  const meta = await getDataFromSheet(SHEET_ID, info.sheetForListSetup) as AttributeItem[]
  const items = await getDataFromSheet(SHEET_ID, info.sheetForListData)
  const primaryAttributes = meta.filter(it => ['number', 'range'].includes(it.type) && it.inPreview === 'yes') ?? []
  const secondaryAttributes = meta.filter(it => ['number', 'range'].includes(it.type) && it.inPreview === 'no') ?? []
  const textAttributes = meta.filter(it => ['text'].includes(it.type)) ?? []
  const paraghrapf = meta.filter(it => ['paragraph'].includes(it.type)) ?? []
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
        <span className="flex flex-1 flex-col items-center">FILTER</span><span className="flex flex-1 flex-col items-center">SORT</span><span className="flex flex-1 flex-col items-center">DETAILS</span><span className="flex flex-1 flex-col items-center">FAV</span>
      </menu>


      {
        items?.map((item: Record<string, string>) => <ItemList key={item.name} title={item.name} footer={item.categories?.split(',')?.map(tag => <Badge key={tag}>{tag}</Badge>)}>

          <div className="justify-between flex-wrap items-start flex p-4 mb-4 rounded-lg bg-innercard">
            {primaryAttributes.map((attr: AttributeItem) => <PrimaryAttribute key={attr.title} className="max-w-max flex flex-1 flex-col items-center text-base" {...attr} value={item[camelCase(attr.title)]} />)}
          </div>
          {secondaryAttributes.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title} {...attr} value={item[camelCase(attr.title)]} />)}
          {textAttributes.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title} {...attr} value={item[camelCase(attr.title)]} />)}
          {paraghrapf.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title}  {...attr} value={item[camelCase(attr.title)]} hideTitle />)}

          <div className="h-50 inline-flex overflow-x-scroll no-scrollbar scrolling-touch scroll-smooth">

            {
              item.imageLinks?.split('\n')?.filter(Boolean).map((url: string) => <img
                key={url}
                src={url.trim()}
                className="h-48 rounded mr-4"
                alt=""
              />)
            }
          </div>
        </ItemList >)
      }
    </main >
  )
}
