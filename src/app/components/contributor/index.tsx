"use client"
import parse from "html-react-parser"
import { ArticlesContributors, Contributors, Homepage, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import IssueRail from "../issueRail"
import Paper, { PaperType } from "../paper"
import PromoSection from "../promo/section"

interface ContributorPageProps {
  navData: Homepage
  thisIssueData: Issues
  currentArticles: ArticlesContributors[]
  contributorData: Contributors
}

const ContributorPage = (props: ContributorPageProps) => {
  const { thisIssueData, currentArticles, contributorData, navData } = props

  const allArticles = (
    <section className="flex flex-col space-y-6 divide-y-[1px] rail-divide border-t rail-border">
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
    </section>
  )

  const first_name = contributorData.first_name ? parse(contributorData.first_name) : null
  const last_name = contributorData.last_name ? parse(contributorData.last_name) : null

  return (
    <Paper pageClass="paper-contributor" type={PaperType.Default} navData={navData}>
      <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
            <div className="pb-12">
              <header className="py-12">
                <h1 className="font-light text-5xl">
                  {first_name} {last_name}
                </h1>
                {contributorData.bio && <div className="text-lg py-3">{parse(contributorData.bio)}</div>}
              </header>
              {allArticles}
            </div>
          </div>
        </div>
      </main>
    </Paper>
  )
}

export default ContributorPage
