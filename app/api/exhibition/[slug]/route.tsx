import { getExhibition } from "@/lib/utils/exhibitions"

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug

  if (!slug) {
    return new Response("Missing slug", { status: 401 })
  }

  const exhibitionData = await getExhibition(slug)

  return new Response(JSON.stringify(exhibitionData), {
    headers: {
      ContentType: "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
