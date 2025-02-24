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

    if (!type) {
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
        if (!id) {
          return new Response("id is required", { status: 400 })
        }
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
        revalidateTag("articles")

        return new Response(`Revalidation started for: ${permalink}`, {
          status: 200,
        })

      case RevalidateType.Sections:
        console.log("Revalidating all sections")
        revalidatePath(`/section/[slug]`, "page")
        revalidateTag("sections")
        return new Response(`Revalidation started for all sections`, { status: 200 })

      case RevalidateType.Contributors:
        if (!id) {
          return new Response("id is required", { status: 400 })
        }
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contributor/id/${id}`, {
          next: { revalidate: 3600, tags: ["contributors"] },
        })
        if (!response.ok) throw new Error("Failed to fetch contributor")
        const contributorData: Contributors = await response.json()
        path = await revalidateContributor(contributorData)

        return new Response(`Revalidation started for path: ${path}`, { status: 200 })

      case RevalidateType.Events:
        if (!id) {
          return new Response("id is required", { status: 400 })
        }
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
        if (!id) {
          return new Response("id is required", { status: 400 })
        }
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
