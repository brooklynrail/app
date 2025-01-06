import { NextRequest } from "next/server"
import { AdTypes, getAds } from "../../../../lib/utils/ads"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  if (!type || !Object.values(AdTypes).includes(type as AdTypes)) {
    return new Response("Invalid ad type", { status: 400 })
  }

  const adsData = await getAds({ adType: type as AdTypes })

  if (!adsData) {
    return Response.json([])
  }

  return Response.json(adsData)
}
