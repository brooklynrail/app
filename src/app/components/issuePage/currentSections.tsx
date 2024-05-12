import Link from "next/link"
import { Issues, Sections } from "../../../../lib/types"
import { PageType, getPermalink } from "../../../../lib/utils"

interface CurrentSectionsProps {
  currentSections?: Array<Sections>
  issueData: Issues
}

const CurrentSections = (props: CurrentSectionsProps) => {
  const { currentSections, issueData } = props
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

  const sections = currentSections ? (
    currentSections.map((section: Sections, i: number) => {
      console.log("special_issue", special_issue)
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
  ) : (
    <LoadingSections />
  )

  return (
    <>
      <div className="issue_sections">
        <ul>
          <li>
            <Link href={issuePermalink} title="Go to the Issue home">
              Issue Home
            </Link>
          </li>
          {sections}
        </ul>
      </div>
    </>
  )
}

const LoadingSections = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i} className="loading">
          <span style={{ width: 111 }}></span>
        </li>
      ))}
    </>
  )
}

export default CurrentSections
