import { ItemList } from '@/components/ItemList'
import { Badge } from '@/components/ui/badge'
import { H1, H2, H3 } from '@/components/ui/typography'
import { getDataFromSheet } from '@/lib/sheets'
import { camelCase } from 'lodash'
import { Card } from '@/components/ui/card'
import { AttributeItem, OtherAttribute, PrimaryAttribute } from '@/components/Attributes'
import { Alfa_Slab_One } from 'next/font/google'
const alfa_slab_one = Alfa_Slab_One({ weight:'400', subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { sheetId: string } }) {
    const [info] = await getDataFromSheet(params.sheetId, 'info')
    const meta = await getDataFromSheet(params.sheetId, info.sheetForListSetup) as AttributeItem[]
    const items = await getDataFromSheet(params.sheetId, info.sheetForListData)
    const primaryAttributes = meta.filter(it => ['number', 'range'].includes(it.type) && it.inPreview === 'yes') ?? []
    const secondaryAttributes = meta.filter(it => ['number', 'range'].includes(it.type) && it.inPreview === 'no') ?? []
    const textAttributes = meta.filter(it => ['text'].includes(it.type)) ?? []
    const paraghraph = meta.filter(it => ['paragraph'].includes(it.type)) ?? []
    return (
        <main className="max-w-md m-auto px-4 leading-normal">
          <Card className="py-4 px-1 border-none rounded-none bg-level2">
            <H3>
              A {info.author}&apos;s list
            </H3>
            <div className={alfa_slab_one.className}>
              <H1>
              {info.title}
              </H1>
            </div>
            <H2>
              {info.description}
            </H2>
          </Card>
    
          <menu className="m-4 justify-between items-start flex text-white-100">
            <span className="flex flex-1 flex-col items-center">FILTER</span><span className="flex flex-1 flex-col items-center">SORT</span><span className="flex flex-1 flex-col items-center">DETAILS</span><span className="flex flex-1 flex-col items-center">FAV</span>
          </menu>
    
    
          {
            items?.map((item: Record<string, string>) => <ItemList key={item.name} title={item.name} footer={item.categories?.split(',')?.map(tag => <Badge key={tag}>{tag}</Badge>)}>
    
    
              {primaryAttributes.length > 0 && <div className="flex justify-between flex-wrap items-start p-4 mb-4 rounded-lg bg-white-5">
                  {primaryAttributes.map((attr: AttributeItem) => <div className="flex flex-1 flex-col items-center text-base"> <PrimaryAttribute key={attr.title} className="text-wording" {...attr} value={item[camelCase(attr.title)]} /> </div>)}
              </div>}
    
              {secondaryAttributes.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title} {...attr} value={item[camelCase(attr.title)]} />)}
              {textAttributes.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title} {...attr} value={item[camelCase(attr.title)]} />)}
              {paraghraph.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title}  {...attr} value={item[camelCase(attr.title)]} hideTitle />)}
              {item.imageLinks && <div className="h-50 inline-flex overflow-x-scroll no-scrollbar scrolling-touch scroll-smooth">
                {
                  item.imageLinks.split('\n').filter(Boolean).map((url: string) => <img
                    key={url}
                    src={url.trim()}
                    className="h-48 rounded mr-4"
                    alt=""
                  />)
                }
    
              </div>}
            </ItemList >)
          }
        </main >
      )
    }
