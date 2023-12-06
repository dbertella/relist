import { getRelistData } from '@/lib/relistData'
import { groupBy } from 'lodash'
import { P, match } from 'ts-pattern'
import { AttributeItem, AttributeType } from '@/components/Attributes'
import List from '../List'
import { PageProps } from '../type'

export default async function Page({ params }: PageProps) {
  const { meta, items } = await getRelistData(params.sheetId)

  const attributes = groupBy(meta, it =>
    match(it.type)
      .with(P.union('number', 'range'), () => {
        return it.showInPreview === 'yes' ? 'primary' : 'secondary'
      })
      .with('title', () => 'title')
      .with('tags', () => 'tags')
      .with('imageurl', () => 'imageurl')
      .with('paragraph', () => 'paragraph')
      .with('text', () => 'text')
      .with('link', () => 'link')
      .exhaustive(),
  ) as Record<AttributeType | 'primary' | 'secondary', AttributeItem[]>

  return <List items={items} attributes={attributes} shouldShowDetails shouldShowTags />
}
