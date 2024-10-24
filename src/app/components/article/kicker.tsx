import Link from "next/link"
import { Issues, Sections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

interface KickerProps {
  kicker?: string | null
  thisIssueData?: Issues
  currentSection: Sections
  centered: boolean
}
const Kicker = (props: KickerProps) => {
  const { kicker, thisIssueData, currentSection, centered } = props
  if (!thisIssueData) {
    return null
  }
  const { slug } = thisIssueData

  let sectionPermalink = getPermalink({
    issueSlug: slug,
    section: currentSection.slug,
    type: PageType.Section,
  })
  if (currentSection.featured) {
    sectionPermalink = getPermalink({
      sectionSlug: currentSection.slug,
      type: PageType.SuperSection,
    })
  }

  const issuePermalink = getPermalink({
    issueSlug: slug,
    type: PageType.Issue,
  })

  return (
    <h6 className={`text-sm space-x-2 ${centered ? "text-center" : "text-left"}`}>
      <Link
        className="font-medium uppercase"
        href={sectionPermalink}
        title={`Go to the ${currentSection.name} section`}
      >
        {currentSection.name}
      </Link>

      {kicker && (
        <>
          <span className="border-r rail-border !border-solid h-4 inline-block relative top-0.5"></span>
          <span className="uppercase">{kicker}</span>
        </>
      )}
      <span className="border-r rail-border !border-solid h-4 inline-block relative top-0.5"></span>
      <span className="uppercase">
        <Link href={issuePermalink}>{thisIssueData.title}</Link>
      </span>
    </h6>
  )
}
export default Kicker
