import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { PageType, getPermalink } from "../../../../lib/utils"
import { Tributes } from "../../../../lib/types"
import Link from "next/link"
import { PromoImage } from "../promo/section"
import TributeWritersList from "../tributePage/writersList"

interface InMemoriamProps {
  tributesData: Tributes[]
}

const InMemoriamSection = (props: InMemoriamProps) => {
  const { tributesData } = props

  return (
    <div className="">
      {tributesData.map((tribute: Tributes, i: number) => {
        const permalink = getPermalink({
          tributeSlug: tribute.slug,
          type: PageType.Tribute,
        })

        const { title, excerpt, featured_image } = tribute

        return (
          <div className="py-1 pb-2 flex flex-col space-y-1" itemType="http://schema.org/Article">
            <p className="text-sm font-bold float-right">In Memoriam</p>

            <div className="flex space-x-4 justify-between">
              <div className="space-y-2">
                <h4 className="text-4xl font-thin">
                  <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                    {parse(title)}
                  </Link>
                </h4>
                <div className="text-lg font-serif pb-3">{parse(excerpt)}</div>
                <TributeWritersList articles={tribute.articles} tributeSlug={tribute.slug} switchArticle={() => {}} />
              </div>

              <div className="w-card-lg flex-none">
                {featured_image && (
                  <div className={`media`}>
                    <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                      <PromoImage image={featured_image} title={title} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default InMemoriamSection
