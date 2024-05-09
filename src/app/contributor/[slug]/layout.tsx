import "../../../../styles/uswds/styles.scss"
import Header from "@/app/components/issuePage/header"

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
        <div className="wrapper home">
          <header role="banner">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row">
                <div className="grid-col-12">
                  <Header />
                </div>
              </div>
            </div>
          </header>

          <section id="main">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-3">
                <div className="grid-col-10">{children}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
