import type { NextApiRequest, NextApiResponse } from "next"
import { getIssueBasics } from "../../../../../lib/utils"
import { parse } from "url"

// pages/api/[year]/[month].js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req || !req.url) {
    return res.status(400).json({ errorCode: 400, errorMessage: "This issue does not exist" })
  }
  const { pathname } = parse(req.url, true)
  if (!pathname) {
    return res.status(400).json({ errorCode: 400, errorMessage: "This issue does not exist" })
  }
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length < 3) {
    return res.status(400).json({ errorCode: 400, errorMessage: "This issue does not exist" })
  }

  const year = Number(segments[1])
  const month = Number(segments[2])

  const issueBasics = await getIssueBasics({ year: year, month: month })

  // You can now use `year` and `month` to fetch data, perform calculations, or return a response
  res.status(200).json(issueBasics)
}
