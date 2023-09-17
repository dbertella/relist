import { ItemList } from '@/components/ItemList'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { getDataFromSheet } from '@/lib/sheets'

const SHEET_ID = '1ZyDFUqVNyhiN7I-E2AKytdwv_NrNY6K1Ch-zkFwytCs'

export default async function Home() {
  const sheetData = await getDataFromSheet(SHEET_ID, 'data')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3>A Daniele’s list</h3>
      <h1>
        Board games I own.</h1>
      <h2>
        The full list of games on my shelves. I used to have more but my dog ate them, I swear.
      </h2>
      <Slider defaultValue={[33, 66]} max={100} step={1} minStepsBetweenThumbs={1} />
      <Button>Click me</Button>

      {
        sheetData?.map((item: Record<string, string>) => <ItemList key={item.name} title={item.name} description={item.description} footer={item.categories}>
          <div>Rating: {item.rating}</div>
          <div>Players: {item.players}</div>
          <div>Playtime: {item.playtime}</div>
          <div>Weight: {item.weight}</div>
          {item.imageLinks?.split('\n')?.map((url: string) => <img
            key={url}
            src={url.trim()}
            alt=""
          />)}
        </ItemList>)
      }
    </main >
  )
}
