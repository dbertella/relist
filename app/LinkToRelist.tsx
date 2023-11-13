'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'
import { useState } from 'react'

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
      <Label htmlFor="create">Create a relist</Label>
      <Textarea
        id="create"
        placeholder="Paste your spreadsheet's URL here"
        value={url}
        onChange={e => setUrl(e.target.value)}
        aria-invalid={sheetId === null}
      />
      {sheetId && (
        <Link href={`/${sheetId}`} className="text-action-100">
          Create & open
        </Link>
      )}
    </div>
  )
}
