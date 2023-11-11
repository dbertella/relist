import { type ClassValue, clsx } from "clsx"
import { useRouter, useParams, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { twMerge } from "tailwind-merge"

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
    [searchParams]
  )

  return {
    router,
    params,
    pathname,
    searchParams,
    query: searchParams.toString(),
    createQueryString
  }
}