import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query
  const mailchimpUrl = `https://brooklynrail.us1.list-manage.com/subscribe/post?u=dfcd810ee6ea33002746a0f47&id=a44895fefe&EMAIL=${email}`

  try {
    const response = await fetch(mailchimpUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Mailchimp data" })
  }
}
