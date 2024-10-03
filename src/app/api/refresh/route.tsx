import { revalidatePath } from "next/cache"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { RevalidateType } from "../../../../lib/utils/revalidate"

export const dynamic = "force-dynamic" // Mark this API as dynamic

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    console.log("searchParams", searchParams)
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

    switch (type) {
      case RevalidateType.Articles:
        // Example path: /2024/09/architecture/diller-scofidio-renfro-with-abel-nile-new-york/
        const response = await fetch(`/api/article/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch article")
        const data: Articles = await response.json()
        const articlePermalink = getPermalink({
          year: data.issue.year,
          month: data.issue.month,
          section: data.section.slug,
          slug: data.slug,
          type: PageType.Article,
        })
        const articlePath = articlePermalink
        console.log("Revalidate API articlePath: ", articlePath)
        revalidatePath(articlePath)
        return new Response(`Revalidation started for path: ${articlePath}`, { status: 200 })

      case RevalidateType.Section:
        // Example path: /2024/09/architecture/
        const sectionPath = `/section/${id}`
        revalidatePath(sectionPath)
        return new Response(`Revalidation started for path: ${sectionPath}`, { status: 200 })

      case RevalidateType.Issue:
        // Example path: /2024/09/
        const issuePath = `/issue/${id}`
        revalidatePath(issuePath)
        return new Response(`Revalidation started for path: ${issuePath}`, { status: 200 })

      default:
        return new Response("Invalid type", { status: 400 })
    }

    // Start revalidation
    // Example path: /2024/09/architecture/diller-scofidio-renfro-with-abel-nile-new-york/
    // const sectionPath = path.split("/").slice(0, 4).join("/") // /2024/09/architecture/
    // const issuePath = path.split("/").slice(0, 3).join("/") // /2024/09/
    // revalidatePath(path)
    // revalidatePath(sectionPath)
    // revalidatePath(issuePath)
    // const message = `Revalidation started for paths: ${path}, ${sectionPath}, ${issuePath}`
    // return new Response(message, { status: 200 })
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Revalidation error:", err)
    // Return a generic error response
    return new Response("Error revalidating", { status: 500 })
  }
}
