import { readItem, readItems } from "@directus/sdk"
import directus from "../directus"
import { cache } from "react"
import { Articles, Contributors, Events, Issues, People, Sections } from "../types"
import { revalidatePath, revalidateTag } from "next/cache"
import { getPermalink, PageType } from "../utils"

export enum RevalidateType {
  Homepage = "homepage",
  Articles = "articles",
  Sections = "sections",
  Issues = "issues",
  Events = "events",
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
  revalidatePath(`/${data.issue.year}/${data.issue.month}/${data.section.slug}`)
  return url.pathname
})

export const revalidateSection = cache(async (data: Sections) => {
  const sectionPath = `/section/${data.slug}`
  revalidatePath(sectionPath)
  revalidateTag("homepage")
  return sectionPath
})

export const revalidateHomepage = cache(async () => {
  revalidatePath(`/sitemap.xml`)
  revalidateTag("homepage")
  return `/`
})

export const revalidateIssue = cache(async (data: Issues) => {
  const permalink = getPermalink({
    issueSlug: data.slug,
    type: PageType.Issue,
  })
  const url = new URL(permalink)
  revalidatePath(url.pathname)
  revalidatePath(`/issues/sitemap.xml`)
  revalidatePath(`/archive`)
  revalidateTag("homepage")
  return url.pathname
})

export const revalidateContributor = cache(async (data: Contributors) => {
  const permalink = getPermalink({
    slug: data.slug,
    type: PageType.Contributor,
  })
  const url = new URL(permalink)
  revalidatePath(url.pathname)
  revalidatePath("/contributors")
  revalidatePath("/contributors/sitemap.xml")
  return url.pathname
})

export const revalidateEvent = cache(async (data: Events) => {
  const eventDate = new Date(data.start_date)
  const eventyear = eventDate.getFullYear()
  const eventmonth = eventDate.getMonth() + 1
  const eventday = eventDate.getDate()

  const permalink = getPermalink({
    type: PageType.Event,
    eventYear: eventyear,
    eventMonth: eventmonth,
    eventDay: eventday,
    slug: data.slug,
  })

  const url = new URL(permalink)
  revalidatePath(url.pathname)
  revalidatePath("/events")
  revalidatePath("/events/past")
  revalidatePath("/events/sitemap.xml")
  revalidateTag("events")
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

    case RevalidateType.Events:
      const event = await directus.request(
        readItem(type, id, {
          fields: ["slug", "start_date"],
        }),
      )

      return event as Events
    default:
      return null
  }
})
