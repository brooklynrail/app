import { HomepageProps } from "@/pages"
import { Articles } from "../../../lib/types"
import PromoSlim from "../promo/slim"

const CriticsPage = (props: HomepageProps) => {
  const { dateSlug, criticsPage } = props
  return (
    <>
      <h3>Critics Page</h3>
      <ul>
        {criticsPage.map((article: Articles, i: number) => {
          return <PromoSlim key={`criticspage-${i}`} i={i} article={article} dateSlug={dateSlug} />
        })}
      </ul>
    </>
  )
}

export default CriticsPage
