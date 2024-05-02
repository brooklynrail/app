import type { NextApiRequest, NextApiResponse } from "next"
import { getAllIssues } from "../../../lib/utils"

// pages/api/issues.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allIssues = await getAllIssues()

  if (!allIssues) {
    return res.status(400).json({ errorCode: 400, errorMessage: "Oddly, there are no issues getting returned." })
  }

  // You can now use `year` and `month` to fetch data, perform calculations, or return a response
  res.status(200).json(allIssues)
}
