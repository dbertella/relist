import { AttributeItem } from '@/components/Attributes'
import { type ClassValue, clsx } from 'clsx'
import { useRouter, useParams, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { P, match } from 'ts-pattern'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useQueryString() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return {
    router,
    params,
    pathname,
    searchParams,
    query: searchParams.toString(),
    createQueryString,
  }
}

export const getAttributeValue = (value: string | number | number[]) => {
  return match(value)
    .with(P.array(), val => {
      const min = val[0]
      const max = val.at(-1) ?? min
      return min === max ? `${min}` : `${min} - ${max}`
    })
    .with(P.nullish, () => null)
    .otherwise(() => `${value}`)
}

export const filterNonNullValues = (
  attr: AttributeItem & { itemValue: string | null },
): attr is AttributeItem & { itemValue: string } => attr.itemValue !== null
