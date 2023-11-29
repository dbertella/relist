import { AttributeItem } from '@/components/Attributes'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

import { RelistItem } from '@/lib/relistData'
import { filterNonNullValues, getAttributeValue } from '@/lib/utils'
import { camelCase } from 'lodash'
import { Fragment, useState } from 'react'

const ImageList = ({ title, itemValue }: AttributeItem & { itemValue: string }) => {
  const [imgUrl, setUrl] = useState<string>('')

  const images = itemValue
    .split('\n')
    .filter(Boolean)
    .map((url: string) => url.trim())

  const findNext = () => (images.indexOf(imgUrl) + 1) % images.length
  const findPrev = () => (images.indexOf(imgUrl) - 1 + images.length) % images.length
  return (
    <div
      key={title}
      className="gallery-box pb-1 h-50 inline-flex overflow-x-scroll no-scrollbar scrolling-touch scroll-smooth"
    >
      {images.map((url: string, i: number) => (
        <Fragment key={url + i}>
          <DialogTrigger asChild onClick={() => setUrl(url)}>
            <img src={url} className="h-48 rounded mr-4" alt="" />
          </DialogTrigger>
          <DialogContent>
            {images.length > 1 && (
              <DialogHeader>
                <div className="max-w-2xl mx-auto mb-6">
                  <Button
                    className="px-6 mx-6"
                    variant="link"
                    onClick={() => setUrl(images[findPrev()])}
                  >
                    Prev
                  </Button>
                  <Button
                    className="px-6 mx-6"
                    variant="link"
                    onClick={() => setUrl(images[findNext()])}
                  >
                    Next
                  </Button>
                </div>
              </DialogHeader>
            )}
            <div className="image-container w-fit m-auto overflow-y-scroll">
              <DialogDescription>
                <img src={imgUrl} className="h-full" alt="" />
              </DialogDescription>
            </div>
          </DialogContent>
        </Fragment>
      ))}
    </div>
  )
}

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

  return values?.length > 0 ? (
    <Dialog>
      {values.map(it => (
        <ImageList {...it} key={it.title} />
      ))}
    </Dialog>
  ) : null
}
