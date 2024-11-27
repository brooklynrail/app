import directus from "../directus"
import { readItems } from "@directus/sdk"
import { Articles, Issues, Tributes } from "../types"

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
