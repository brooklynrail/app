import { readItems } from "@directus/sdk"
import directus from "../../../../lib/directus"

export async function GET() {
  const data = await directus.request(
    readItems("sections", {
      fields: ["id", "name", "slug"],
    }),
  )

  return Response.json(data)
}
