import { revalidateContributor, revalidateEvent, RevalidateType } from "../../../../lib/utils/revalidate"
import { Contributors, Events } from "../../../../lib/types"
import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic" // Mark this API as dynamic

// This is the payload that is returned by the Directus Flow

// {
//   "type": "{{$trigger.collection}}",
//   "id": "{{$trigger.keys[0]}}",
//   "secret": "7giV5gQ6",
//   "data": {
//     "slug": "{{$trigger.payload.slug}}",
//     "section": {
//       "slug": "{{$trigger.payload.section.slug}}"
//     },
//     "issue": {
//       "year": "{{$trigger.payload.issue.year}}",
//       "month": "{{$trigger.payload.issue.month}}",
//       "slug": "{{$trigger.payload.issue.slug}}"
//     }
//   }
// }

// Webhook URL: https://brooklynrail.org/api/refresh/?secret=7giV5gQ6&id={{$trigger.keys[0]}}&type={{$trigger.collection}}&slug={{$trigger.payload.slug}}&sectionSlug={{$trigger.payload.section.slug}}&issueYear={{$trigger.payload.issue.year}}&issueMonth={{$trigger.payload.issue.month}}&issueSlug={{$trigger.payload.issue.slug}}

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

    // https://brooklynrail.org/api/refresh/?secret=7giV5gQ6&path={{$trigger.data.$trigger.data.articlePath}}
    // https://brooklynrail.org/api/refresh/?secret=7giV5gQ6&id={{$trigger.data.$trigger.data.id}}&type={{$trigger.data.$trigger.data.type}}&slug={{$trigger.data.$trigger.data.slug}}

    // {
    //   type: {{$trigger.data.$trigger.data.type}},
    //   id: {{$trigger.data.$trigger.data.id}},
    //   secret: "7giV5gQ6",
    //   title: {{$trigger.data.$trigger.data.title}},
    //   slug: {{$trigger.data.$trigger.data.slug}},
    //   url: {{$trigger.data.$trigger.data.url}},
    //   articlePath: {{$trigger.data.$trigger.data.articlePath}},
    //   sectionPath: {{$trigger.data.$trigger.data.sectionPath}},
    //   issuePath: {{$trigger.data.$trigger.data.issuePath}},
    // }

    // Check if the path is provided
    if (!id || !type) {
      return new Response("id and type are required", { status: 400 })
    }

    let response: Response
    let path: string
    switch (type) {
      case RevalidateType.Homepage:
        revalidatePath(`/`)
        return new Response(`Revalidation started for the homepage: `, { status: 200 })
      case RevalidateType.Articles:
        const slug = searchParams.get("slug")
        const sectionSlug = searchParams.get("sectionSlug")
        const issueYear = searchParams.get("issueYear")
        const issueMonth = searchParams.get("issueMonth")
        const issueSlug = searchParams.get("issueSlug")

        if (!slug || !sectionSlug || !issueYear || !issueMonth) {
          return new Response("Missing required article data", { status: 400 })
        }

        // Define all paths that need revalidation
        const pathsToRevalidate = [
          "/", // homepage
          "/sitemap.xml",
          `/section/${sectionSlug}`,
          `/issues/${issueYear}-${issueMonth}/`,
          `/${issueYear}/${issueMonth}/${sectionSlug}`,
          `/${issueYear}/${issueMonth}/${sectionSlug}/${slug}`,
        ]

        console.log("Revalidating paths:", pathsToRevalidate)

        // Revalidate all paths
        for (const path of pathsToRevalidate) {
          try {
            revalidatePath(path, "page")
            console.log(`Successfully revalidated: ${path}`)
          } catch (error) {
            console.error(`Failed to revalidate ${path}:`, error)
          }
        }

        return new Response(`Revalidated ${pathsToRevalidate.length} paths`, {
          status: 200,
        })

      case RevalidateType.Contributors:
        // Example path: /contributor/louis-block/
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contributor/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch article")
        const contributorData: Contributors = await response.json()
        path = await revalidateContributor(contributorData)
        return new Response(`Revalidation started for paths: ${path}`, {
          status: 200,
        })
      case RevalidateType.Events:
        // Example path: /event/2024/10/07/event-slug
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch event")
        const eventData: Events = await response.json()
        path = await revalidateEvent(eventData)
        return new Response(`Revalidation started for paths: ${path}`, {
          status: 200,
        })

      default:
        return new Response("Content type not set up yet", { status: 400 })
    }
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Revalidation error:", err)
    // Return a generic error response
    return new Response("Error revalidating", { status: 500 })
  }
}
