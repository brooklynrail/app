import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic" // Mark this API as dynamic

export async function POST(request: Request) {
  try {
    const body = await request.json() // Parse the incoming JSON data

    const { secret, title, slug, url, articlePath, sectionPath, issuePath } = body // Extract `secret` and `path` from the JSON data

    // Check if the secret matches the expected secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Check if the path is provided
    if (!articlePath) {
      return new Response("Path is required", { status: 400 })
    }

    // Start revalidation
    console.log("Revalidating:", articlePath)
    revalidatePath(articlePath)
    revalidatePath(sectionPath)
    revalidatePath(issuePath)
    return new Response("Revalidation started", { status: 200 })
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Revalidation error:", err)
    // Return a generic error response
    return new Response("Error revalidating", { status: 500 })
  }
}
