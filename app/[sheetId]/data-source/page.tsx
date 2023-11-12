import { LinkToRelist } from "@/app/LinkToRelist";

export default async function Home() {
  return (
    <main className="max-w-3xl m-auto p-6 bg-gradient-to-b from-gradient-top to-gradient-bottom">
      <div className="">
        <LinkToRelist />
      </div>
      <div>
        <p>Checklist:</p>
        <p>The spreadsheet must be publicly visible.</p>
        <p>
          A copy of the “relist-data“ sheet must be added to the spreadsheet and
          filled in.
        </p>
        <p>Visit the documentation for more info.</p>
      </div>
    </main>
  );
}
