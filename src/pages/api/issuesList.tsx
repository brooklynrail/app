import type { NextApiRequest, NextApiResponse } from "next"
import directus from "../../../lib/directus"
import { readItems } from "@directus/sdk"

// pages/api/issuesList.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req

  if (!query) {
    return res.status(400).json({ errorCode: 400, errorMessage: "This issue does not exist" })
  }

  const issues = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "special_issue"],
      filter: {
        _and: [{ special_issue: { _eq: false } }],
      },
    }),
  )

  // You can now use `year` and `month` to fetch data, perform calculations, or return a response
  res.status(200).json(issues)
}
