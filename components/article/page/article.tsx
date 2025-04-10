"use client"
import { ArticleProps } from "@/lib/railTypes"
import ArticleBody from "@/components/article/articleBody"
import NextPrev, { NextPrevType } from "@/components/nextPrev"
import ArticleHead from "@/components/article/articleHead"

const ArticlePage = (props: ArticleProps) => {
  const { thisIssueData, articleData, permalink, currentSection } = props
  return (
    <div className="divide-y rail-divide pb-6">
      <NextPrev
        parentCollection={thisIssueData}
        articles={thisIssueData.articles}
        currentSlug={articleData.slug}
        type={NextPrevType.Issues}
      />

      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-y-6">
        <div className="col-span-4 tablet-lg:col-span-12 desktop:col-span-10 desktop:col-start-2">
          <ArticleHead {...{ permalink, thisIssueData, currentSection, articleData }} />
        </div>
        <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2 space-y-6">
          <ArticleBody articleData={articleData} />
        </div>
      </div>

      <NextPrev
        parentCollection={thisIssueData}
        articles={thisIssueData.articles}
        currentSlug={articleData.slug}
        type={NextPrevType.Issues}
      />
    </div>
  )
}

export default ArticlePage
