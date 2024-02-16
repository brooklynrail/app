import { HomepageProps } from "@/pages"
import { Articles } from "../../../lib/types"
import PromoSlim from "../promo/slim"

const CriticsPage = (props: HomepageProps) => {
  const { currentIssue, criticsPage } = props
  const { year, month } = currentIssue
  const dateSlug = `${year}/${month}`

  return (
    <>
      <h3>Critics Page</h3>
      <ul>
        <>
          {criticsPage.map((article: Articles, i: number) => {
            return <PromoSlim key={i} i={i} article={article} dateSlug={dateSlug} />
          })}
        </>
      </ul>
    </>
  )
}

export default CriticsPage
