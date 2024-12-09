import { RevalidateType } from "../../../../lib/utils/revalidate"
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

    console.log(`Starting revalidation for ${type}:${id}`)

    let response: Response
    let pathsToRevalidate: string[] = []

    switch (type) {
      case RevalidateType.Homepage:
        revalidatePath("/", "page")
        return new Response(`Revalidation started for the homepage`, { status: 200 })

      case RevalidateType.Articles:
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch article")
        const articleData: Articles = await response.json()

        // Define all paths that need revalidation
        pathsToRevalidate = [
          "/", // homepage
          "/sitemap.xml",
          `/section/${articleData.section.slug}`,
          `/issues/${articleData.issue.year}-${articleData.issue.month}/`,
          `/${articleData.issue.year}/${articleData.issue.month}/${articleData.section.slug}`,
          `/${articleData.issue.year}/${articleData.issue.month}/${articleData.section.slug}/${articleData.slug}`,
          `/issues/sitemap.xml`,
          `/archive`,
        ]
        break

      case RevalidateType.Contributors:
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contributor/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch contributor")
        const contributorData: Contributors = await response.json()

        pathsToRevalidate = [`/contributor/${contributorData.slug}`, "/contributors", "/contributors/sitemap.xml"]
        break

      case RevalidateType.Events:
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch event")
        const eventData: Events = await response.json()
        const eventDate = new Date(eventData.start_date)
        const eventYear = eventDate.getFullYear()
        const eventMonth = (eventDate.getMonth() + 1).toString().padStart(2, "0")
        const eventDay = eventDate.getDate().toString().padStart(2, "0")

        pathsToRevalidate = [
          `/event/${eventYear}/${eventMonth}/${eventDay}/${eventData.slug}`,
          "/events",
          "/events/past",
          "/",
        ]
        break

      default:
        return new Response("Content type not supported", { status: 400 })
    }

    // Revalidate all paths
    for (const path of pathsToRevalidate) {
      revalidatePath(path, "page")
      console.log(`Revalidated: ${path}`)
    }

    return new Response(`Revalidated paths: ${pathsToRevalidate.join(", ")}`, {
      status: 200,
    })
  } catch (err) {
    console.error("Revalidation error:", err)
    return new Response("Error revalidating", { status: 500 })
  }
}
