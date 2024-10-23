"use client"
import parse from "html-react-parser"
import { ArticlesContributors, Contributors, Homepage } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Paper, { PaperType } from "../paper"
import PromoSection from "../promo/section"
import PeopleHead from "./head"

interface ContributorPageProps {
  navData: Homepage
  currentArticles: ArticlesContributors[]
  contributorData: Contributors
}

const ContributorPage = (props: ContributorPageProps) => {
  const { currentArticles, contributorData, navData } = props

  const allArticles = (
    <section className="">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12 divide-y rail-divide">
          {currentArticles.map((articleContributor: ArticlesContributors, i: number) => {
            const article = articleContributor.articles_contributors_id
            if (!article) {
              return null
            }
            const issue = article.issue

            const permalink = getPermalink({
              year: issue.year,
              month: issue.month,
              section: article.section.slug,
              slug: article.slug,
              type: PageType.Article,
            })
            const sectionPermalink = getPermalink({
              issueSlug: issue.slug,
              section: article.section.slug,
              type: PageType.Section,
            })
            return (
              <PromoSection
                key={`article-${i}`}
                article={article}
                permalink={permalink}
                sectionPermalink={sectionPermalink}
                showImage={true}
                showSection={true}
              />
            )
          })}
        </div>
      </div>
    </section>
  )

  return (
    <Paper pageClass="paper-people" type={PaperType.Default} navData={navData}>
      <main className="divide-y rail-divide">
        <PeopleHead contributorData={contributorData} />
        <div className="bg-indigo-50 px-3 py-6">{allArticles}</div>
      </main>
    </Paper>
  )
}

export default ContributorPage
