import { LinkToRelist } from './LinkToRelist'

export default async function Home() {
  return (
    <main className="max-w-md m-auto px-4 leading-normal">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <LinkToRelist />
      </div>
      <div>
        <p>Checklist:</p>
        <p>The spreadsheet must be publicly visible.</p>
        <p>
          A copy of the “relist-data“ sheet must be added to the spreadsheet and filled
          in.
        </p>
        <p>Visit the documentation for more info.</p>
      </div>
    </main>
  )
}
