"use client"
import CoversPopup from "../issueRail/coversPopup"
import { Ads } from "../../../../lib/types"
import { useEffect, useState } from "react"
import { getAds, getPermalink, PageType } from "../../../../lib/utils"
import { PopupProvider } from "../issueRail/popupProvider"
import { TributePageProps } from "@/app/tribute/[tributeSlug]/page"
import Paper from "../paper"
import Header from "../header"
import styles from "./tribute.module.scss"
import ArticleBody from "../article/articleBody"
import parse from "html-react-parser"
import FeaturedImage from "../featuredImage"
import TributeWriters from "./writers"
import TributeWritersList from "./writersList"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Title, { TitleType } from "../collections/promos/title"

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
  const articlePermalink = getPermalink({
    tributeSlug: thisTributeData.slug,
    slug: slug,
    type: PageType.TributeArticle,
  })

  return (
    <>
      <PopupProvider>
        <Paper pageClass={`${tributeClass}`}>
          <div className="">
            <Header />

            {/* <Ad970 currentAds={currentAds} /> */}

            <section id="main" className={styles.main}>
              <div className="border-b-2 border-zinc-900 dark:border-indigo-50 border-dotted py-3">
                <div className="px-6 grid grid-cols-4 tablet:grid-cols-12 gap-3">
                  <div className="col-span-4 tablet:col-span-8">
                    <div className="flex flex-col space-y-6 px-3 tablet-lg:px-12 desktop:px-24">
                      <div className="flex flex-col space-y-3">
                        <Title title={title} type={TitleType.Tribute} />
                        {deck && <p className="text-center font-thin text-3xl tablet-lg:text-5xl">{deck}</p>}
                      </div>
                      <div className="text-xl tablet:text-2xl text-center font-serif font-normal">
                        {blurb && parse(blurb)}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 tablet:col-span-4 tablet-lg:row-span-2 tablet:col-start-9">
                    <div className="flex flex-col justify-center py-9 px-24 tablet:p-0 h-full">
                      {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
                    </div>
                  </div>
                  <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-8">
                    <div className="flex flex-col justify-end h-full px-3 tablet:px-6">
                      <TributeWritersList articles={thisTributeData.articles} tributeSlug={thisTributeData.slug} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3 px-6 tablet:px-9">
                <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
                  <div className="col-span-4 tablet-lg:col-span-3 tablet-lg:border-r-2 border-zinc-900 dark:border-indigo-50 border-dotted">
                    <div className="divide-y-2 divide-dotted divide-zinc-900 dark:divide-indigo-50 tablet-lg:mr-3">
                      <aside className="text-sm pl-3 pb-3 tablet-lg:py-3">{summary && parse(summary)}</aside>
                      <TributeWriters
                        currentSlug={articleData.slug}
                        articles={thisTributeData.articles}
                        tributeSlug={thisTributeData.slug}
                      />
                    </div>
                  </div>
                  <div className="col-span-4 tablet-lg:col-span-9">
                    <div className="py-3 pb-9">
                      <Title title={articleData.title} permalink={articlePermalink} type={TitleType.TributeArticle} />
                      <Bylines article={articleData} type={BylineType.TributeArticle} linked={true} hideBy={true} />
                    </div>
                    <ArticleBody articleData={articleData} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Paper>
        <CoversPopup />
      </PopupProvider>
    </>
  )
}

export default TributePage
