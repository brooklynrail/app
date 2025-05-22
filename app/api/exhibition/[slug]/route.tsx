import { getExhibition } from "@/lib/utils/exhibitions"

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const slug = params.slug

  if (!slug) {
    return new Response("Missing slug", { status: 401 })
  }

  const exhibitionData = await getExhibition(slug)

  return new Response(JSON.stringify(exhibitionData), {
    headers: {
      ContentType: "application/json",
      CacheControl: "public, s-maxage=86400, stale-while-revalidate=86400",
    },
  })
}
