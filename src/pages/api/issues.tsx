import type { NextApiRequest, NextApiResponse } from "next"
import directus from "../../../lib/directus"
import { readItems } from "@directus/sdk"

// pages/api/issues.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const issues = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "id", "slug", "title", "special_issue", "issue_number"],
      filter: {
        _and: [{ special_issue: { _eq: false }, status: { _eq: "published" } }],
      },
    }),
  )

  if (!issues) {
    return res.status(400).json({ errorCode: 400, errorMessage: "Oddly, there are no issues getting returned." })
  }

  // You can now use `year` and `month` to fetch data, perform calculations, or return a response
  res.status(200).json(issues)
}
