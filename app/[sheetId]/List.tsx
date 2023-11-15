'use client'

import { ItemList } from '@/components/ItemList'
import { Badge } from '@/components/ui/badge'
import { camelCase } from 'lodash'
import {
  AttributeItem,
  AttributeType,
  OtherAttribute,
  PrimaryAttribute,
} from '@/components/Attributes'
import { useSearchParams } from 'next/navigation'
import { orderBy } from 'lodash'
import { SEPARATOR } from '@/lib/constants'
import { RelistItem } from '@/lib/relistData'
import { match, P } from 'ts-pattern'
import { ORDER_QUERY_ITEMS } from './sort/SortingForm'

type Props = {
  items: RelistItem[]
  attributes: Record<AttributeType | 'primary' | 'secondary', AttributeItem[]>
}

const getAttributeValue = (value: string | number | number[]) => {
  return match(value)
    .with(P.array(), val => {
      const min = val[0]
      const max = val.at(-1) ?? min
      return min === max ? `${min}` : `${min} - ${max}`
    })
    .with(P.nullish, () => null)
    .otherwise(() => `${value}`)
}

const useFilterItems = (items: RelistItem[]) => {
  const searchParams = useSearchParams()
  return items.filter(item => {
    const toBeFiltered: boolean[] = []

    searchParams.forEach((value: string, key: string) => {
      if (ORDER_QUERY_ITEMS.includes(key)) {
        return
      }
      const [min, max] = value.split(SEPARATOR).map(it => Number(it))

      const shouldBeShowed = match(item[key])
        .with(P.array(), val => !(val[val.length - 1] < min || val[0] > max))
        .with(P.nullish, () => false)
        .otherwise(val => Number(val) >= min && Number(val) <= max)

      if (!shouldBeShowed) {
        toBeFiltered.push(true)
      }
    })
    return toBeFiltered.length === 0
  })
}

const filterNonNullValues = (
  attr: AttributeItem & { itemValue: string | null },
): attr is AttributeItem & { itemValue: string } => attr.itemValue !== null

const PrimaryBlock = ({
  attributes,
  item,
}: {
  attributes: AttributeItem[]
  item: RelistItem
}) => {
  const values = attributes
    ?.map((attr: AttributeItem) => ({
      ...attr,
      itemValue: getAttributeValue(item[camelCase(attr.title)]),
    }))
    .filter(filterNonNullValues)

  return values?.length > 0 ? (
    <div className="innercard flex justify-between flex-wrap items-start p-4 mb-4 rounded-lg bg-level3">
      {values.map(attribute => (
        <div
          key={attribute.title}
          className="flex flex-1 flex-col items-center text-base"
        >
          <PrimaryAttribute
            key={attribute.itemValue}
            className="max-w-max flex flex-1 flex-col items-center text-base"
            {...attribute}
            value={attribute.itemValue}
          />
        </div>
      ))}
    </div>
  ) : null
}

const ImageBlock = ({
  attributes,
  item,
}: {
  attributes: AttributeItem[]
  item: RelistItem
}) => {
  const values = attributes
    ?.map((attr: AttributeItem) => ({
      ...attr,
      itemValue: getAttributeValue(item[camelCase(attr.title)]),
    }))
    .filter(filterNonNullValues)

  return values?.length > 0
    ? values.map(it => (
        <div
          key={it.title}
          className="gallery-box h-50 inline-flex overflow-x-scroll no-scrollbar scrolling-touch scroll-smooth"
        >
          {it.itemValue
            .split('\n')
            .filter(Boolean)
            .map((url: string, i: number) => (
              <img key={url + i} src={url.trim()} className="h-48 rounded mr-4" alt="" />
            ))}
        </div>
      ))
    : null
}

/* Match full links and relative paths */
const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/

const LinkBlock = ({
  attributes,
  item,
}: {
  attributes: AttributeItem[]
  item: RelistItem
}) => {
  const values = attributes
    ?.map((attr: AttributeItem) => ({
      ...attr,
      itemValue: getAttributeValue(item[camelCase(attr.title)]),
    }))
    .filter(filterNonNullValues)

  return values?.length > 0
    ? values.map(it => {
        const myMatch = it.itemValue.match(regex)

        console.log(myMatch)
        return (
          <div key={it.title} className="text-accent">
            <a href={myMatch?.[2] ?? '#'}>{myMatch?.[1]}</a>
          </div>
        )
      })
    : null
}

export default function List({ items: rawItems, attributes }: Props) {
  const searchParams = useSearchParams()

  const attribute = searchParams.get('orderBy') ?? undefined
  const sort = (searchParams.get('sort') as 'asc' | 'desc') ?? 'asc'

  const items = useFilterItems(rawItems)

  const titleAttrs = attributes[AttributeType.Title]
  const tagsAttrs = attributes[AttributeType.Tags]

  return (
    <>
      {orderBy(items, attribute, [sort])?.map(item => (
        <ItemList
          key={`${item[camelCase(titleAttrs[0].title)]}`}
          title={titleAttrs?.map(attr => item[camelCase(attr.title)]) as string[]}
          footer={tagsAttrs?.flatMap(attr =>
            (item[camelCase(attr.title)] as string)
              ?.split(',')
              ?.map(tag => <Badge key={tag}>{tag}</Badge>),
          )}
        >
          <PrimaryBlock item={item} attributes={attributes.primary} />
          {attributes.secondary?.map(attr => (
            <OtherAttribute
              className="mb-4 text-sm"
              key={attr.title}
              {...attr}
              value={getAttributeValue(item[camelCase(attr.title)])}
            />
          ))}
          {attributes.text.map(attr => (
            <OtherAttribute
              className="mb-4 text-sm"
              key={attr.title}
              {...attr}
              value={getAttributeValue(item[camelCase(attr.title)])}
            />
          ))}
          {attributes.paragraph.map(attr => (
            <OtherAttribute
              className="mb-4 text-sm"
              key={attr.title}
              {...attr}
              value={getAttributeValue(item[camelCase(attr.title)])}
              hideTitle
            />
          ))}

          <ImageBlock attributes={attributes[AttributeType.Imageurl]} item={item} />
          <LinkBlock attributes={attributes[AttributeType.Link]} item={item} />
        </ItemList>
      ))}
    </>
  )
}
