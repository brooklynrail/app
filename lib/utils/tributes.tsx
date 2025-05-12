import { readItems } from "@directus/sdk"
import { unstable_cache } from "next/cache"
import { cache } from "react"
import directus from "../directus"
import { Articles, Issues, Tributes } from "../types"

interface TributesParams {
  thisIssueData: Issues
}

export const getTributes = cache(async (props: TributesParams) => {
  const { thisIssueData } = props

  // filter out the articles where tribute is not null
  const tributeArticles = thisIssueData.articles.filter((article) => article.tribute !== null)
  // make an array of the tribute slugs in the tributeArticles and remove all duplicates
  const currentTributes: Array<string> = Array.from(
    new Set(tributeArticles.map((article: Articles) => article.tribute?.slug).filter((slug): slug is string => !!slug)),
  )

  const tributes = await directus.request(
    readItems("tributes", {
      fields: [
        "id",
        "title",
        "slug",
        "excerpt",
        "title_tag",
        {
          editors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }],
        },
        {
          featured_image: ["id", "width", "height", "filename_disk", "caption"],
        },
        {
          articles: [
            "slug",
            "title",
            "excerpt",
            "status",
            {
              tribute: ["slug"],
            },
            "hide_title",
            "hide_in_article_ad",
            {
              contributors: [{ contributors_id: ["id", "slug", "first_name", "last_name"] }],
            },
          ],
        },
      ],
      filter: {
        slug: {
          _in: currentTributes.length > 0 ? currentTributes : ["none"],
        },
      },
    }),
  )
  return tributes as Tributes[]
})

export const getAllTributes = cache(async () => {
  const tributes = await directus.request(
    readItems("tributes", {
      fields: [
        "id",
        "title",
        "slug",
        "excerpt",
        "title_tag",
        "date_updated",
        {
          editors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }],
        },
        {
          featured_image: ["id", "width", "height", "filename_disk", "caption"],
        },
        {
          articles: [
            "slug",
            "title",
            "excerpt",
            "body_text",
            "sort",
            "hide_title",
            "hide_in_article_ad",
            "status",
            {
              tribute: ["slug"],
            },
            {
              images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }],
            },
            {
              section: ["name", "slug"],
            },
            {
              issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"],
            },
            {
              contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }],
            },
            {
              featured_image: ["id", "width", "height", "filename_disk", "caption"],
            },
          ],
        },
      ],
    }),
  )
  return tributes as Tributes[]
})

interface TributeDataParams {
  tributeSlug: string
  slug: string
}

export const getTributeData = unstable_cache(
  async ({ tributeSlug }: TributeDataParams) => {
    const tribute = await directus.request(
      readItems("tributes", {
        fields: [
          "title",
          "deck",
          "slug",
          "blurb",
          "summary",
          "excerpt",
          "published",
          "title_tag",
          {
            editors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }],
          },
          {
            featured_image: ["id", "width", "height", "filename_disk", "caption"],
          },
          {
            articles: [
              "slug",
              "title",
              "excerpt",
              "body_text",
              "sort",
              "hide_title",
              "hide_in_article_ad",
              "status",
              {
                tribute: ["slug"],
              },
              {
                images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }],
              },
              {
                section: ["name", "slug"],
              },
              {
                issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"],
              },
              {
                contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }],
              },
              {
                featured_image: ["id", "width", "height", "filename_disk", "caption"],
              },
            ],
          },
        ],
        filter: {
          slug: {
            _eq: tributeSlug,
          },
        },
      }),
    )
    return tribute[0] as Tributes
  },
  ["tributes"],
  {
    tags: ["tributes"],
    revalidate: 86400,
  },
)

interface InMemoriamArticlesProps {
  slug: string
  limit: number
  offset: number
}

export const getInMemoriamArticles = unstable_cache(async (props: InMemoriamArticlesProps) => {
  const { slug, limit, offset } = props

  try {
    const articlesAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/articles` +
      `?fields[]=id` +
      `&fields[]=slug` +
      `&fields[]=title` +
      `&fields[]=excerpt` +
      `&fields[]=kicker` +
      `&fields[]=body_text` +
      `&fields[]=featured` +
      `&fields[]=status` +
      `&fields[]=hide_bylines_downstream` +
      `&fields[]=section.id` +
      `&fields[]=section.name` +
      `&fields[]=section.slug` +
      `&fields[]=issue.id` +
      `&fields[]=issue.title` +
      `&fields[]=issue.year` +
      `&fields[]=issue.month` +
      `&fields[]=issue.slug` +
      `&fields[]=contributors.contributors_id.id` +
      `&fields[]=contributors.contributors_id.first_name` +
      `&fields[]=contributors.contributors_id.last_name` +
      `&fields[]=featured_image.id` +
      `&fields[]=featured_image.width` +
      `&fields[]=featured_image.height` +
      `&fields[]=featured_image.filename_disk` +
      `&fields[]=featured_image.caption` +
      `&fields[]=featured_image.alt` +
      `&fields[]=featured_artwork.id` +
      `&fields[]=featured_artwork.width` +
      `&fields[]=featured_artwork.height` +
      `&fields[]=featured_artwork.filename_disk` +
      `&fields[]=featured_artwork.caption` +
      `&fields[]=featured_artwork.alt` +
      `&fields[]=tribute` +
      `&filter[status][_eq]=published` +
      `&filter[tribute][_null]=true` +
      `&filter[section][slug][_eq]=${slug}` +
      `&limit=${limit}` +
      `&page=${Math.floor(offset / limit) + 1}` +
      `&sort[]=-issue.published` +
      `&sort[]=sort`

    const response = await fetch(articlesAPI, { next: { revalidate: 3600, tags: ["sections"] } })
    const articlesData = await response.json()

    return articlesData.data as Articles[]
  } catch (error) {
    console.error("Error fetching Articles data:", error)
    return null
  }
})
