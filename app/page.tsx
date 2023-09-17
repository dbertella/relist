import { ItemList } from '@/components/ItemList'
import { Card, CardContent } from '@/components/ui/card'
import { getDataFromSheet } from '@/lib/sheets'
import { camelCase } from 'lodash'

const SHEET_ID = '1ZyDFUqVNyhiN7I-E2AKytdwv_NrNY6K1Ch-zkFwytCs'

export default async function Home() {
  const [info] = await getDataFromSheet(SHEET_ID, 'info')
  const meta = await getDataFromSheet(SHEET_ID, info.sheetForListSetup)
  const items = await getDataFromSheet(SHEET_ID, info.sheetForListData)
  const primaryAttributes = meta.filter(it => ['number', 'range'].includes(it.type) && it.preview)
  const secondaryAttributes = meta.filter(it => ['number', 'range'].includes(it.type) && !it.preview)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3>A {info.author}'s list</h3>
      <h1>
        {info.title}</h1>
      <h2>
        {info.description}
      </h2>
      {
        items?.map((item: Record<string, string>) => <ItemList key={item.name} title={item.name} description={item.description} footer={item.categories}>

          <Card>
            <CardContent>
              <div className='flex'>

                {primaryAttributes.map(attr => <div key={attr.title} className='flex flex-1 flex-col items-center'><span>{attr.title}</span><span>{item[camelCase(attr.title)]}</span></div>)}
              </div>
            </CardContent>
          </Card>
          {secondaryAttributes.map(attr => <div key={attr.title}><span>{attr.title}</span>: <span>{item[camelCase(attr.title)]}</span></div>)}

          {item.imageLinks?.split('\n')?.map((url: string) => <img
            key={url}
            src={url.trim()}
            width="300"
            className='rounded mb-4'
            alt=""
          />)}
        </ItemList>)
      }
    </main >
  )
}
