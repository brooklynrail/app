import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allowedOrigins = ["https://brooklynrail.org", "https://your-vercel-preview-url.vercel.app"]
  const origin = req.headers.origin || ""

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }

  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  )
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

  if (req.method === "OPTIONS") {
    return res.status(200).end() // Handle preflight OPTIONS request
  }

  // Handle actual requests here...
  res.status(200).json({ message: "This is a response from the API." })
}
