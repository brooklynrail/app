import { revalidateArticle, revalidateIssue, RevalidateType } from "../../../../lib/utils/revalidate"
import { Articles } from "../../../../lib/types"

export const dynamic = "force-dynamic" // Mark this API as dynamic

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

    // Check if the path is provided
    if (!id || !type) {
      return new Response("id and type are required", { status: 400 })
    }

    switch (type) {
      case RevalidateType.Articles:
        // Example path: /2024/09/architecture/diller-scofidio-renfro-with-abel-nile-new-york/
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/article/id/${id}`)
        if (!response.ok) throw new Error("Failed to fetch article")
        const data: Articles = await response.json()
        const path = revalidateArticle(data)
        const issuePath = revalidateIssue(data.issue)
        const paths = [path, issuePath]
        return new Response(
          `Revalidation started for Article paths: ${paths.map((path) => JSON.stringify(path)).join(", ")}`,
          { status: 200 },
        )

      default:
        return new Response("Invalid type", { status: 400 })
    }
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Revalidation error:", err)
    // Return a generic error response
    return new Response("Error revalidating", { status: 500 })
  }
}
