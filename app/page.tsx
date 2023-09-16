import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

export default function Home() {
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
    </main>
  )
}
