import type { NextApiRequest, NextApiResponse } from "next"
import directus from "../../../lib/directus"
import { readItems } from "@directus/sdk"
import { Sections } from "../../../lib/types"

// pages/api/issuesList.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.issue) {
    res.status(400).json({ errorCode: 400, errorMessage: "This issue does not exist" })
    return
  }

  const sections: Sections[] = await directus.request(
    readItems("sections", {
      deep: {
        fields: ["id", "name", "slug"],
        articles: [
          {
            articles_slug: [
              {
                issues: { issues_id: { id: { _eq: req.query.issue } } },
              },
            ],
          },
        ],
      },
    }),
  )

  // You can now use `year` and `month` to fetch data, perform calculations, or return a response
  res.status(200).json(sections)
}
