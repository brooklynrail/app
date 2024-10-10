import { draftMode } from "next/headers"
import { getPreviewEvent } from "../../../../../lib/utils/events/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const id = searchParams.get("id")

  if (secret !== process.env.NEXT_PUBLIC_PREVIEW_TOKEN) {
    return new Response("Invalid token", { status: 401 })
  }

  if (!id) {
    return new Response("Missing id", { status: 401 })
  }

  const event = await getPreviewEvent(id)

  if (!event) {
    return new Response("Invalid slug", { status: 401 })
  }

  draftMode().enable()

  const { isEnabled } = draftMode()

  // Redirect to the path
  const path = `/preview/event/${event.id}?draftMode=true`
  // redirect(path)
  return new Response(null, {
    status: 307,
    headers: {
      Location: path,
    },
  })
}
