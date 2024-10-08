import { readItem, readItems } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Articles, Contributors, Issues, People, Sections } from "../types"
import { revalidatePath } from "next/cache"
import { getPermalink, PageType } from "../utils"

export enum RevalidateType {
  Articles = "articles",
  Sections = "sections",
  Issues = "issues",
  Tributes = "tributes",
  Contributors = "contributors",
}

export const revalidateArticle = cache(async (data: Articles) => {
  const permalink = getPermalink({
    year: data.issue.year,
    month: data.issue.month,
    section: data.section.slug,
    slug: data.slug,
    type: PageType.Article,
  })
  const url = new URL(permalink)
  revalidatePath(url.pathname)
  return url.pathname
})

export const revalidateIssue = cache(async (data: Issues) => {
  const permalink = getPermalink({
    issueSlug: data.slug,
    type: PageType.Issue,
  })
  const url = new URL(permalink)
  revalidatePath(url.pathname)
  return url.pathname
})

export const revalidateContributor = cache(async (data: Contributors) => {
  const permalink = getPermalink({
    slug: data.slug,
    type: PageType.Contributor,
  })
  const url = new URL(permalink)
  revalidatePath(url.pathname)
  return url.pathname
})

export const getRevalidateData = cache(async (id: string, type: RevalidateType) => {
  switch (type) {
    case RevalidateType.Articles:
      const article = await directus.request(
        readItem(type, id, {
          fields: [
            "slug",
            {
              issue: ["id", "title", "slug", "year", "month"],
            },
            {
              section: ["id", "name", "slug"],
            },
          ],
        }),
      )

      return article as Articles
    case RevalidateType.Contributors:
      const contributor = await directus.request(
        readItem(type, id, {
          fields: ["slug"],
        }),
      )

      return contributor as Contributors
    default:
      return null
  }
})
