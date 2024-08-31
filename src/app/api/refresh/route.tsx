import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic" // Mark this API as dynamic

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")
    const path = searchParams.get("path")

    // Check if the secret matches the expected secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Check if the path is provided
    if (!path) {
      return new Response("Path is required", { status: 400 })
    }

    // Start revalidation
    // Example path: /2024/09/architecture/diller-scofidio-renfro-with-abel-nile-new-york/
    const sectionPath = path.split("/").slice(0, 4).join("/") // /2024/09/architecture/
    const issuePath = path.split("/").slice(0, 3).join("/") // /2024/09/
    revalidatePath(path)
    revalidatePath(sectionPath)
    revalidatePath(issuePath)
    const message = `Revalidation started for paths: ${path}, ${sectionPath}, ${issuePath}`
    return new Response(message, { status: 200 })
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Revalidation error:", err)
    // Return a generic error response
    return new Response("Error revalidating", { status: 500 })
  }
}