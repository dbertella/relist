import { match, P } from 'ts-pattern'
import { camelCase, mapValues, range, pickBy } from 'lodash'
import { getDataFromSheet } from './sheets'
import { AttributeItem } from '@/components/Attributes'
import { unstable_cache } from 'next/cache'

export type RelistItem = Record<string, string | number | number[]>

export const getRelistData = unstable_cache(
  async (spreadsheetId: string) => {
    const [info] = await getDataFromSheet(spreadsheetId, 'Relist info')
    const meta = await getDataFromSheet(spreadsheetId, 'Relist setup')
    const items = await getDataFromSheet(
      spreadsheetId,
      info.nameOfTheSheetContainingTheData,
    )

    const metaMap = Object.fromEntries(meta.map(it => [camelCase(it.columnName), it]))

    const parsedItems = items.map(it =>
      pickBy(
        mapValues(metaMap, ({ type }, key) => {
          if (!it[key]) return null
          return match(type)
            .with('number', () => Number(it[key]))
            .with('range', () => {
              const [min, max] = it[key]
                .split('-')
                .map(splitted => Number(splitted.trim()))
              return range(min, (max ?? min) + 1)
            })
            .otherwise(() => it[key])
        }),
      ),
    ) as RelistItem[]

    const parsedMeta = meta.map(property => {
      const key = camelCase(property.columnName)
      const range = parsedItems
        .flatMap(it => it[key])
        .filter(Boolean)
        .sort()
      const min = range[0]
      const max = range.at(-1)
      return {
        ...property,
        title: property.columnName,
        ...match(property.type)
          .with(P.union('number', 'range'), () => {
            return {
              min: Number(property.min || min),
              max: Number(property.max || max),
            }
          })

          .otherwise(() => null),
      }
    }) as unknown as AttributeItem[]

    return {
      info,
      meta: parsedMeta,
      items: parsedItems,
    }
  },
  ['full-data'],
  {
    revalidate: 10,
  },
)
