import { match } from 'ts-pattern'
import { camelCase, mapValues, maxBy, minBy, range, pickBy } from 'lodash';
import { getDataFromSheet } from './sheets';
import { AttributeItem } from '@/components/Attributes';

export type RelistItem = {
    imageLinks: string,
    categories: string,
    name: string,
    description: string,
} & Record<string, string | number | number[]>

export async function getRelistData(spreadsheetId: string) {
    const [info] = await getDataFromSheet(spreadsheetId, 'info')
    const meta = await getDataFromSheet(spreadsheetId, info.sheetForListSetup)
    const items = await getDataFromSheet(spreadsheetId, info.sheetForListData)

    const metaMap = Object.fromEntries(meta.map(it => [camelCase(it.title), it]))

    const parsedItems = items.map(
        it => pickBy(mapValues(
            metaMap,
            ({ type }, key) => match(type)
                .with('number', () => Number(it[key]))
                .with('range', () => {
                    if (!it[key]) return
                    const [min, max] = it[key].split('-').map(splitted => Number(splitted.trim()))
                    return range(min, (max ?? min) + 1)
                })
                .otherwise(() => it[key])))
    ) as RelistItem[]
    const parsedMeta = meta.map((property) => {
        const key = camelCase(property.title)
        return {
            ...property,
            ...pickBy(match(property.type)
                .with('number', () => {
                    return {
                        min: Number(property.min || minBy(items, key)?.[key]),
                        max: Number(property.max || maxBy(items, key)?.[key])
                    }
                })
                .with('range', () => {
                    return {
                        min: Number(property.min || minBy(items, it => it[key]?.[0])?.[key]),
                        max: Number(property.max || maxBy(items, it => it[key]?.at(-1))?.[key])
                    }
                })
                .otherwise(() => null))

        }
    }) as unknown as AttributeItem[]

    return {
        info,
        meta: parsedMeta,
        items: parsedItems
    };
}