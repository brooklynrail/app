"use client"
import CoversPopup from "../issueRail/coversPopup"
import { Ads } from "../../../../lib/types"
import { useEffect, useState } from "react"
import { getAds } from "../../../../lib/utils"
import { PopupProvider } from "../issueRail/popupProvider"
import Footer from "../footer"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import Paper from "../paper"
import Header from "../header"
import styles from "./tribute.module.scss"
import Bylines from "../issueRail/bylines"
import ArticleBody from "../article/articleBody"
import parse from "html-react-parser"
import FeaturedImage from "../featuredImage"
import TributeWriters from "./writers"
import TributeWritersList from "./writersList"

const TributePage = (props: TributePageProps) => {
  const { thisTributeData, permalink } = props
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentAds) {
        const ads = getAds()
        // Fetch all the data in parallel
        const [fetchedAds] = await Promise.all([ads])
        // Update the state with the fetched data as it becomes available
        setCurrentAds(fetchedAds)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data on Issue Page:", error))
  }, [currentAds])

  const { slug } = thisTributeData
  const tributeClass = `tribute-${slug.toLowerCase()}`

  const title = thisTributeData.title
  const deck = thisTributeData.deck
  const featured_image = thisTributeData.featured_image
  const blurb = thisTributeData.blurb
  const summary = thisTributeData.summary
  const articleData = props.articleData ? props.articleData : thisTributeData.articles[0]
  return (
    <>
      <PopupProvider>
        <Paper pageClass={`${tributeClass}`}>
          <div className="">
            <Header />

            {/* <Ad970 currentAds={currentAds} /> */}

            <section id="main" className={styles.main}>
              <div className="border-b-2 border-black dark:border-white border-dotted py-3">
                <div className="px-6 grid grid-cols-4 tablet:grid-cols-12 grid-rows-3 gap-3">
                  <div className="col-span-4 tablet:col-span-8 row-span-4 tablet:row-span-2 ">
                    <div className="flex flex-col space-y-6 px-3">
                      <div className="flex flex-col space-y-2">
                        <h1 className="text-center font-bold text-3xl">{title}</h1>
                        {deck && <p className="text-center font-light text-3xl">{deck}</p>}
                      </div>
                      <div className="text-lg text-center font-serif font-light">{blurb && parse(blurb)}</div>
                    </div>
                  </div>
                  <div className="col-span-4 tablet:col-span-4 row-span-4 tablet:row-span-3 tablet:col-start-9">
                    {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
                  </div>
                  <div className="col-span-4 tablet:col-span-8 tablet:row-start-3">
                    <div className="flex flex-col justify-end h-full px-3">
                      <TributeWritersList articles={thisTributeData.articles} tributeSlug={thisTributeData.slug} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3 px-9">
                <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-3 gap-y-4">
                  <div className="col-span-3 border-r-2 border-black dark:border-white border-dotted">
                    <div className="divide-y-2 divide-dotted divide-black dark:divide-white mr-3">
                      <div className="text-sm pl-3 py-3">{summary && parse(summary)}</div>
                      <TributeWriters articles={thisTributeData.articles} tributeSlug={thisTributeData.slug} />
                    </div>
                  </div>
                  <div className="col-span-9">
                    <div className="py-4 pb-8">
                      <h1 className="text-md font-bold">{articleData.title}</h1>
                      <Bylines contributors={articleData.contributors} linked={true} />
                    </div>
                    <ArticleBody articleData={articleData} />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </Paper>
        <CoversPopup />
      </PopupProvider>
    </>
  )
}

export default TributePage
