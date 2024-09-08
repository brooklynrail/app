import Link from "next/link"
import { Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"

interface CurrentSectionsProps {
  issueSections: Array<Sections>
  thisIssueData: Issues
}

const CurrentSections = (props: CurrentSectionsProps) => {
  const { issueSections, thisIssueData } = props
  const { slug, special_issue } = thisIssueData
  const sectionsToRemove = ["publishersmessage", "editorsmessage"]

  const issuePermalink = getPermalink({
    issueSlug: thisIssueData.slug,
    type: PageType.Issue,
  })

  const sectionsList = issueSections.map((section: Sections, i: number) => {
    const sectionPermalink = getPermalink({
      issueSlug: thisIssueData.slug,
      section: section.slug,
      type: PageType.Section,
    })
    if (sectionsToRemove.includes(section.slug)) {
      return
    }
    return (
      <li key={`${i}`}>
        <Link href={sectionPermalink} title={`Go to the ${section.name} section`}>
          {section.name}
        </Link>
      </li>
    )
  })

  return (
    <>
      <div className="issue_sections">
        <ul>
          <li>
            <Link href={issuePermalink} title="Go to the Issue home">
              Issue Home
            </Link>
          </li>
          {sectionsList}
          <li>
            <Link href={`https://intranslation.brooklynrail.org/?br`} title="Go to In Translation">
              In Translation
            </Link>
          </li>
          <li>
            <Link href={`${issuePermalink}table_of_contents`} title="Go to Table of Contents">
              Table of Contents
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default CurrentSections
