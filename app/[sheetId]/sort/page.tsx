import Link from "next/link";
import { PageProps } from "../type";
import { getDataFromSheet } from "@/lib/sheets";
import { AttributeItem } from "@/components/Attributes";
import { SortingForm } from "./SortingForm";

export default async function SortComponent({ params }: PageProps) {
    const [info] = await getDataFromSheet(params.sheetId, 'info')
    const meta = await getDataFromSheet(params.sheetId, info.sheetForListSetup) as AttributeItem[]
    const attributes = meta.filter(it => ['number', 'range', 'text'].includes(it.type)) ?? []
    return (
        <main className="max-w-3xl m-auto">
            <SortingForm attributes={attributes} />
        </main>
    )
}
