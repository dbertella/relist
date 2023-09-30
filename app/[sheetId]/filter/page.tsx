import Link from "next/link";
import { PageProps } from "../type";

export default async function FilterComponent({ params }: PageProps) {
    return (
        <main className="max-w-3xl m-auto">
            Reset filters
            <Link href={`/${params.sheetId}`}>Cancel</Link>
        </main>
    )
}
