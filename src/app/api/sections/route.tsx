import { readItems } from "@directus/sdk"
import directus from "../../../../lib/directus"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const issueId = searchParams.get("issueId")

  if (issueId) {
    const data = await directus.request(
      readItems("sections", {
        fields: ["id", "name", "slug"],
        filter: {
          _and: [
            {
              articles: {
                issue: { id: { _eq: issueId } },
              },
            },
          ],
        },
      }),
    )
    return Response.json(data)
  } else {
    const data = await directus.request(
      readItems("sections", {
        fields: ["id", "name", "slug"],
      }),
    )
    return Response.json(data)
  }
}
