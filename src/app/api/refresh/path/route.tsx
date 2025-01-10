import { revalidatePath, revalidateTag } from "next/cache"
export const dynamic = "force-dynamic" // Mark this API as dynamic

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")
    const path = searchParams.get("path")

    // Check if the secret matches the expected secret
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Check if the path is provided
    if (!path) {
      return new Response("path is required", { status: 400 })
    }

    revalidatePath(path)

    return new Response(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, { status: 200 })
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Revalidation error:", err)
    // Return a generic error response
    return new Response("Error revalidating", { status: 500 })
  }
}
