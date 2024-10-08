import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const baseID = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME
  const apiKey = process.env.AIRTABLE_API_KEY

  if (!baseID || !tableName || !apiKey) {
    return NextResponse.json({ error: "Missing required environment variables" }, { status: 400 })
  }

  // https://api.airtable.com/v0/appvW1Ad2kMh1S1T1/tbl9k6L9O6PrTtWDc?view=2024
  const url = `https://api.airtable.com/v0/${baseID}/${tableName}?view=2024`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
