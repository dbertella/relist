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
import { PERSISTED_QUERY_ITEMS } from './sort/SortingForm'
import { filterNonNullValues, getAttributeValue } from '@/lib/utils'
import { ImageBlock } from './ImageGallery'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

type Props = {
  items: RelistItem[]
  attributes: Record<AttributeType | 'primary' | 'secondary', AttributeItem[]>
  shouldShowDetails?: boolean
  shouldShowTags?: boolean
}

const useFilterItems = (items: RelistItem[]) => {
  const searchParams = useSearchParams()
  return items.filter(item => {
    const toBeFiltered: boolean[] = []

    searchParams.forEach((value: string, key: string) => {
      if (PERSISTED_QUERY_ITEMS.includes(key)) {
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
    <div className="innercard flex justify-between flex-wrap items-start p-4 rounded-lg bg-level3">
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

/* Match full links and relative paths */
const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#-]+)\)$/

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
        const url = myMatch?.[2] ?? it.itemValue
        const label = myMatch?.[1] ?? 'Open Link'
        return (
          <div key={it.title} className="link text-action text-sm">
            <a target="_blank" href={url ?? '#'}>
              {label}{' '}
              <svg
                className="h-2 inline ml-1 fill-action-100 stroke-action-100"
                viewBox="0 0 13 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.16667 4.5L0.980505 7.63962L1.92164 4.81622C1.99006 4.61095 1.99006 4.38903 1.92164 4.18376L0.980507 1.36038L5.16667 4.5Z" />
                <path d="M12.1667 4.5L7.9805 7.63962L8.92164 4.81622C8.99006 4.61095 8.99006 4.38903 8.92164 4.18376L7.98051 1.36038L12.1667 4.5Z" />
              </svg>
            </a>
          </div>
        )
      })
    : null
}

const filterItemsInPreview = (attributes: AttributeItem[], shouldShowDetails?: boolean) =>
  attributes?.filter(
    !shouldShowDetails
      ? (attribute: AttributeItem) => attribute.showInPreview === 'yes'
      : () => shouldShowDetails,
  ) ?? []

export default function List({
  items: rawItems,
  attributes,
  shouldShowDetails,
  shouldShowTags,
}: Props) {
  const searchParams = useSearchParams()

  const attribute = searchParams.get('orderBy') ?? undefined
  const sort = (searchParams.get('sort') as 'asc' | 'desc') ?? 'asc'

  const items = useFilterItems(rawItems)

  const titleAttrs = filterItemsInPreview(
    attributes[AttributeType.Title],
    shouldShowDetails,
  )
  const tagsAttrs = filterItemsInPreview(
    attributes[AttributeType.Tags],
    shouldShowDetails,
  )
  const secondaryAttributes = filterItemsInPreview(
    attributes.secondary,
    shouldShowDetails,
  )
  const textAttributes = filterItemsInPreview(attributes.text, shouldShowDetails)
  const paragraphAttributes = filterItemsInPreview(
    attributes.paragraph,
    shouldShowDetails,
  )
  const imageAttributes = filterItemsInPreview(
    attributes[AttributeType.Imageurl],
    shouldShowDetails,
  )
  const linkAttributes = filterItemsInPreview(
    attributes[AttributeType.Link],
    shouldShowDetails,
  )

  const [searchValue, setSearchValue] = useState('')

  const regex = new RegExp(searchValue, 'i')
  const itemsfilterByTextSearch = !searchValue
    ? items
    : items.filter(
        item =>
          titleAttrs.some(attr => regex.test(item[camelCase(attr.title)] as string)) ||
          tagsAttrs.some(attr => regex.test(item[camelCase(attr.title)] as string)) ||
          textAttributes.some(attr =>
            regex.test(item[camelCase(attr.title)] as string),
          ) ||
          paragraphAttributes.some(attr =>
            regex.test(item[camelCase(attr.title)] as string),
          ),
      )

  return (
    <>
      <Input
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        className="mb-5"
        placeholder="Search by name or tag"
      />
      {orderBy(itemsfilterByTextSearch, attribute, [sort])?.map((item, i) => (
        <ItemList
          key={`${item[camelCase(titleAttrs[0]?.title)]}-${i}`}
          title={titleAttrs.map(attr => item[camelCase(attr.title)]) as string[]}
          footer={
            shouldShowTags
              ? tagsAttrs.flatMap(attr =>
                  (item[camelCase(attr.title)] as string)
                    ?.split(',')
                    ?.map(tag => <Badge key={tag}>{tag}</Badge>),
                )
              : null
          }
        >
          <PrimaryBlock item={item} attributes={attributes.primary} />

          {secondaryAttributes.map(attr => (
            <OtherAttribute
              className="text-sm"
              key={attr.title}
              {...attr}
              value={getAttributeValue(item[camelCase(attr.title)])}
            />
          ))}
          {textAttributes.map(attr => (
            <OtherAttribute
              className="text-sm"
              key={attr.title}
              {...attr}
              value={getAttributeValue(item[camelCase(attr.title)])}
            />
          ))}
          {paragraphAttributes.map(attr => (
            <OtherAttribute
              className="text-sm"
              key={attr.title}
              {...attr}
              value={getAttributeValue(item[camelCase(attr.title)])}
              hideTitle
            />
          ))}

          <ImageBlock attributes={imageAttributes} item={item} />
          <LinkBlock attributes={linkAttributes} item={item} />
        </ItemList>
      ))}
    </>
  )
}
