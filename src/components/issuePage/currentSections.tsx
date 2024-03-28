import Link from "next/link"
import { Sections } from "../../../lib/types"
import { PageType, getPermalink } from "../../../lib/utils"

interface CurrentSectionsProps {
  currentSections: Array<Sections>
  year: number
  month: number
}

const CurrentSections = (props: CurrentSectionsProps) => {
  const { currentSections, year, month } = props
  const sectionsToRemove = ["publishersmessage", "editorsmessage"]

  const issuePermalink = getPermalink({
    year: year,
    month: month,
    type: PageType.Issue,
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
          {currentSections.map((section: Sections, i: number) => {
            const sectionPermalink = getPermalink({
              year: year,
              month: month,
              section: section.slug,
              type: PageType.Section,
            })
            if (sectionsToRemove.includes(section.slug)) {
              return
            }
            return (
              <li key={`${i}-${year}/${month}/${section.slug}/`}>
                <Link href={sectionPermalink} title={`Go to the ${section.name} section`}>
                  {section.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default CurrentSections
