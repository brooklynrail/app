import { notFound } from "next/navigation"
import { getAllPeople } from "@/lib/utils/people"

export async function GET() {
  const allPeople = await getAllPeople()

  if (!allPeople) {
    return notFound()
  }

  return Response.json(allPeople, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Cache-Control": "public, s-maxage=604800, stale-while-revalidate",
    },
  })
}
