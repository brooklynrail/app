import {
  revalidateContributor,
  revalidateEvent,
  revalidateIssue,
  revalidatePage,
  RevalidateType,
} from "../../../../lib/utils/revalidate"
import { Articles, Contributors, Events, Pages } from "../../../../lib/types"
import { revalidatePath, revalidateTag } from "next/cache"
import { getPermalink } from "../../../../lib/utils"
import { PageType } from "../../../../lib/utils"

export const dynamic = "force-dynamic" // Mark this API as dynamic

// This is the payload that is returned by the Directus Flow
// {
// type: {{$trigger.collection}},
// id: {{$trigger.keys[0]}},
// secret: "7giV5gQ6",
// }

// Add this function before the GET handler
async function revalidatePathWithAPI(path: string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh/path?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}&path=${path}`
  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      console.log("Path revalidated successfully:", path)
    } else {
      console.error("Failed to revalidate path:", path, response)
    }
  } catch (error) {
    console.error("Error revalidating path:", path, error)
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")
    const id = searchParams.get("id")
    const type = searchParams.get("type")

    // Check if the secret matches the expected secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return new Response(`Invalid credentials`, {
        status: 500,
      })
    }

    if (!id || !type) {
      return new Response("id and type are required", { status: 400 })
    }

    let response: Response
    let path: string
    switch (type) {
      case RevalidateType.Homepage:
        revalidatePath(`/`, "page")
        revalidateTag("homepage")
        return new Response(`Revalidation started for the homepage ${Date.now()}`, { status: 200 })

      case RevalidateType.GlobalSettings:
        revalidateTag("homepage")
        return new Response(`Revalidation started for the Global Settings ${Date.now()}`, { status: 200 })
      case RevalidateType.Ads:
        revalidateTag("ads")
        revalidatePath(`/api/ads/?type=banner`)
        revalidatePath(`/api/ads/?type=tile`)
        revalidatePath(`/api/ads/?type=in_article_standard`)
        return new Response(`Revalidation started for Ads APIs ${Date.now()}`, { status: 200 })

      case RevalidateType.Articles:
        // Example path: /2024/09/architecture/diller-scofidio-renfro-with-abel-nile-new-york/
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch article")
        const articleData: Articles = await response.json()

        // Get the permalink
        const permalink = getPermalink({
          year: articleData.issue.year,
          month: articleData.issue.month,
          section: articleData.section.slug,
          slug: articleData.slug,
          type: PageType.Article,
        })
        const url = new URL(permalink)

        // Revalidate url.pathname
        revalidatePath(url.pathname, "page")
        // await revalidatePathWithAPI(url.pathname)
        // Revalidate section path
        revalidatePath(`/section/${articleData.section.slug}/`, "page")
        // await revalidatePathWithAPI(`/section/${articleData.section.slug}/`)
        // Revalidate issue path
        revalidatePath(`/${articleData.issue.year}/${articleData.issue.month}/${articleData.section.slug}/`, "page")
        // await revalidatePathWithAPI(
        //   `/${articleData.issue.year}/${articleData.issue.month}/${articleData.section.slug}/`,
        // )
        // Revalidate tag
        revalidateTag("articles")

        const issuePath = await revalidateIssue(articleData.issue)

        return new Response(
          `Revalidation started for paths:  ${permalink}, ${`/section/${articleData.section.slug}/`}, and ${issuePath}`,
          {
            status: 200,
          },
        )

      case RevalidateType.Contributors:
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contributor/id/${id}`, {
          next: { revalidate: 3600, tags: ["contributors"] },
        })
        if (!response.ok) throw new Error("Failed to fetch contributor")
        const contributorData: Contributors = await response.json()
        path = await revalidateContributor(contributorData)

        return new Response(`Revalidation started for path: ${path}`, { status: 200 })

      case RevalidateType.Events:
        // Example path: /event/2024/10/07/event-slug
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/id/${id}`, {
          next: { revalidate: 3600, tags: ["events"] },
        })
        if (!response.ok) throw new Error("Failed to fetch event")
        const eventData: Events = await response.json()
        path = await revalidateEvent(eventData)
        revalidateTag("events")

        return new Response(`Revalidation started for path: ${path}`, { status: 200 })

      case RevalidateType.Pages:
        // Example path: /about
        // Example path: /about/advertise
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page/id/${id}`, {
          next: { revalidate: 3600, tags: ["pages"] },
        })
        if (!response.ok) throw new Error("Failed to fetch event")
        const pageData: Pages = await response.json()
        path = await revalidatePage(pageData)

        return new Response(`Revalidation started for path: ${path}`, { status: 200 })

      default:
        return new Response("Content type not supported", { status: 400 })
    }
  } catch (err) {
    console.error("Revalidation error:", err)
    return new Response("Error revalidating", { status: 500 })
  }
}
