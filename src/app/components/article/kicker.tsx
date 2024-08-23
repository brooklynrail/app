import Link from "next/link"
import { Issues, Sections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"

interface KickerProps {
  kicker?: string | null
  issueBasics?: Issues
  currentSection?: Sections
}
const Kicker = (props: KickerProps) => {
  const { kicker, issueBasics, currentSection } = props
  if (!issueBasics || !currentSection) {
    return <></>
  }
  const { year, month } = issueBasics

  const sectionPermalink = getPermalink({
    year: year,
    month: month,
    section: currentSection.slug,
    type: PageType.Section,
  })

  if (!currentSection && !kicker) {
    return <></>
  }

  return (
    <h6 className="kicker">
      {currentSection && (
        <>
          <Link href={sectionPermalink} title={`Go to the ${currentSection.name} section`}>
            {currentSection.name}
          </Link>
        </>
      )}
      {kicker && (
        <>
          <span className="divider"></span> <span>{kicker}</span>
        </>
      )}
    </h6>
  )
}
export default Kicker
