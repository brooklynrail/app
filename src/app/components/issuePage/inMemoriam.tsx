import PromoStandard from "../promo/standard"
import { PromoProps } from "."
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles, Tributes } from "../../../../lib/types"
import PromoTribute from "../promo/tribute"
import TributeWritersList from "../tributePage/writersList"

interface InMemoriamProps {
  tributesData: Tributes[]
}

const InMemoriam = (props: InMemoriamProps) => {
  const { tributesData } = props

  return (
    <div className="">
      {tributesData.map((tribute: Tributes, i: number) => {
        const permalink = getPermalink({
          tributeSlug: tribute.slug,
          type: PageType.Tribute,
        })

        return (
          <>
            <PromoTribute key={`featured-${i}`} tribute={tribute} permalink={permalink} />
            <TributeWritersList articles={tribute.articles} tributeSlug={tribute.slug} switchArticle={() => {}} />
          </>
        )
      })}
    </div>
  )
}

export default InMemoriam
