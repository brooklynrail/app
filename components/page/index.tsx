"use client"
import { AboutPageProps } from "@/lib/railTypes"
import Paper from "../paper"
import MapEmbed from "./map"
import PageBody from "./pageBody"
import PageHead from "./pageHead"
import PageNav from "./pageNav"
import Quotes from "./quotes"

const Page = (props: AboutPageProps) => {
  const { navData, allPagesData, pageData, quotes } = props

  return (
    <Paper pageClass="theme-page" navData={navData}>
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
