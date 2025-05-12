"use client"
import { TributesPageProps } from "@/lib/railTypes"
import { Tributes } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { Suspense, useState } from "react"
import Blurb from "../collections/promos/blurb"
import Title, { TitleType } from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import Paper from "../paper"
import SectionDefault, { LayoutMode } from "../section/default"
import TributeWritersList from "../tributePage/writersList"

const TributesPage = (props: TributesPageProps) => {
  const { tributesData, navData, inMemoriamData, inMemoriamArticles } = props
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [articles, setArticles] = useState(inMemoriamArticles)
  const tributes = tributesData.map((tribute) => {
    return <Tribute key={tribute.id} {...tribute} />
  })

  const limit = 16 * 2
  const loadMoreArticles = async () => {
    try {
      const newArticlesResponse = await fetch(
        `/api/tributes/?slug=${`in-memoriam`}&limit=${limit}&offset=${currentPage * limit}`,
        {
          next: {
            tags: ["tributes"],
            revalidate: 3600,
          },
        },
      )
      const newArticles = await newArticlesResponse.json()
      if (!Array.isArray(newArticles)) {
        throw new Error("Fetched data is not an array")
      }
      if (newArticles.length < limit) {
        setHasMore(false)
      }
      setArticles((prev) => [...prev, ...newArticles])
      setCurrentPage((prev) => prev + 1)
    } catch (error) {
      console.error("Failed to load more articles:", error)
    }
  }

  return (
    <Paper pageClass={`theme-tributes`} navData={navData}>
      <main className="divide-y rail-divide">
        <Suspense fallback={<div>Loading...</div>}>{tributes}</Suspense>
        <Suspense fallback={<div>Loading articles...</div>}>
          <div className="divide-y rail-divide">
            <SectionDefault
              sectionData={inMemoriamData}
              articlesData={articles}
              permalink={"permalink"}
              layoutMode={LayoutMode.Grid}
              grouped={false}
              framedImage={true}
            />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {hasMore && (
            <div className="text-center py-6 pb-12">
              <button
                onClick={loadMoreArticles}
                className="bg-indigo-500 text-white text-xl uppercase px-4 py-2 rounded-sm shadow-lg hover:bg-indigo-600 hover:underline hover:underline-offset-2"
              >
                Load more
              </button>
            </div>
          )}
        </Suspense>
      </main>
    </Paper>
  )
}

const Tribute = (props: Tributes) => {
  const { id, title, deck, featured_image, blurb, slug, articles } = props
  const permalink = getPermalink({
    slug: slug,
    type: PageType.Tribute,
  })

  return (
    <div key={id} className="collection theme theme-tribute">
      <div className="px-6 py-9">
        <div className="grid grid-cols-4 tablet:grid-cols-12 gap-3 gap-y-6">
          <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-9">
            <div className="flex flex-col space-y-1 px-0 py-0 tablet-lg:py-0 tablet-lg:px-0">
              <Title title={title} type={TitleType.CollectionTribute} permalink={permalink ? permalink : ""} />
              {deck && (
                <p className={`text-center tablet-lg:text-left font-thin text-3xl tablet-lg:text-4xl`}>{deck}</p>
              )}
            </div>
          </div>
          <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-3 row-span-2 tablet-lg:col-start-10">
            {featured_image && (
              <div className="flex flex-col justify-center px-0">
                <FeaturedImage
                  image={featured_image}
                  hideCaption={true}
                  title={title}
                  permalink={permalink}
                  sizes={`50vw`}
                />
              </div>
            )}
          </div>
          <div className="col-span-4 tablet:col-span-12 tablet-lg:col-span-9 desktop-lg:col-span-8">
            <div className={`flex flex-col space-y-6 px-0 tablet-lg:px-0 h-full justify-end`}>
              {blurb && <Blurb text={blurb} />}
              <div className="">
                <TributeWritersList articles={articles} tributeSlug={slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TributesPage
