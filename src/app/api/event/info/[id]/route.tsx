import { generateYouTubeCopy, getPreviewEvent } from "../../../../../../lib/utils/events/utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
    return new Response("Missing slug", { status: 401 })
  }

  const data = await getPreviewEvent(id)

  const youtubeDescription = generateYouTubeCopy(data)

  return new Response(JSON.stringify({ youtubeDescription }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
