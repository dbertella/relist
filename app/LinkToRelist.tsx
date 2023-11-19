'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'
import { useState } from 'react'
import { H1, H2, H3 } from '@/components/ui/typography'
import { Alfa_Slab_One } from 'next/font/google'

const alfa_slab_one = Alfa_Slab_One({ weight: '400', subsets: ['latin'] })

// https://docs.google.com/spreadsheets/d/1ZyDFUqVNyhiN7I-E2AKytdwv_NrNY6K1Ch-zkFwytCs/edit#gid=156674292
const getIdFromLinkOrNull = (link: string): string | null => {
  try {
    const url = new URL(link)
    if (['http:', 'https:'].includes(url.protocol)) {
      // eg: ['', spreadsheets, d, sheetId]
      const segments = url.pathname.split('/')
      return segments[3]
    }
    return null
  } catch (_) {
    return null
  }
}

export function LinkToRelist() {
  const [url, setUrl] = useState('')
  const sheetId = getIdFromLinkOrNull(url)
  return (
    <div className="grid w-full gap-2">
      <div className={alfa_slab_one.className}>
        <H1>Relist</H1>
      </div>
      <p className="mb-2">
        To generate a new Relist, paste the URL of your Google spreadsheet in the
        following textarea.
      </p>
      <Textarea
        id="create"
        placeholder="https://docs.google.com/spreadsheets/d/1Z..."
        value={url}
        onChange={e => setUrl(e.target.value)}
        aria-invalid={sheetId === null}
        className="mb-2 p-4 h-32 text-ink-100 rounded"
      />
      {sheetId && (
        <Link href={`/${sheetId}`} className="text-action-100">
          Create & open
        </Link>
      )}
    </div>
  )
}
