import { PageProps } from "../type";
import { FilteringForm } from "./FilteringForm";
import { groupBy } from "lodash";
import { getRelistData } from "@/lib/relistData";

export default async function FilterComponent({ params }: PageProps) {
    const { meta } = await getRelistData(params.sheetId)

    const attributeMap = groupBy(meta, 'type')
    return (
        <main className="max-w-3xl m-auto">
            <FilteringForm numbers={attributeMap.number} ranges={attributeMap.range} texts={attributeMap.text} />
        </main>
    )
}
