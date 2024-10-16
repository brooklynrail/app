import { generateYouTubeCopy, getEvent } from "../../../../../../lib/utils/events/utils"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  if (!slug) {
    return new Response("Missing slug", { status: 401 })
  }

  const data = await getEvent(slug)

  const youtubeDescription = generateYouTubeCopy(data)

  return new Response(JSON.stringify({ youtubeDescription }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
