import { PageProps } from './type'
import List from './List'
import { getRelistData } from '@/lib/relistData'

export default async function Page({ params }: PageProps) {
    const { meta, items } = await getRelistData(params.sheetId)
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
