import { PageProps } from "../type";
import { SortingForm } from "./SortingForm";
import { getRelistData } from "@/lib/relistData";

export default async function SortComponent({ params }: PageProps) {
    const { meta } = await getRelistData(params.sheetId)

    const attributes = meta.filter(it => ['number', 'range', 'text'].includes(it.type)) ?? []
    return (
        <main className="max-w-3xl m-auto">
            <SortingForm attributes={attributes} />
        </main>
    )
}
