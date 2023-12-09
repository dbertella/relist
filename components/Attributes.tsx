import { cn } from '@/lib/utils'

export const AttributeType = {
  Title: 'title',
  Number: 'number',
  Range: 'range',
  Tags: 'tags',
  Imageurl: 'imageurl',
  Paragraph: 'paragraph',
  Text: 'text',
  Link: 'link',
} as const
export type AttributeType = ValueOf<typeof AttributeType>

export type AttributeItem = {
  title: string
  type: AttributeType
  rename: string
  min: number
  max: number
  showMax: string
  unit: string
  size: string
  showInPreview: 'yes' | 'no'
  value: string | null
  className?: string
}
export const Attribute = ({
  title,
  value,
  rename,
  max,
  showMax,
  unit,
  hideTitle,
}: AttributeItem & { hideTitle?: boolean }) => (
  <>
    {!hideTitle && (
      <span className="column-name mb-1.5 mr-3 text-emphasis text-sm leading-normal">
        {rename || title}
      </span>
    )}
    <span className="text-wording-100 text-sm leading-normal">
      {value}
      {showMax.toLowerCase() === 'yes' && ` / ${max}`} {unit}
    </span>
  </>
)

export const PrimaryAttribute = ({ className, ...props }: AttributeItem) =>
  props.value && (
    <div
      key={props.title}
      className={cn('flex flex-1 flex-col items-center text-base', className)}
    >
      <Attribute {...props} />
    </div>
  )

export const OtherAttribute = ({
  className,
  ...props
}: AttributeItem & { hideTitle?: boolean }) =>
  props.value && (
    <div className={className}>
      <Attribute {...props} />
    </div>
  )
