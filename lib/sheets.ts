import { google } from 'googleapis'
import { camelCase } from 'lodash'

export const getDataFromSheet = async function getDataFromSheet(
  spreadsheetId: string,
  sheetName: string,
): Promise<Record<string, string>[]> {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      `${process.env.GOOGLE_SHEETS_PRIVATE_KEY}`.replace(/\\n/g, '\n'),
      target,
    )
    const sheets = google.sheets({ version: 'v4', auth: jwt })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetName,
    })

    const rows = response.data.values
    if (rows?.length) {
      const header = rows.shift()
      return rows.map(row =>
        Object.fromEntries(row.map((element, i) => [camelCase(header?.[i]), element])),
      )
    }
  } catch (err) {
    console.log(err)
  }
  return []
}
