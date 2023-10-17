import { PageProps } from "../type";
import { getDataFromSheet } from "@/lib/sheets";
import { AttributeItem } from "@/components/Attributes";
import { FilteringForm } from "./FilteringForm";
import { camelCase, groupBy, maxBy, minBy } from "lodash";

const getValueFromRange = (value: string, index: number) => {
    if (!value) {
        return 0
    }
    const values = value.split('-')
    debugger
    return Number(values[values.length === 1 ? 0 : index].trim())
}
const getMinValueInRange = (items: Record<string, string>[], key: string) => {
    const minElement = minBy(items, it => getValueFromRange(it[key], 0))
    return getValueFromRange(minElement![key], 0)
}
const getMaxValueInRange = (items: Record<string, string>[], key: string) => {
    const maxElement = maxBy(items, it => getValueFromRange(it[key], 1))
    return getValueFromRange(maxElement![key], 1)
}

const getMinMaxfromItems = (items: Record<string, string>[], property: AttributeItem) => {
    const key = camelCase(property.title)

    if (property.type === 'range') {
        return {
            min: Number(property.min || getMinValueInRange(items.filter(it => it[key]), key)),
            max: Number(property.max || getMaxValueInRange(items.filter(it => it[key]), key))
        }
    }
    return {
        min: Number(property.min || minBy(items, it => Number(it[key]))?.[key]),
        max: Number(property.max || maxBy(items, it => Number(it[key]))?.[key])
    }
}

export default async function FilterComponent({ params }: PageProps) {
    const [info] = await getDataFromSheet(params.sheetId, 'info')
    const meta = await getDataFromSheet(params.sheetId, info.sheetForListSetup) as AttributeItem[]
    const items = await getDataFromSheet(params.sheetId, info.sheetForListData) as Record<string, string>[]
    const enanchedMeta = meta.map(it => ({ ...it, ...getMinMaxfromItems(items, it) }))
    const attributeMap = groupBy(enanchedMeta, 'type')
    return (
        <main className="max-w-3xl m-auto">
            <FilteringForm numbers={attributeMap.number} ranges={attributeMap.range} texts={attributeMap.text} />
        </main>
    )
}
