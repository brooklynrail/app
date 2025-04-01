import { revalidateTag } from "next/cache"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")
    const type = searchParams.get("type")

    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
      return new Response(`Invalid credentials`, { status: 500 })
    }

    if (!type) {
      return new Response("type is required", { status: 400 })
    }

    revalidateTag(type)
    return new Response(`Revalidated ${type}`, { status: 200 })
  } catch (err) {
    console.error("Revalidation error:", err)
    return new Response("Error revalidating", { status: 500 })
  }
}
