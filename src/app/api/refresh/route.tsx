import {
  revalidateArticle,
  revalidateContributor,
  revalidateEvent,
  revalidateIssue,
  RevalidateType,
} from "../../../../lib/utils/revalidate"
import { Articles, Contributors, Events } from "../../../../lib/types"
import { revalidatePath } from "next/cache"

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
    if (secret !== process.env.REVALIDATION_SECRET) {
      return new Response("Unauthorized", { status: 401 })
    }

    if (!id || !type) {
      return new Response("id and type are required", { status: 400 })
    }

    let response: Response
    let path: string
    switch (type) {
      case RevalidateType.Homepage:
        revalidatePath(`/`, "page")
        return new Response(`Revalidation started for the homepage`, { status: 200 })

      case RevalidateType.Articles:
        // Example path: /2024/09/architecture/diller-scofidio-renfro-with-abel-nile-new-york/
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch article")
        const articleData: Articles = await response.json()
        path = await revalidateArticle(articleData)
        const issuePath = await revalidateIssue(articleData.issue)

        return new Response(`Revalidation started for paths: ${path}, and ${issuePath}`, { status: 200 })

      case RevalidateType.Contributors:
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contributor/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch contributor")
        const contributorData: Contributors = await response.json()
        path = await revalidateContributor(contributorData)

        return new Response(`Revalidation started for path: ${path}`, { status: 200 })

      case RevalidateType.Events:
        // Example path: /event/2024/10/07/event-slug
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch event")
        const eventData: Events = await response.json()
        path = await revalidateEvent(eventData)

        return new Response(`Revalidation started for path: ${path}`, { status: 200 })

      default:
        return new Response("Content type not supported", { status: 400 })
    }
  } catch (err) {
    console.error("Revalidation error:", err)
    return new Response("Error revalidating", { status: 500 })
  }
}
