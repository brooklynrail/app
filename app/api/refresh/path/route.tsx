import { revalidatePath } from "next/cache"
export const dynamic = "force-dynamic" // Mark this API as dynamic

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")
    const path = searchParams.get("path")
    const type = searchParams.get("type")
    const issuePath = searchParams.get("issuePath")
    const sectionPath = searchParams.get("sectionPath")
    const tributePath = searchParams.get("tributePath")

    // Check if the secret matches the expected secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Check if the path is provided
    if (!path) {
      return new Response("path is required", { status: 400 })
    }

    const revalidatedPaths: string[] = []

    // Revalidate the main path
    revalidatePath(path)
    revalidatedPaths.push(path)

    // For article types, also revalidate related issue and section pages if provided
    if (type === "article") {
      // Revalidate issue page if issuePath is provided
      if (issuePath) {
        revalidatePath(issuePath)
        revalidatedPaths.push(issuePath)
      }

      // Revalidate section page if sectionPath is provided
      if (sectionPath) {
        revalidatePath(sectionPath)
        revalidatedPaths.push(sectionPath)
      }
    }

    // For event types, also revalidate main events page
    if (type === "event") {
      revalidatePath(`https://brooklynrail.org/event`)
      revalidatedPaths.push(`https://brooklynrail.org/event`)
    }

    // For contributors types, also revalidate main contributors page and sitemap
    if (type === "contributor") {
      revalidatePath(`https://brooklynrail.org/contributors`)
      revalidatedPaths.push(`https://brooklynrail.org/contributors`)
      revalidatePath(`https://brooklynrail.org/contributors/sitemap.xml`)
      revalidatedPaths.push(`https://brooklynrail.org/contributors/sitemap.xml`)
    }

    // For tribute types, also revalidate related tribute page if provided
    if (type === "tribute") {
      if (tributePath) {
        revalidatePath(tributePath)
        revalidatedPaths.push(tributePath)
      }
    }
    // for Issue types, also revalidate main issues page and sitemap
    if (type === "issue") {
      revalidatePath(`https://brooklynrail.org/archive`)
      revalidatedPaths.push(`https://brooklynrail.org/archive`)
      revalidatePath(`https://brooklynrail.org/issues/sitemap.xml`)
      revalidatedPaths.push(`https://brooklynrail.org/issues/sitemap.xml`)
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""
    const responseMessage = revalidatedPaths.map((p) => `Revalidated path: ${baseUrl}${p}`).join("\n")

    return new Response(responseMessage, { status: 200 })
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Revalidation error:", err)
    // Return a generic error response
    return new Response("Error revalidating", { status: 500 })
  }
}
