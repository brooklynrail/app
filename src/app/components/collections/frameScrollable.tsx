"use client"
import { Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import { PromosBooks } from "./books"

const FrameScrollable = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }

  const { articles } = section

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  // const promos =
  //   section.slug === "artseen" ? <PromosArtSeen articles={restOfArticles} /> : <Promos articles={restOfArticles} />
  // const promosMobile =
  //   section.slug === "artseen" ? <PromosArtSeen articles={articles} /> : <Promos articles={articles} />
  // const leadPromo = <LeadPromoArtSeen article={leadArticle} />

  return (
    <div key={collection.id}>
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="tablet:px-6 pb-3 border-b rail-border">
            <CollectionHead title={section.name} permalink={sectionPermalink} />
            <div className="pl-6 tablet:pl-0 divide-x rail-divide flex overflow-x-auto snap-mandatory snap-x scroll-smooth">
              <PromosBooks articles={articles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrameScrollable
