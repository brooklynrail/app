import { notFound } from "next/navigation"
import { getPersonMerge } from "../../../../../lib/utils/people"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const personId = url.searchParams.get("id")
  if (!personId) {
    return notFound()
  }

  const person = await getPersonMerge(personId)

  if (!person) {
    return notFound()
  }

  return new Response(JSON.stringify(person), {
    headers: { "Content-Type": "application/json" },
  })
}
