import { HomepageProps } from "@/pages"
import { stripHtml } from "string-strip-html"

const SlideImage = (props: { show: boolean }) => {
  const { show } = props
  const src = `https://placehold.co/664x282/C57AFF/9D20FF`
  return <img className="bannerimg" src={src} style={{ display: show ? "none" : "block" }} />
}

const SlideTitle = (props: { show: boolean; permalink: string; title: string }) => {
  const { show, permalink, title } = props
  return (
    <div className="bannertext" itemType="http://schema.org/Article" style={{ display: show ? "none" : "block" }}>
      <a className="banner" href={permalink}>
        <div className="bannertitle">
          <span itemProp="name">{title}</span>
        </div>
      </a>
    </div>
  )
}

const SlideShow = (props: HomepageProps) => {
  const { dateSlug } = props
  const permalink = `/${dateSlug}/${`sectionSlug`}/${`slug`}`
  const title = `Article Title`

  return (
    <>
      <div id="bannercontainer">
        <div id="banner">
          <div id="bannerimg-container">
            <a className="banner" href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <SlideImage show={false} />
            </a>
            <a className="banner" href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <SlideImage show={false} />
            </a>
            <a className="banner" href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <SlideImage show={false} />
            </a>
            <a className="banner" href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <SlideImage show={false} />
            </a>
            <a className="banner" href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <SlideImage show={false} />
            </a>
          </div>

          <div id="banner-prev" className="bannercontrols" style={{ display: "none", overflow: "hidden" }}>
            <img width="25" src="/images/banner-prev.png" />
          </div>

          <div id="banner-next" className="bannercontrols" style={{ display: "none", overflow: "hidden" }}>
            <img width="25" src="/images/banner-next.png" />
          </div>

          <div id="banner-indicator">
            <table className="fullbannerblock" width="100%" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <div className="bannerblock"></div>
                  </td>
                  <td>
                    <div className="bannerblock"></div>
                  </td>
                  <td>
                    <div className="bannerblock"></div>
                  </td>
                  <td>
                    <div className="bannerblock"></div>
                  </td>
                  <td>
                    <div className="bannerblock showing"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="banner-textblock">
          <SlideTitle show={false} permalink={permalink} title={title} />
          <SlideTitle show={false} permalink={permalink} title={title} />
          <SlideTitle show={false} permalink={permalink} title={title} />
          <SlideTitle show={false} permalink={permalink} title={title} />
          <SlideTitle show={true} permalink={permalink} title={title} />
        </div>
      </div>
    </>
  )
}

export default SlideShow
