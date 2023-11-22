import { LinkToRelist } from '@/app/LinkToRelist'
import Link from 'next/link'

export default async function Home() {
  return (
    <main className="modals m-auto p-6 bg-gradient-to-b from-gradient-top to-gradient-bottom text-wording-100">
      <div className="max-w-sm m-auto">
        <LinkToRelist />
      </div>
      <div className="mt-10 max-w-sm m-auto">
        <p className="mb-2">Not working? Check that...</p>
        <ul className="list-disc pl-4">
          <li className="mb-2">
            The original spreadsheet was added to the Relist Google worksheet template.
          </li>
          <li className="mb-2">The relist-data sheet of the template is filled in.</li>
          <li className="mb-2">The spreadsheet is set publicly visible.</li>
        </ul>
        <p>
          For more info,{' '}
          <Link href="https://github.com/dbertella/relist">visit the documentation</Link>.
        </p>
      </div>
    </main>
  )
}
