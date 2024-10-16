import { generateYouTubeCopy, generateYouTubeTags, getPreviewEvent } from "../../../../../../lib/utils/events/utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
    return new Response("Missing id", { status: 401 })
  }

  const data = await getPreviewEvent(id)

  if (!data) {
    return new Response(`Event not found. ID: ${id}`, { status: 401 })
  }

  const youtubeDescription = generateYouTubeCopy(data)
  const youtubeTags = generateYouTubeTags(data)
  const youtubeId = data.youtube_id ? data.youtube_id : ""
  const title = data.title

  return new Response(JSON.stringify({ title, youtubeId, youtubeDescription, youtubeTags }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
