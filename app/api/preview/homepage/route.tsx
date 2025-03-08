import { draftMode } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.NEXT_PUBLIC_PREVIEW_TOKEN) {
    return new Response("Invalid token", { status: 401 })
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/preview/homepage/?draftMode=true`,
    },
  })
}
