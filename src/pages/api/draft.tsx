import { getArticle } from "../../../lib/utils"

const draftHandler = async (req: any, res: any) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  if (!req.query.slug) {
    return res.status(401).json({ message: `Missing slug` })
  }

  const article = await getArticle(req.query.slug)

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!article) {
    return res.status(401).json({ message: "Invalid article slug" })
  }

  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true })

  // Redirect to the path from the fetched article
  res.redirect(`/preview/${article.slug}`)

  return
}

export default draftHandler
