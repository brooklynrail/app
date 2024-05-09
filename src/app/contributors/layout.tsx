import "../../../styles/uswds/styles.scss"
import IssueRail from "../components/issueRail"
import Link from "next/link"
import Footer from "../components/footer"

export const metadata = {
  title: "The Brooklyn Rail",
  description:
    "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
}

export default function ContributorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`paper`}>
        <div className="hatbox"></div>
        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <header id="article_header">
                  <nav>
                    <div>
                      <Link className="btn search" href="/search" title="Search the Rail">
                        <i className="fas fa-search"></i>
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="btn btn-sm donate"
                        href="https://brooklynrail.org/donate?a"
                        title="Donate to the Brooklyn Rail"
                      >
                        <span>Donate</span>
                      </Link>
                    </div>
                  </nav>
                </header>

                <article className="article">{children}</article>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
