"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import ArticleBody from "../articleBody"

const ArticlePage = (props: ArticleProps) => {
  return (
    <div className="py-3">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 tablet-lg:divide-x tablet-lg:rail-divide">
        <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2 tablet-lg:pl-3">
          <ArticleBody {...props} />
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
