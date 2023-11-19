'use client'

import * as z from 'zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AttributeItem } from '@/components/Attributes'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { useQueryString } from '@/lib/utils'
import { camelCase } from 'lodash'
import { PARAM_KEY } from '@/app/manifest'

const OrderEnum = z.enum(['asc', 'desc'])

export const OrderQueryItem = {
  OrderBy: 'orderBy',
  Sort: 'sort',
}

export const PERSISTED_QUERY_ITEMS = [...Object.values(OrderQueryItem), PARAM_KEY]

type Props = {
  attributes: AttributeItem[]
}

export function SortingForm({ attributes }: Props) {
  const { params, query, searchParams, router, pathname, createQueryString } =
    useQueryString()

  const defaultValue = camelCase(attributes[0].title)

  console.log({ query })

  return (
    <>
      <div className="grid justify-items-end mb-10">
        <Link
          href={{
            pathname: `/${params.sheetId}`,
            query: query || createQueryString(OrderQueryItem.Sort, defaultValue),
          }}
          className="text-action-100 align-self-right"
        >
          Close
        </Link>
      </div>

      <RadioGroup
        onValueChange={value =>
          router.replace(
            pathname + '?' + createQueryString(OrderQueryItem.OrderBy, value),
          )
        }
        defaultValue={searchParams.get(OrderQueryItem.OrderBy) ?? defaultValue}
        className="flex flex-col space-y-2"
      >
        {attributes.map(attribute => (
          <label
            className="cursor-pointer hover:bg-level1-75 flex items-center space-x-3 space-y-0"
            key={attribute.title}
          >
            <RadioGroupItem value={camelCase(attribute.title)} id={attribute.title} />
            <Label className="cursor-pointer" htmlFor={attribute.title}>
              {attribute.rename || attribute.title}
            </Label>
          </label>
        ))}
      </RadioGroup>

      <Separator className="my-4" />

      <RadioGroup
        onValueChange={value =>
          router.replace(pathname + '?' + createQueryString(OrderQueryItem.Sort, value))
        }
        defaultValue={searchParams.get(OrderQueryItem.Sort) ?? OrderEnum.options[0]}
        className="flex flex-col space-y-1"
      >
        {OrderEnum.options.map(it => (
          <label
            className="cursor-pointer hover:bg-level1-75 flex items-center space-x-3 space-y-0"
            key={it}
          >
            <RadioGroupItem value={camelCase(it)} id={it} />
            <Label className="cursor-pointer" htmlFor={it}>
              {it}
            </Label>
          </label>
        ))}
      </RadioGroup>
    </>
  )
}
