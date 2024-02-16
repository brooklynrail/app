import directus from "../../lib/directus"
import { readItems, readItem } from "@directus/sdk"
import Homepage from "@/components/homepage"
import { Ads, Articles, Issues, Sections } from "../../lib/types"

export interface HomepageProps {
  allIssues: Array<Issues>
  currentIssue: Issues
  inConversation: Array<Articles>
  ads: Array<Ads>
  publishersMessage: Array<Articles>
  editorsMessage: Array<Articles>
  criticsPage: Array<Articles>
  artSeen: Array<Articles>
}

function HomepageController(props: HomepageProps) {
  return <Homepage {...props} />
}

export default HomepageController

export async function getStaticProps() {
  const allIssues = await directus.request(
    readItems("issues", {
      fields: ["year", "month", "title", "slug"],
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
    }),
  )

  // Get the most recent published issue
  const currentIssueData = await directus.request(
    readItems("issues", {
      fields: ["*.*"],
      filter: {
        _and: [{ status: { _eq: "published" } }],
      },
      limit: 1, // Limits the result to only the first (most recent) published issue
    }),
  )

  // Get the sections for the current issue
  const currentSections = await directus.request(
    readItems("sections", {
      fields: ["*.*"],
      filter: {
        _and: [
          {
            articles: { articles_slug: { issues: { issues_id: { _eq: currentIssueData[0].id } } } },
            _and: [{ slug: { _neq: "editorsmessage" } }, { slug: { _neq: "publishersmessage" } }],
          },
        ],
      },
    }),
  )

  // Get the published Ads
  const ads = await directus.request(
    readItems("ads", {
      fields: ["*.*"],
      filter: {
        _and: [{ status: { _eq: "published" }, start_date: { _gte: "2021-01-01" }, ad_url: { _nnull: true } }],
      },
    }),
  )

  // Get the articles for InConversation
  const inConversation = await directus.request(
    readItems("articles", {
      fields: [
        "title",
        "kicker",
        "excerpt",
        "slug",
        "kicker",
        "sections.sections_id.slug",
        "sections.sections_id.name",
      ],
      filter: {
        _and: [
          { sections: { sections_id: { slug: { _eq: "art" } } } },
          { issues: { issues_id: { id: { _eq: currentIssueData[0].id } } } },
        ],
      },
    }),
  )

  // Get the articles for PublishersMessage
  const publishersMessage = await directus.request(
    readItems("articles", {
      fields: [
        "title",
        "kicker",
        "excerpt",
        "slug",
        "contributors.contributors_id.first_name",
        "contributors.contributors_id.last_name",
        "contributors.contributors_id.slug",
      ],
      filter: {
        _and: [
          { sections: { sections_id: { slug: { _eq: "publishersmessage" } } } },
          { issues: { issues_id: { id: { _eq: currentIssueData[0].id } } } },
        ],
      },
      limit: 1,
    }),
  )

  // Get the articles for EditorsMessage
  const editorsMessage = await directus.request(
    readItems("articles", {
      fields: [
        "title",
        "kicker",
        "excerpt",
        "slug",
        "contributors.contributors_id.first_name",
        "contributors.contributors_id.last_name",
        "contributors.contributors_id.slug",
        "sections.sections_id.slug",
        "sections.sections_id.name",
      ],
      filter: {
        _and: [
          { sections: { sections_id: { slug: { _eq: "editorsmessage" } } } },
          { issues: { issues_id: { id: { _eq: currentIssueData[0].id } } } },
        ],
      },
      limit: 1,
    }),
  )

  // Get the articles for CriticsPage
  const criticsPage = await directus.request(
    readItems("articles", {
      fields: [
        "title",
        "kicker",
        "excerpt",
        "slug",
        "contributors.contributors_id.first_name",
        "contributors.contributors_id.last_name",
        "contributors.contributors_id.slug",
        "sections.sections_id.slug",
        "sections.sections_id.name",
      ],
      filter: {
        _and: [
          { sections: { sections_id: { slug: { _eq: "criticspage" } } } },
          { issues: { issues_id: { id: { _eq: currentIssueData[0].id } } } },
        ],
      },
    }),
  )

  // Get the articles for ArtSeen
  const artSeen = await directus.request(
    readItems("articles", {
      fields: [
        "title",
        "kicker",
        "excerpt",
        "slug",
        "contributors.contributors_id.first_name",
        "contributors.contributors_id.last_name",
        "contributors.contributors_id.slug",
        "sections.sections_id.slug",
        "sections.sections_id.name",
      ],
      filter: {
        _and: [
          { sections: { sections_id: { slug: { _eq: "artseen" } } } },
          { issues: { issues_id: { id: { _eq: currentIssueData[0].id } } } },
        ],
      },
    }),
  )

  // console.log("currentSections", currentSections)
  // console.log("currentIssue", currentIssue)
  // console.log("inConversation", inConversation)
  // console.log("allIssues", allIssues)
  // console.log("ads", ads)
  // console.log("publishersMessage", publishersMessage)
  // console.log("editorsMessage", editorsMessage)
  // console.log("criticsPage", criticsPage)
  // console.log("===============")

  const currentIssue = currentIssueData[0]

  return {
    props: {
      allIssues,
      currentIssue,
      currentSections,
      inConversation,
      publishersMessage,
      editorsMessage,
      criticsPage,
      artSeen,
      ads,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
