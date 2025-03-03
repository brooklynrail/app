import directus from "../directus"
import { Articles, Events, Exhibitions, Issues, Tributes, HomepageCollections, Homepage } from "../types"
import { readItems, readSingleton } from "@directus/sdk"
import { getGlobalSettings } from "../utils"
import { cache } from "react"
import { getCollectionArticles } from "./homepage"

export async function getPreviewPassword() {
  const settings = await getGlobalSettings()
  return settings.preview_password
}

export const getPreviewArticle = async (id: string) => {
  try {
    // Search for the article with the matching slug
    // assuming that slug is unique!
    const preview = await directus.request(
      readItems("articles", {
        version: "draft",
        fields: [
          "*",
          "tribute",
          "hide_title",
          { section: ["id", "name", "slug"] },
          { issue: ["id", "title", "slug", "year", "month", "issue_number", "cover_1"] },
          { contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }] },
          { featured_image: ["id", "width", "height", "filename_disk", "caption"] },
          { images: [{ directus_files_id: ["id", "width", "height", "filename_disk", "shortcode_key", "caption"] }] },
          { user_updated: ["id", "first_name", "last_name", "avatar"] },
        ],
        filter: {
          id: { _eq: id },
        },
      }),
    )
    return preview[0] as Articles
  } catch (error) {
    console.error("error in getPreviewArticle", error)
    return null
  }
}

export const getPreviewIssue = async (id: string) => {
  try {
    const preview = await directus.request(
      readItems("issues", {
        fields: [
          "*",
          "title",
          {
            articles: [
              "id",
              "status",
              "slug",
              "title",
              "excerpt",
              "kicker",
              "sort",
              "featured",
              { contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }] },
              { section: ["id", "slug", "name"] },
              { featured_image: ["id", "width", "height", "filename_disk", "caption"] },
            ],
          },
          { cover_1: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_2: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_3: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_4: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_5: ["id", "width", "height", "filename_disk", "caption"] },
          { cover_6: ["id", "width", "height", "filename_disk", "caption"] },
          { user_updated: ["id", "first_name", "last_name", "avatar"] },
        ],
        filter: {
          id: { _eq: id },
        },
        deep: {
          articles: {
            _limit: -1,
          },
        },
      }),
    )

    return preview[0] as Issues
  } catch (error) {
    console.error("error in getPreviewIssue", error)
    return null
  }
}

export const getPreviewHomepageData = async (currentIssue: Issues) => {
  try {
    const homepageData = await directus.request(
      readSingleton("homepage", {
        fields: [
          "id",
          {
            banners: [
              {
                collections_id: ["id", "type", "kicker", "title", "description", "links", "limit", "banner_type"],
              },
            ],
          },
          {
            video_covers: [{ directus_files_id: ["id", "width", "height", "filename_disk", "caption"] }],
          },
          {
            video_covers_stills: [{ directus_files_id: ["id", "width", "height", "filename_disk", "caption"] }],
          },
          {
            collections: [
              {
                collections_id: [
                  "id",
                  "type",
                  "kicker",
                  "title",
                  "limit",
                  "links",
                  "banner_type",
                  {
                    section: ["slug", "featured", "description"],
                  },
                  {
                    tribute: [
                      "id",
                      "title",
                      "deck",
                      "blurb",
                      "summary",
                      "excerpt",
                      "slug",
                      {
                        editors: [{ contributors_id: ["id", "bio", "first_name", "last_name"] }],
                      },
                      {
                        articles: [
                          "id",
                          "slug",
                          "title",
                          "deck",
                          "excerpt",
                          "sort",
                          "status",
                          {
                            contributors: [{ contributors_id: ["id", "slug", "bio", "first_name", "last_name"] }],
                          },
                        ],
                      },
                      {
                        featured_image: ["id", "width", "height", "filename_disk", "caption"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    )

    const homepage = homepageData as Homepage

    const allCollections = homepage.collections.map(async (collection: HomepageCollections, i: number) => {
      if (collection.collections_id && collection.collections_id.section) {
        const thisSectionArticles = getCollectionArticles({
          currentIssueSlug: currentIssue.slug,
          slug: collection.collections_id.section.slug,
          limit: collection.collections_id.limit,
        })

        collection.collections_id.section.articles = (await thisSectionArticles) as Articles[]
        return collection
      }
      return collection
    })

    homepage.collections = await Promise.all(allCollections)

    return homepage as Homepage
  } catch (error) {
    console.error("Error fetching Homepage data:", error)
    return null
  }
}

export async function getPreviewEvent(id: string) {
  try {
    // Search for the event with the matching ID
    const preview = await directus.request(
      readItems("events", {
        version: "draft",
        fields: [
          "*",
          {
            people: [
              {
                people_id: [
                  "id",
                  "slug",
                  "bio",
                  "display_name",
                  "website",
                  "instagram",
                  "related_links",
                  {
                    portrait: ["id", "width", "height", "filename_disk", "alt", "caption"],
                  },
                ],
              },
            ],
          },
          {
            poets: [
              {
                people_id: [
                  "id",
                  "slug",
                  "bio",
                  "display_name",
                  "website",
                  "instagram",
                  "related_links",
                  {
                    portrait: ["id", "width", "height", "filename_disk", "alt", "caption"],
                  },
                ],
              },
            ],
          },
          { user_updated: ["id", "first_name", "last_name", "avatar"] },
        ],
        filter: {
          id: { _eq: id },
        },
      }),
    )
    return preview[0] as Events
  } catch (error) {
    console.error("error in getPreviewArticle", error)
    return null
  }
}

export const getPreviewExhibition = async (id: string) => {
  try {
    const preview = await directus.request(
      readItems("exhibitions", {
        fields: [
          "id",
          "slug",
          "kicker",
          "title",
          "deck",
          "summary",
          "start_date",
          "end_date",
          "opening_date",
          "status",
          "show_details",
          "location",
          "location_map",
          "opening_details",
          "section",
          "title_tag",
          {
            featured_image: ["id", "width", "height", "filename_disk", "alt", "caption"],
          },
          {
            artists: [
              {
                people_id: [
                  "id",
                  "display_name",
                  "bio",
                  "website",
                  "instagram",
                  "related_links",
                  {
                    portrait: ["id", "width", "height", "filename_disk", "alt", "caption", "modified_on"],
                  },
                ],
              },
            ],
          },
          {
            curators: [
              {
                people_id: [
                  "id",
                  "display_name",
                  "bio",
                  "website",
                  "instagram",
                  "related_links",
                  {
                    portrait: ["id", "width", "height", "filename_disk", "alt", "caption"],
                  },
                ],
              },
            ],
          },
        ],
        filter: {
          id: { _eq: id },
        },
      }),
    )
    return preview[0] as Exhibitions
  } catch (error) {
    console.error("error in getPreviewExhibition", error)
    return null
  }
}

export const getPreviewTribute = async (id: string) => {
  try {
    const preview = await directus.request(
      readItems("tributes", {
        fields: [
          "id",
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
          id: {
            _eq: id,
          },
        },
      }),
    )
    return preview[0] as Tributes
  } catch (error) {
    console.error("error in getPreviewTribute", error)
    return null
  }
}
