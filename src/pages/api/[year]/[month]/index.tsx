import type { NextApiRequest, NextApiResponse } from "next"
import { getIssueBasics } from "../../../../../lib/utils"

// pages/api/[year]/[month].js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req

  if (!query || !query.year || !query.month) {
    return res.status(400).json({ errorCode: 400, errorMessage: "This issue does not exist" })
  }

  const year = Number(query.year)
  const month = Number(query.month)

  const issueBasics = await getIssueBasics({ year: year, month: month, slug: undefined })

  // You can now use `year` and `month` to fetch data, perform calculations, or return a response
  res.status(200).json(issueBasics)
}
