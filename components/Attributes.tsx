import { cn } from "@/lib/utils"

export type AttributeItem = {
    title: string,
    type: 'text' | 'number' | 'range',
    rename: string,
    min: string,
    max: string,
    showMax: string,
    unit: string,
    size: string,
    inPreview: 'yes' | 'no'
    value: string
}
export const Attribute = ({
    title,
    value,
    rename,
    max,
    showMax,
    unit,
}: AttributeItem) => (
    <>
        <span>{rename || title}</span><span className="mx-2">{value}{showMax === 'yes' && ` / ${max}`} {unit}</span>
    </>
)

export const PrimaryAttribute = ({ className, ...props }: AttributeItem & { className: string }) => <div key={props.title} className={cn("flex flex-1 flex-col items-center text-base", className)}><Attribute {...props} /></div>
