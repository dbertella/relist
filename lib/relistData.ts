import { match, P } from 'ts-pattern'
import { camelCase, mapValues, maxBy, minBy, range, pickBy } from 'lodash';
import { getDataFromSheet } from './sheets';
import { AttributeItem } from '@/components/Attributes';
import { unstable_cache } from 'next/cache';

export type RelistItem = Record<string, string | number | number[]>

export const getRelistData = unstable_cache(async (spreadsheetId: string) => {
    const [info] = await getDataFromSheet(spreadsheetId, 'info')
    const meta = await getDataFromSheet(spreadsheetId, info.sheetForListSetup)
    const items = await getDataFromSheet(spreadsheetId, info.sheetForListData)

    const metaMap = Object.fromEntries(meta.map(it => [camelCase(it.title), it]))

    const parsedItems = items.map(
        it => pickBy(mapValues(
            metaMap,
            ({ type }, key) => {
                if (!it[key]) return null
                return match(type)
                    .with('number', () => Number(it[key]))
                    .with('range', () => {
                        const [min, max] = it[key].split('-').map(splitted => Number(splitted.trim()))
                        return range(min, (max ?? min) + 1)
                    })
                    .otherwise(() => it[key])
            }))
    ) as RelistItem[]

    const parsedMeta = meta.map((property) => {
        const key = camelCase(property.title)
        const range = parsedItems.flatMap(it => it[key]).filter(Boolean).sort()
        const min = range[0]
        const max = range.at(-1)
        return {
            ...property,
            ...match(property.type)
                .with(P.union('number', 'range'), () => {
                    return {
                        min: Number(property.min || min),
                        max: Number(property.max || max)
                    }
                })

                .otherwise(() => null)

        }
    }) as unknown as AttributeItem[]

    return {
        info,
        meta: parsedMeta,
        items: parsedItems
    };
})