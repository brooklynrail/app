import { NextApiRequest, NextApiResponse } from "next"
import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic" // Mark this API as dynamic

// pages/api/refresh.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = await req.body
    console.log("Req body", req.body)
    console.log("Req data", data)
    const { secret, title, slug, url, articlePath, sectionPath, issuePath } = req.body

    // if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    //   // Respond with an unauthorized error if the secret is incorrect
    //   return res.status(401).json({ message: "Unauthorized" })
    // }

    if (!articlePath) {
      // Respond with an error if the articlePath is missing
      return res.status(400).json({ message: "Path is required" })
    }

    try {
      // Perform revalidation logic
      revalidatePath(articlePath)
      return res.json({ message: "Revalidation successful" })
    } catch (error) {
      console.error("Error revalidating:", error)
      return res.status(500).json({ message: "Error revalidating" })
    }
  } else {
    // If not a POST request, return method not allowed
    return res.status(405).json({ message: "Method not allowed" })
  }
}
