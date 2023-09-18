import { ItemList } from '@/components/ItemList'
import { Badge } from '@/components/ui/badge'
import { getDataFromSheet } from '@/lib/sheets'
import { camelCase } from 'lodash'

const SHEET_ID = '1ZyDFUqVNyhiN7I-E2AKytdwv_NrNY6K1Ch-zkFwytCs'

export default async function Home() {
  const [info] = await getDataFromSheet(SHEET_ID, 'info')
  const meta = await getDataFromSheet(SHEET_ID, info.sheetForListSetup)
  const items = await getDataFromSheet(SHEET_ID, info.sheetForListData)
  const primaryAttributes = meta.filter(it => ['number', 'range', 'text'].includes(it.type) && it.inPreview === 'yes')
  const secondaryAttributes = meta.filter(it => ['number', 'range', 'text'].includes(it.type) && it.inPreview === 'no')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3 className="text-right text-slate-400 text-sm font-extrabold font-['Ruda']">A {info.author}&apos;s list</h3>
      <h1 className="text-slate-400 text-2xl font-normal font-['Alfa Slab One'] leading-snug">
        {info.title}</h1>
      <h2 className="text-slate-400 text-sm font-normal font-['Ruda'] leading-snug">
        {info.description}
      </h2>

      {
        items?.map((item: Record<string, string>) => <ItemList key={item.name} title={item.name} description={item.description} footer={item.categories.split(',').map(tag => <Badge key={tag}>{tag}</Badge>)}>

          <div className="h-14 px-7 py-2 justify-between items-start inline-flex">
            {primaryAttributes.map(attr => <div key={attr.title} className="flex flex-1 flex-col items-center text-violet-300 text-base font-extrabold font-[' Ruda']" ><span>{attr.title}</span><span>{item[camelCase(attr.title)]}</span></div>)}
          </div>
          {secondaryAttributes.map(attr => <div key={attr.title}><span>{attr.title}</span>: <span>{item[camelCase(attr.title)]}</span></div>)}

          <div className="h-52 pl-4 justify-end items-center inline-flex">

            {
              item.imageLinks?.split('\n')?.map((url: string) => <img
                key={url}
                src={url.trim()}
                width="300"
                className="w-64 h-48 rounded"
                alt=""
              />)
            }
          </div>
        </ItemList >)
      }
    </main >
  )
}
