import PromoStandard from "../promo/standard"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles, Tributes } from "../../../../lib/types"
import PromoTribute from "../promo/tribute"

interface InMemoriamProps {
  tributesData: Tributes[]
}

const InMemoriam = (props: InMemoriamProps) => {
  const { tributesData } = props

  return (
    <div className="collection">
      {tributesData.map((tribute: Tributes, i: number) => {
        const permalink = getPermalink({
          tributeSlug: tribute.slug,
          type: PageType.Tribute,
        })

        return <PromoTribute key={`featured-${i}`} tribute={tribute} permalink={permalink} />
      })}
    </div>
  )
}

export default InMemoriam