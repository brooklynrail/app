"use client"
import { PageProps } from "@/app/about/[slug]/page"
import Paper, { PaperType } from "../paper"
import MapEmbed from "./map"
import PageBody from "./pageBody"
import PageHead from "./pageHead"
import PageNav from "./pageNav"
import Quotes from "./quotes"

const Page = (props: PageProps) => {
  const { navData, allPagesData, pageData, quotes } = props

  return (
    <Paper pageClass="paper-page" type={PaperType.Page} navData={navData}>
      <main className="py-9 px-3 tablet-lg:px-6">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 tablet-lg:divide-x rail-divide">
          <div className="hidden tablet-lg:block col-span-4 tablet-lg:col-span-3">
            <PageNav pages={allPagesData} currentSlug={pageData.slug} />
          </div>
          <div className="col-span-4 tablet-lg:col-span-6">
            <article className="tablet-lg:px-6 space-y-6">
              <PageHead {...props} />
              <PageBody {...props} />
              <MapEmbed {...props} />
            </article>
          </div>
          <div className="col-span-4 tablet-lg:col-span-3">
            <Quotes quotes={quotes} />
          </div>
        </div>
      </main>
    </Paper>
  )
}

export default Page
