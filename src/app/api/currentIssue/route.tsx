import { NextApiRequest, NextApiResponse } from "next"
import { Issues } from "../../../../lib/types"
import { getCurrentIssueData } from "../../../../lib/utils"

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const data: Issues = await getCurrentIssueData()

  if (!data) {
    res.status(404).json({ message: "Data not found" })
    return
  }

  res.status(200).json(data)
}
