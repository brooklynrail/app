"use client"
import CoversPopup from "../issueRail/coversPopup"
import Ad970 from "../ads/ad970"
import { Ads, Articles, Contributors } from "../../../../lib/types"
import { useEffect, useState } from "react"
import { getAds, getPermalink, PageType } from "../../../../lib/utils"
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
  const featured_image = thisTributeData.featured_image
  const blurb = thisTributeData.blurb
  const summary = thisTributeData.summary
  const articleData = props.articleData ? props.articleData : thisTributeData.articles[0]
  return (
    <>
      <PopupProvider>
        <Paper pageClass={tributeClass}>
          <div className="">
            <Header />

            {/* <Ad970 currentAds={currentAds} /> */}

            <section id="main" className={styles.main}>
              <div className={styles.tribute_head}>
                <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-6 gap-y-4">
                  <div className="col-span-12">
                    <h1 className="px-4 py-4 font-sans font-bold text-2xl">{title}</h1>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-6 gap-y-4">
                    <div className="col-span-8">
                      <div className="flex flex-col justify-between h-full">
                        <div className="text-2xl font-serif font-light">{blurb && parse(blurb)}</div>
                        <div className={styles.summary}>{summary && parse(summary)}</div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.tribute_main}>
                <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-6 gap-y-4">
                  <div className="col-span-3">
                    <TributeWriters articles={thisTributeData.articles} tributeSlug={thisTributeData.slug} />
                  </div>
                  <div className="col-span-9">
                    <h1>{articleData.title}</h1>
                    <Bylines contributors={articleData.contributors} />

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

interface TributeWritersProps {
  articles: Articles[]
  tributeSlug: string
}

const TributeWriters = (props: TributeWritersProps) => {
  const { articles, tributeSlug } = props

  const list = articles.map((article, index) => {
    const permalink = getPermalink({
      tributeSlug: tributeSlug,
      slug: article.slug,
      type: PageType.TributeArticle,
    })

    return (
      <li key={index} className={styles.writer}>
        <h4>
          <a href={permalink}>
            <Bylines hideBy={true} contributors={article.contributors} />
          </a>
        </h4>
      </li>
    )
  })

  return (
    <div>
      <ul>{list}</ul>
    </div>
  )
}

export default TributePage
