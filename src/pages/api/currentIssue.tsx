import type { NextApiRequest, NextApiResponse } from "next"
import { GlobalSettings, Issues } from "../../../lib/types"
import directus from "../../../lib/directus"
import { readSingleton } from "@directus/sdk"

// pages/api/issues.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the Current issue
  // This is set in the Global Settings in the Studio
  const settings: GlobalSettings = await directus.request(
    readSingleton("global_settings", {
      deep: {
        fields: [
          {
            current_issue: ["id", "title", "slug", "year", "month", "status"],
          },
        ],
      },
    }),
  )

  const currentIssue: Issues = settings.current_issue

  if (!currentIssue) {
    return res.status(400).json({ errorCode: 400, errorMessage: "The current issue is not set." })
  }

  res.status(200).json(currentIssue)
}
