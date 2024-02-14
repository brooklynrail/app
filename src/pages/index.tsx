import directus from "../../lib/directus"
import { readItems, readItem } from "@directus/sdk"
import Homepage from "@/components/homepage"

function HomepageController(props: any) {
  return <Homepage {...props} />
}

export default HomepageController

export async function getStaticProps({ params }: any) {
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

  // Get the articles for InConversation
  const inConversation = await directus.request(
    readItems("articles", {
      fields: ["title", "kicker", "excerpt", "slug"],
      filter: {
        _and: [
          { sections: { sections_id: { slug: { _eq: "art" } } } },
          { issues: { issues_id: { id: { _eq: currentIssueData[0].id } } } },
        ],
      },
    }),
  )

  // console.log("currentSections", currentSections)
  // console.log("currentIssue", currentIssue)
  // console.log("inConversation", inConversation)
  // console.log("===============")

  const currentIssue = currentIssueData[0]
  return {
    props: {
      currentIssue,
      currentSections,
      inConversation,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
