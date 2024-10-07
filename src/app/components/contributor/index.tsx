"use client"
import IssueRail from "../issueRail"
import Header, { HeaderType } from "../header"
import { useTheme } from "../theme"
import { ArticlesContributors, Contributors, Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import PromoSection from "../promo/section"
import parse from "html-react-parser"
import Paper from "../paper"

interface ContributorPageProps {
  thisIssueData: Issues
  currentArticles: ArticlesContributors[]
  contributorData: Contributors
}

const ContributorPage = (props: ContributorPageProps) => {
  const { thisIssueData, currentArticles, contributorData } = props

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
    <Paper pageClass="paper-contributor">
      <main className="px-3 desktop:max-w-screen-widescreen mx-auto">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <aside className="hidden tablet-lg:block col-span-4 tablet-lg:col-span-4 desktop-lg:col-span-3">
            <IssueRail thisIssueData={thisIssueData} />
          </aside>

          <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
            <Header type={HeaderType.Article} />

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
