import { readItem } from "@directus/sdk"
import { cache } from "react"
import directus from "../directus"
import { Articles, Contributors, Events, Issues, Pages } from "../types"
import { getPermalink, PageType } from "../utils"

export enum RevalidateType {
  Homepage = "homepage",
  Articles = "articles",
  Sections = "sections",
  Issues = "issues",
  Events = "events",
  Tributes = "tributes",
  Contributors = "contributors",
  Ads = "ads",
  Pages = "pages",
  GlobalSettings = "global_settings",
}

async function revalidatePages(paths: string[]) {
  try {
    await Promise.all(
      paths.map(async (path) => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?path=${path}`, {
          method: "POST",
          headers: {
            contentType: "application/json",
          },
        })
      }),
    )
  } catch (error) {
    console.error("Error revalidating:", error)
  }
}

export const revalidateIssue = cache(async (data: Issues) => {
  const permalink = getPermalink({
    issueSlug: data.slug,
    type: PageType.Issue,
  })
  const url = new URL(permalink)
  await revalidatePages([url.pathname, "/issues/sitemap.xml", "/archive"])
  return url.pathname
})

export function getContributorRevalidationPaths(data: Contributors) {
  const permalink = getPermalink({
    slug: data.slug,
    type: PageType.Contributor,
  })
  const url = new URL(permalink)
  return {
    mainPath: url.pathname,
    additionalPaths: ["/contributors", "/contributors/sitemap.xml"],
  }
}

export function getEventRevalidationPaths(data: Events) {
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
  return {
    mainPath: url.pathname,
    additionalPaths: ["/events", "/events/past", "/events/sitemap.xml"],
  }
}

export function getPageRevalidationPaths(data: Pages) {
  const permalink =
    data.slug === "about"
      ? getPermalink({ type: PageType.Page, slug: data.slug })
      : getPermalink({ type: PageType.ChildPage, slug: data.slug })

  const url = new URL(permalink)
  return {
    mainPath: url.pathname,
    additionalPaths: data.slug === "about" ? ["/about"] : [],
  }
}

export const getRevalidateData = cache(async (id: string, type: RevalidateType) => {
  switch (type) {
    case RevalidateType.Articles: {
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
    }

    case RevalidateType.Contributors: {
      const contributor = await directus.request(
        readItem(type, id, {
          fields: ["slug"],
        }),
      )
      return contributor as Contributors
    }

    case RevalidateType.Events: {
      const event = await directus.request(
        readItem(type, id, {
          fields: ["slug", "start_date"],
        }),
      )
      return event as Events
    }

    case RevalidateType.Pages: {
      const page = await directus.request(
        readItem(type, id, {
          fields: ["slug"],
        }),
      )
      return page as Pages
    }

    default:
      return null
  }
})
