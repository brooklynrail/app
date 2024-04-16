import { NextApiRequest, NextApiResponse } from "next"
import { getRailIssueApi } from "../../../lib/utils"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const year = Number(req.query.year)
  const month = Number(req.query.month)

  const data = await getRailIssueApi(year.toString(), month.toString())

  // Set Cache-Control header
  // This will cache the response for 1 hour
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=60")

  res.status(200).json(data)
}
