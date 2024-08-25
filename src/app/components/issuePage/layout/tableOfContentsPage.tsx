import { IssuePageProps } from "@/app/page"
import SubscribeAd from "../subscribeAd"
import TableOfContents from "../tableOfContents"

const TableOfContentsPage = (props: IssuePageProps) => {
  const { issueData, sections, permalink } = props
  const currentSections = sections

  const { year, month } = issueData
  const tocProps = { issueData, currentSections, permalink, year, month }

  return (
    <div className="grid-col-8">
      <div className="grid-row">
        <TableOfContents {...tocProps} />
      </div>
      <SubscribeAd />
    </div>
  )
}

export default TableOfContentsPage
