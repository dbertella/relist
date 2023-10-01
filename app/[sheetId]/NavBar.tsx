'use client'

import { useQueryString } from "@/lib/utils"
import { Toggle } from "@radix-ui/react-toggle"
import Link from "next/link"

export const NavBar = () => {
    const { params, query, pathname } = useQueryString()

    return <menu className="m-4 justify-between items-start flex text-white">
        <Link href={`/${params.sheetId}/filter?${query}`}><Toggle pressed={pathname === `/${params.sheetId}/filter`}>FILTER</Toggle></Link>
        <Link href={`/${params.sheetId}/sort?${query}`}><Toggle pressed={pathname === `/${params.sheetId}/sort`}>SORT</Toggle></Link>
        <Toggle>DETAILS</Toggle>
        <Toggle>FAV</Toggle>
    </menu>
}