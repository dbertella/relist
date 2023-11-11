"use client"

import { AttributeItem } from "@/components/Attributes"
import Link from "next/link"
import { useQueryString } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { SEPARATOR } from "@/lib/constants"
import { camelCase } from "lodash"


type Props = {
    numbers: AttributeItem[]
    ranges: AttributeItem[]
    texts: AttributeItem[]
}

export function FilteringForm({ numbers = [], ranges = [], texts = [] }: Props) {
    const { params, searchParams, query, router, pathname, createQueryString } = useQueryString()
    return (
        <>
            <div className="flex justify-between">
                <Link href={{
                    pathname: `/${params.sheetId}`,
                }} className="text-primary-foreground align-self-right">Reset Filters</Link>
                <Link href={{
                    pathname: `/${params.sheetId}`,
                    query: query
                }} className="text-primary-foreground align-self-right">Close</Link>
            </div>
            {[...numbers, ...ranges].map(attribute => <div key={attribute.title} className="mb-4">
                <div className="flex justify-between">
                    <div>{attribute.min}</div>
                    <div>{attribute.rename || attribute.title}</div>
                    <div>{attribute.max}</div>
                </div>
                <Slider
                    min={attribute.min}
                    max={attribute.max}
                    defaultValue={searchParams.get(camelCase(attribute.title))?.split(SEPARATOR).map(it => Number(it)) || [attribute.min, attribute.max]}
                    step={1}
                    onValueChange={(value) => router.replace(pathname + '?' + createQueryString(camelCase(attribute.title), value.join(SEPARATOR)))}
                />
            </div>)}
        </>
    )
}