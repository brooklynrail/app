import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Make sure we only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: "Email is required" })
  }

  try {
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const DATACENTER = process.env.MAILCHIMP_API_SERVER

    const data = {
      email_address: email,
      status: "subscribed",
    }

    const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter. Please try again later.`,
      })
    }

    return res.status(201).json({ message: "Successfully subscribed!" })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return res.status(500).json({ error: errorMessage })
  }
}
