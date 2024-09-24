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
      <li key={`${i}`} className="py-0.5">
        <Link href={sectionPermalink} title={`Go to the ${section.name} section`}>
          {section.name}
        </Link>
      </li>
    )
  })

  return (
    <>
      <div className="leading-4">
        <ul className="font-medium flex flex-col divide-y-[1px] divide-dotted divide-zinc-900 dark:divide-slate-100 text-sm">
          <li className="py-0.5">
            <Link href={issuePermalink} title="Go to the Issue home">
              Issue Home
            </Link>
          </li>
          {sectionsList}
          <li className="py-0.5">
            <Link href={`https://intranslation.brooklynrail.org/?br`} title="Go to In Translation">
              In Translation
            </Link>
          </li>
          <li className="py-0.5">
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
