"use client"
import { ArticlePreviewProps } from "@/lib/railTypes"
import { useEffect, useState } from "react"
import ArticleHead from "../../article/articleHead"
import ArticleBody from "../../article/articleBody"
import Bylines, { BylineType } from "../../collections/promos/bylines"
import Title, { TitleType } from "../../collections/promos/title"
import Paper from "../../paper"
import Password from "../password"
import PreviewInfo from "./previewInfo"

const ArticlePreview = (props: ArticlePreviewProps) => {
  const { articleData, isEnabled, previewPassword, directusUrl, navData } = props
  const cookieSlug = `rail_preview_${articleData.slug}`
  const [isStudioPreview, setIsStudioPreview] = useState(false)

  useEffect(() => {
    if (window.location.href.includes("draftMode")) {
      setIsStudioPreview(true)
    }
  }, [])

  const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/article/${articleData.id}/`
  const showAd = isStudioPreview
  const isTribute = articleData.tribute

  return (
    <Password previewPassword={previewPassword} cookieSlug={cookieSlug} isEnabled={isEnabled}>
      <Paper pageClass={`theme-${articleData.section.slug}`} hidePopup={true} navData={navData} previewURL={previewURL}>
        <main className="">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-3 px-3">
            <div className="col-span-4 tablet-lg:col-span-9">
              <article className="px-3 py-3">
                {isTribute ? (
                  <div className="py-3 pb-9">
                    {!articleData.hide_title && <Title title={articleData.title} type={TitleType.TributeArticle} />}
                    <Bylines
                      article={articleData}
                      type={BylineType.TributeArticle}
                      asTitle={true}
                      hideBy={true}
                      linked={true}
                    />
                  </div>
                ) : (
                  <ArticleHead {...{ permalink: previewURL, articleData, currentSection: articleData.section }} />
                )}
                <div className="grid grid-cols-4 tablet-lg:grid-cols-8 desktop-lg:grid-cols-9 gap-3">
                  <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9 space-y-12">
                    <ArticleBody articleData={articleData} showAd={showAd} />
                  </div>
                </div>
              </article>
            </div>
            {isStudioPreview && (
              <div className="col-span-4 tablet-lg:col-span-3">
                <PreviewInfo articleData={articleData} directusUrl={directusUrl} />
              </div>
            )}
          </div>
        </main>
      </Paper>
    </Password>
  )
}

export default ArticlePreview
