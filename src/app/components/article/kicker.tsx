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
    return <></>
  }
  const { slug } = thisIssueData

  const sectionPermalink = getPermalink({
    issueSlug: slug,
    section: currentSection.slug,
    type: PageType.Section,
  })

  return (
    <h6 className={`text-lg space-x-2 ${centered ? "text-center" : "text-left"}`}>
      <Link className="font-black" href={sectionPermalink} title={`Go to the ${currentSection.name} section`}>
        {currentSection.name}
      </Link>

      {kicker && (
        <>
          <span className="border-r-[1px] border-zinc-900"></span> <span>{kicker}</span>
        </>
      )}
    </h6>
  )
}
export default Kicker
