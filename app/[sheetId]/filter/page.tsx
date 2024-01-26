import { PageProps } from '../type'
import { FilteringForm } from './FilteringForm'
import { groupBy } from 'lodash'
import { getRelistData } from '@/lib/relistData'

export default async function FilterComponent({ params }: PageProps) {
  const { meta } = await getRelistData(params.sheetId)

  const attributeMap = groupBy(meta, 'type')
  return (
    <main className="modals max-w-3xl m-auto p-6 bg-gradient-to-b from-gradient-top to-gradient-bottom">
      <FilteringForm
        numbers={attributeMap.number}
        ranges={attributeMap.range}
      />
    </main>
  )
}
