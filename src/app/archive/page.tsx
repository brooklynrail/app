import { notFound } from "next/navigation"
import { getAllIssues, getPermalink, PageType } from "../../../lib/utils"
import { getNavData } from "../../../lib/utils/homepage"
import ArchivePage from "../components/archive"

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
  Contributor = "contributor",
}

export default async function Archive() {
  const data = await getData()

  if (!data.issues || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <ArchivePage {...data} />
}

async function getData() {
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const allIssuesData = await getAllIssues()
  if (!allIssuesData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Archive,
  })

  return {
    navData,
    issues: allIssuesData,
    permalink,
  }
}
