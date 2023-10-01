import { getDataFromSheet } from '@/lib/sheets'
import { AttributeItem } from '@/components/Attributes'
import { PageProps } from './type'
import List from './List'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: PageProps) {
    const [info] = await getDataFromSheet(params.sheetId, 'info')
    const meta = await getDataFromSheet(params.sheetId, info.sheetForListSetup) as AttributeItem[]
    const items = await getDataFromSheet(params.sheetId, info.sheetForListData)
    const primaryAttributes = meta.filter(it => ['number', 'range'].includes(it.type) && it.inPreview === 'yes') ?? []
    const secondaryAttributes = meta.filter(it => ['number', 'range'].includes(it.type) && it.inPreview === 'no') ?? []
    const textAttributes = meta.filter(it => ['text'].includes(it.type)) ?? []
    const paragraph = meta.filter(it => ['paragraph'].includes(it.type)) ?? []

    return (
        <List {...{
            items,
            primaryAttributes,
            secondaryAttributes,
            textAttributes,
            paragraph
        }} />


    )
}
