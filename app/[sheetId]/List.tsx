"use client"

import { ItemList } from '@/components/ItemList'
import { Badge } from '@/components/ui/badge'
import { camelCase } from 'lodash'
import { AttributeItem, OtherAttribute, PrimaryAttribute } from '@/components/Attributes'
import { useSearchParams } from 'next/navigation'
import { orderBy } from 'lodash'
import { SEPARATOR } from '@/lib/constants'
import { RelistItem } from '@/lib/relistData'

type Props = {
    items: RelistItem[]
    primaryAttributes: AttributeItem[]
    secondaryAttributes: AttributeItem[]
    textAttributes: AttributeItem[]
    paragraph: AttributeItem[]
}


const getAttributeValue = (value: string | number | number[]) => {
    if (Array.isArray(value)) {
        const min = value[0]
        const max = value.at(-1) ?? min
        return min === max ? `${min}` : `${min} - ${max}`
    }
    return `${value}`
}

export default function List({
    items: rawItems,
    primaryAttributes,
    secondaryAttributes,
    textAttributes,
    paragraph
}: Props) {
    const searchParams = useSearchParams()

    const attribute = searchParams.get('orderBy') ?? undefined
    const sort = searchParams.get('sort') as "asc" | "desc" ?? 'asc'

    const items = rawItems.filter(
        item => {
            const isInvalid: boolean[] = []
            searchParams.forEach((value: string, key: string) => {
                if (['orderBy', 'sort'].includes(key)) { return }
                const [min, max] = value.split(SEPARATOR)
                if (Number(item[key]) < Number(min) && Number(item[key]) > Number(max)) {
                    isInvalid.push(true)
                }
            })
            return isInvalid.length === 0
        }

    )

    return (
        <>
            {
                orderBy(items, attribute, [sort])?.map((item) => <ItemList key={item.name} title={item.name} footer={item.categories?.split(',')?.map(tag => <Badge key={tag}>{tag}</Badge>)}>

                    {primaryAttributes.length > 0 && <div className="justify-between flex-wrap items-start flex p-4 mb-4 rounded-lg bg-innercard">
                        {primaryAttributes.map((attr: AttributeItem) => <PrimaryAttribute key={attr.title} className="max-w-max flex flex-1 flex-col items-center text-base" {...attr} value={getAttributeValue(item[camelCase(attr.title)])} />)}
                    </div>}
                    {secondaryAttributes.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title} {...attr} value={getAttributeValue(item[camelCase(attr.title)])} />)}
                    {textAttributes.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title} {...attr} value={`${item[camelCase(attr.title)]}`} />)}
                    {paragraph.map(attr => <OtherAttribute className="mb-4 text-sm" key={attr.title}  {...attr} value={`${item[camelCase(attr.title)]}`} hideTitle />)}

                    {item.imageLinks && <div className="h-50 inline-flex overflow-x-scroll no-scrollbar scrolling-touch scroll-smooth">
                        {
                            item.imageLinks.split('\n').filter(Boolean).map((url: string, i: number) => <img
                                key={url + i}
                                src={url.trim()}
                                className="h-48 rounded mr-4"
                                alt=""
                            />)
                        }
                    </div>}
                </ItemList >)
            }
        </>
    )
}
