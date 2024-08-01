import Link from "next/link"
import { Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"

interface CurrentSectionsProps {
  sections: Array<Sections>
  issueData: Issues
}

const CurrentSections = (props: CurrentSectionsProps) => {
  const { sections, issueData } = props
  const { year, month, slug, special_issue } = issueData
  const sectionsToRemove = ["publishersmessage", "editorsmessage"]

  const issuePermalink = special_issue
    ? getPermalink({
        issueSlug: slug,
        type: PageType.SpecialIssue,
      })
    : getPermalink({
        year: year,
        month: month,
        type: PageType.Issue,
      })

  const sectionsList = sections.map((section: Sections, i: number) => {
    const sectionPermalink = special_issue
      ? getPermalink({
          issueSlug: slug,
          section: section.slug,
          type: PageType.SpecialIssueSection,
        })
      : getPermalink({
          year: year,
          month: month,
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
        </ul>
      </div>
    </>
  )
}

export default CurrentSections
