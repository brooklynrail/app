import { readItem } from "@directus/sdk"
import directus from "../../../lib/directus"
import { getArticle } from "../../../lib/utils"

export default async (req: any, res: any) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  if (!req.query.slug) {
    return res.status(401).json({ message: `Missing slug ${req.query.slug}` })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  // const article = await directus.request(readItem("articles", req.query.slug))
  const article = await getArticle(req.query.slug)

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!article) {
    return res.status(401).json({ message: "Invalid article slug" })
  }

  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true })

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/preview/${article.slug}`)

  return
}
