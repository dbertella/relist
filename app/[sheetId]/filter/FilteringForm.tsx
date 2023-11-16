'use client'

import { AttributeItem } from '@/components/Attributes'
import Link from 'next/link'
import { useQueryString } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'
import { SEPARATOR } from '@/lib/constants'
import { camelCase } from 'lodash'
import { PERSISTED_QUERY_ITEMS } from '../sort/SortingForm'
import { useState } from 'react'

type Props = {
  numbers: AttributeItem[]
  ranges: AttributeItem[]
  texts: AttributeItem[]
}

const FilterItem = ({ attribute }: { attribute: AttributeItem }) => {
  const { searchParams, router, pathname, createQueryString } = useQueryString()

  const [value, setValue] = useState<number[]>(
    searchParams
      .get(camelCase(attribute.title))
      ?.split(SEPARATOR)
      .map(it => Number(it)) || [attribute.min, attribute.max],
  )

  return (
    <div key={attribute.title} className="mb-10">
      <div className="mb-2 flex justify-between text-wording-100">
        <div>{value[0]}</div>
        <div>{attribute.rename || attribute.title}</div>
        <div>{value.at(-1)}</div>
      </div>
      <Slider
        min={attribute.min}
        max={attribute.max}
        defaultValue={value}
        step={1}
        onValueChange={newValue => {
          setValue(newValue)
          router.replace(
            pathname +
              '?' +
              createQueryString(camelCase(attribute.title), newValue.join(SEPARATOR)),
          )
        }}
      />
    </div>
  )
}

export function FilteringForm({ numbers = [], ranges = [], texts = [] }: Props) {
  const { params, searchParams, query } = useQueryString()

  const persistentParams = Array.from(searchParams.entries()).filter(it =>
    PERSISTED_QUERY_ITEMS.includes(it[0]),
  )

  return (
    <>
      <div className="flex justify-between mb-10">
        <Link
          href={{
            pathname: `/${params.sheetId}`,
            query: new URLSearchParams(persistentParams).toString(),
          }}
          className="text-action-100 align-self-right"
        >
          Reset Filters
        </Link>
        <Link
          href={{
            pathname: `/${params.sheetId}`,
            query: query,
          }}
          className="text-action-100 align-self-right"
        >
          Close
        </Link>
      </div>
      {[...numbers, ...ranges].map(attribute => (
        <FilterItem key={attribute.title} attribute={attribute} />
      ))}
    </>
  )
}
