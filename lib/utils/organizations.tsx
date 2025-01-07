import { cache } from "react"
import { Organizations } from "../types"
import { createDirectus, rest, readItems } from "@directus/sdk"

interface GetOrganizationsProps {
  onlySponsors: Boolean
}

export const getOrganizations = cache(async (props: GetOrganizationsProps): Promise<Organizations[]> => {
  const { onlySponsors } = props

  const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!).with(rest())

  try {
    const result = await client.request(
      readItems("organizations", {
        fields: [
          "id",
          "name",
          "url",
          "slug",
          "community_sponsor",
          {
            logo: ["id", "width", "height", "filename_disk", "alt", "caption", "modified_on"],
          },
        ],
        filter: {
          community_sponsor: { _eq: onlySponsors },
          url: { _nnull: true },
          status: { _eq: "published" },
        },
      }),
    )

    if (!Array.isArray(result)) {
      console.error("Invalid data format received")
      return []
    }

    return result as Organizations[]
  } catch (error) {
    console.error("Error fetching organizations:", error)
    return []
  }
})
