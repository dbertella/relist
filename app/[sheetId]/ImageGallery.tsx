import { AttributeItem } from '@/components/Attributes'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RelistItem } from '@/lib/relistData'
import { filterNonNullValues, getAttributeValue } from '@/lib/utils'
import { camelCase } from 'lodash'
import { useState } from 'react'

// export const ImageBlock = ({
//   attributes,
//   item,
// }: {
//   attributes: AttributeItem[]
//   item: RelistItem
// }) => {
//   const values = attributes
//     ?.map((attr: AttributeItem) => ({
//       ...attr,
//       itemValue: getAttributeValue(item[camelCase(attr.title)]),
//     }))
//     .filter(filterNonNullValues)

//   const [imgUrl, setUrl] = useState<string>('')

//   return values?.length > 0
//     ? values.map(it => (
//         <Dialog>
//           <div
//             key={it.title}
//             className="gallery-box h-50  inline-flex overflow-x-scroll no-scrollbar scrolling-touch scroll-smooth"
//           >
//             {it.itemValue
//               .split('\n')
//               .filter(Boolean)
//               .map((url: string, i: number) => (
//                 <div key={url + i}>
//                   <DialogTrigger onClick={() => setUrl(url.trim())}>
//                     <img src={url.trim()} className="h-48 rounded mr-4" alt="" />
//                   </DialogTrigger>
//                 </div>
//               ))}
//             <DialogContent>
//               <DialogDescription>
//                 <img src={imgUrl} className="h-full rounded mr-4" alt="" />
//               </DialogDescription>
//             </DialogContent>
//           </div>
//         </Dialog>
//       ))
//     : null
// }

export const ImageBlock = ({
  attributes,
  item,
}: {
  attributes: AttributeItem[]
  item: RelistItem
}) => {
  const values = attributes
    ?.map((attr: AttributeItem) => ({
      ...attr,
      itemValue: getAttributeValue(item[camelCase(attr.title)]),
    }))
    .filter(filterNonNullValues)
  const [imgUrl, setUrl] = useState<string>('')

  return values?.length > 0 ? (
    <Dialog>
      {values.map(it => (
        <div
          key={it.title}
          className="gallery-box pb-1 h-50 inline-flex overflow-x-scroll no-scrollbar scrolling-touch scroll-smooth"
        >
          {it.itemValue
            .split('\n')
            .filter(Boolean)
            .map((url: string, i: number) => (
              <DialogTrigger asChild key={url + i} onClick={() => setUrl(url.trim())}>
                <img src={url.trim()} className="h-48 rounded mr-4" alt="" />
              </DialogTrigger>
            ))}
        </div>
      ))}
      <DialogContent>
        <DialogDescription>
          <img src={imgUrl} className="h-full rounded mr-4" alt="" />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  ) : null
}
