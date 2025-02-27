import { notFound } from "next/navigation"
import { getAllPeople } from "../../../../lib/utils/people"

export async function GET() {
  const allPeople = await getAllPeople()

  if (!allPeople) {
    return notFound()
  }

  return Response.json(allPeople)
}
