import { HomepageProps } from "@/pages"

const SlideImage = (props: { showSlide: boolean }) => {
  const { showSlide } = props
  const src = `https://placehold.co/664x282/C57AFF/9D20FF`
  return <img className="bannerimg" src={src} style={{ display: showSlide ? "none" : "block" }} />
}
const SlideShow = (props: HomepageProps) => {
  const { currentIssue, criticsPage } = props
  const { year, month } = currentIssue
  const dateSlug = `${year}/${month}`

  return (
    <>
      <div id="bannercontainer">
        <div id="banner">
          <div id="bannerimg-container">
            <a className="banner" href="/2024/02/art/Paul-Pfeiffer-with-Jonathan-TD-Neil">
              <SlideImage showSlide={false} />
            </a>
            <a className="banner" href="/2024/02/art/Kyungmi-Shin-with-Andrew-Woolbright">
              <SlideImage showSlide={false} />
            </a>
            <a className="banner" href="/2024/02/art/Christopher-Rothko-with-Phong-H-Bui">
              <SlideImage showSlide={false} />
            </a>
            <a className="banner" href="/2024/02/art/James-Welling-with-Robert-Slifkin">
              <SlideImage showSlide={false} />
            </a>
            <a className="banner" href="/2024/02/art/In-Conversation-Sherman-Sam-with-Barry-Schwabsky">
              <SlideImage showSlide={true} />
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
          <div className="bannertext" itemType="http://schema.org/Article" style={{ display: "none" }}>
            <a className="banner" href="/2024/02/art/Paul-Pfeiffer-with-Jonathan-TD-Neil">
              <div className="bannertitle">
                <span itemProp="name">Paul Pfeiffer with Jonathan T.D. Neil </span>
              </div>
            </a>
          </div>
          <div className="bannertext" style={{ display: "none" }} itemType="http://schema.org/Article">
            <a className="banner" href="/2024/02/art/Kyungmi-Shin-with-Andrew-Woolbright">
              <div className="bannertitle">
                <span itemProp="name">Kyungmi Shin with Andrew Woolbright </span>
              </div>
            </a>
          </div>
          <div className="bannertext" style={{ display: "none" }} itemType="http://schema.org/Article">
            <a className="banner" href="/2024/02/art/Christopher-Rothko-with-Phong-H-Bui">
              <div className="bannertitle">
                <span itemProp="name">Christopher Rothko with Phong H. Bui </span>
              </div>
            </a>
          </div>
          <div className="bannertext" style={{ display: "none" }} itemType="http://schema.org/Article">
            <a className="banner" href="/2024/02/art/James-Welling-with-Robert-Slifkin">
              <div className="bannertitle">
                <span itemProp="name">James Welling with Robert Slifkin </span>
              </div>
            </a>
          </div>
          <div className="bannertext" itemType="http://schema.org/Article">
            <a className="banner" href="/2024/02/art/In-Conversation-Sherman-Sam-with-Barry-Schwabsky">
              <div className="bannertitle">
                <span itemProp="name">Sherman Sam with Barry Schwabsky </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default SlideShow
