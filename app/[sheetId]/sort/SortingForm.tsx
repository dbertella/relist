'use client'

import * as z from 'zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AttributeItem } from '@/components/Attributes'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { useQueryString } from '@/lib/utils'
import { camelCase } from 'lodash'

const OrderEnum = z.enum(['asc', 'desc'])

export const OrderQueryItem = {
  OrderBy: 'orderBy',
  Sort: 'sort',
}

export const ORDER_QUERY_ITEMS = Object.values(OrderQueryItem)

type Props = {
  attributes: AttributeItem[]
}

export function SortingForm({ attributes }: Props) {
  const { params, searchParams, router, pathname, createQueryString } = useQueryString()

  return (
    <>
      <div className="grid justify-items-end my-2">
        <Link
          href={{
            pathname: `/${params.sheetId}`,
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
        defaultValue={
          searchParams.get(OrderQueryItem.OrderBy) ?? camelCase(attributes[0].title)
        }
        className="flex flex-col space-y-2"
      >
        {attributes.map(attribute => (
          <label className="flex items-center space-x-3 space-y-0" key={attribute.title}>
            <RadioGroupItem value={camelCase(attribute.title)} id={attribute.title} />
            <Label htmlFor={attribute.title}>{attribute.rename || attribute.title}</Label>
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
          <div className="flex items-center space-x-3 space-y-0" key={it}>
            <RadioGroupItem value={camelCase(it)} id={it} />
            <Label htmlFor={it}>{it}</Label>
          </div>
        ))}
      </RadioGroup>
    </>
  )
}
