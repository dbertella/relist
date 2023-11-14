import { PageProps } from '../type'
import { SortingForm } from './SortingForm'
import { getRelistData } from '@/lib/relistData'

export default async function SortComponent({ params }: PageProps) {
  const { meta } = await getRelistData(params.sheetId)

  const attributes =
    meta.filter(it => ['number', 'range', 'text'].includes(it.type)) ?? []
  return (
    <main className="modals max-w-3xl m-auto p-6 bg-gradient-to-b from-gradient-top to-gradient-bottom">
      <SortingForm attributes={attributes} />
    </main>
  )
}
