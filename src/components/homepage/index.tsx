import { CoverImage } from "../issueRail"
import CoversPopup from "../issueRail/coversPopup"
import Footer from "../footer"
import InConversation from "./inConversation"

const CurrentSections = (props: any) => {
  const { currentIssue, currentSections } = props
  const { year, month } = currentIssue

  return (
    <>
      <div className="issue_sections">
        <ul>
          {currentSections.map((section: any, i: number) => {
            if (i === 0) {
              return (
                <>
                  <li key={i}>
                    <a href={`/${year}/${month}/`} title="Go to the Issue home">
                      Issue Home
                    </a>
                  </li>
                  <li key={i}>
                    <a href={`/${year}/${month}/${section.slug}/`} title={`Go to the ${section.name} section`}>
                      {section.name}
                    </a>
                  </li>
                </>
              )
            }
            return (
              <li key={i}>
                <a href={`/${year}/${month}/${section.slug}/`} title={`Go to the ${section.name} section`}>
                  {section.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

const Homepage = (props: any) => {
  const currentIssue = props.currentIssue
  const { slug, title, articles, cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 } = currentIssue
  const coverImageProps = { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 }

  return (
    <>
      <div className="paper">
        <div className="hatbox"></div>
        <div className="wrapper home">
          <header role="banner">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row">
                <div className="grid-col-12">
                  <div id="header_section">
                    <div className="logo">
                      <div id="textflag">
                        <h1>The Brooklyn Rail </h1>
                        <h2>Critical Perspectives on Art, Politics and Culture</h2>
                        <h3>FEB 2024</h3>
                      </div>
                      <a href="/">
                        <img
                          src="/images/brooklynrail-logo-ex.svg"
                          height="68"
                          alt="The Brooklyn Rail"
                          title="Brooklyn Rail Home"
                        />
                      </a>
                    </div>

                    <nav>
                      <ul>
                        <li>
                          <a href="/about?h" title="About">
                            <span>About</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://brooklynrail.org/events?h" title="Events">
                            <span>Events</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://mailchi.mp/brooklynrail/join/?h" title="Subscribe to our newsletter">
                            <span>Newsletter</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://shop.brooklynrail.org/products/subscription?h" title="Subscribe">
                            <span>Subscribe</span>
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="https://shop.brooklynrail.org?h" title="Shop">
                            <span>Shop</span>
                          </a>
                        </li>
                        <li className="btn btn-donate">
                          <a href="https://brooklynrail.org/donate?h" title="Donate">
                            <span>Donate</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="banner">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row">
                <div className="grid-col-12">
                  <div className="ad ad_970 visible">
                    <p>Advertisement</p>
                    <div>
                      <div className="ad">
                        <a
                          href=" https://goldenartistcolors.com/products/qor-artist-watercolors-ali-cavanaugh-portrait-colors-set"
                          target="_blank"
                        >
                          <img
                            className="image_desktop"
                            alt="Advertisement: Golden Paint"
                            src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/WPRHHsf09kftsowSoocwdw/bFfgTXwUcSXU_KF-bns9k9cC17wLV7bUTLxqzLPdIS5s_kzE-MwVfRDQlw1Fi4ebAoH3TriX1fucMASdR71tIged4YryIsSoSTwmZR6mN09gotzN8nAfbDqtVeZu-6yvkKs00pBg9R2-5WORpyM9gsL_UklFQ2WgFsFl3K_jutk/ze9x4wGsY8b1gtwCVVg3JHuwUpL9RRWZE5Qma1wRFUs"
                          />
                          <img
                            className="image_mobile"
                            alt="Advertisement: Golden Paint"
                            src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/wikViUKRbFNARAlP535NxQ/Y3gZJWISdLBtIXs_yE-4JR1ZE7UCHEuxu8MUCDw4wbUm-pUU2zkHGB5GvR--qcwFqfVW8s6HQISMEf0Xd_4uSTZ9Zc49EwZ9jE7eu18NAXKQz3kVBzIPq99i3bKVs3FdY9ssReTnZ05-nZ7pPLyDNDdiVGrOqJXyU1WUlTcKpLM/amEK1rNRESuTmjSEMZxMTQkU7vkpgl84WP5G9bBVbzQ"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="main">
            <div className="grid-container grid-container-desktop">
              <div className="grid-row grid-gap-3">
                <div className="grid-col-2">
                  <div id="issuecolumn">
                    <div className="youarehereissue">
                      <select id="issue_select" name="issue">
                        <option selected value="/2024/02/">
                          FEB 2024
                        </option>
                        <option value="/2023/12/">DEC 23-JAN 24</option>
                        <option value="/2023/11/">NOV 2023</option>
                        <option value="/2023/10/">OCT 2023</option>
                        <option value="/2023/09/">SEPT 2023</option>
                        <option value="/2023/07/">JULY/AUG 2023</option>
                        <option value="/2023/06/">JUNE 2023</option>
                        <option value="/2023/05/">MAY 2023</option>
                        <option value="/2023/04/">APRIL 2023</option>
                        <option value="/2023/03/">MARCH 2023</option>
                        <option value="/2023/02/">FEB 2023</option>
                        <option value="/2022/12/">DEC 22–JAN 23</option>
                        <option value="/2022/11/">NOV 2022</option>
                        <option value="/2022/10/">OCT 2022</option>
                        <option value="/2022/09/">SEPT 2022</option>
                        <option value="/2022/07/">JUL-AUG 2022</option>
                        <option value="/2022/06/">JUNE 2022</option>
                        <option value="/2022/05/">MAY 2022</option>
                        <option value="/2022/04/">APRIL 2022</option>
                        <option value="/2022/03/">MARCH 2022</option>
                        <option value="/2022/02/">FEB 2022</option>
                        <option value="/2021/12/">DEC 21-JAN 22</option>
                        <option value="/2021/11/">NOV 2021</option>
                        <option value="/2021/10/">OCT 2021</option>
                        <option value="/2021/09/">SEPT 2021</option>
                        <option value="/special/River_Rail_Puerto_Rico/">River Rail Puerto Rico</option>
                        <option value="/2021/07/">JUL-AUG 2021</option>
                        <option value="/2021/06/">JUNE 2021</option>
                        <option value="/2021/05/">MAY 2021</option>
                        <option value="/2021/04/">APRIL 2021</option>
                        <option value="/2021/03/">MARCH 2021</option>
                        <option value="/2021/02/">FEB 2021</option>
                        <option value="/2020/12/">DEC 20-JAN 21</option>
                        <option value="/2020/11/">NOV 2020</option>
                        <option value="/2020/10/">OCT 2020</option>
                        <option value="/2020/09/">SEPT 2020</option>
                        <option value="/2020/07/">JUL-AUG 2020</option>
                        <option value="/2020/06/">JUNE 2020</option>
                        <option value="/2020/05/">MAY 2020</option>
                        <option value="/2020/04/">APRIL 2020</option>
                        <option value="/2020/03/">MAR 2020</option>
                        <option value="/2020/02/">FEB 2020</option>
                        <option value="/2019/12/">DEC 19-JAN 20</option>
                        <option value="/2019/11/">NOV 2019</option>
                        <option value="/2019/10/">OCT 2019</option>
                        <option value="/special/River_Rail_Colby/">River Rail Colby</option>
                        <option value="/2019/09/">SEPT 2019</option>
                        <option value="/2019/07/">JUL-AUG 2019</option>
                        <option value="/2019/06/">JUNE 2019</option>
                        <option value="/2019/05/">MAY 2019</option>
                        <option value="/2019/04/">APR 2019</option>
                        <option value="/2019/03/">MAR 2019</option>
                        <option value="/2019/02/">FEB 2019</option>
                        <option value="/2018/12/">DEC 18-JAN 19</option>
                        <option value="/2018/11/">NOV 2018</option>
                        <option value="/2018/10/">OCT 2018</option>
                        <option value="/2018/09/">SEPT 2018</option>
                        <option value="/2018/07/">JUL-AUG 2018</option>
                        <option value="/2018/06/">JUNE 2018</option>
                        <option value="/2018/05/">MAY 2018</option>
                        <option value="/2018/04/">APR 2018</option>
                        <option value="/2018/03/">MAR 2018</option>
                        <option value="/2018/02/">FEB 2018</option>
                        <option value="/special/RIVER_RAIL/">RIVER RAIL</option>
                        <option value="/2017/12/">DEC 17-JAN 18</option>
                        <option value="/2017/11/">NOV 2017</option>
                        <option value="/2017/10/">OCT 2017</option>
                        <option value="/2017/09/">SEPT 2017</option>
                        <option value="/2017/07/">JUL-AUG 2017</option>
                        <option value="/special/I_LOVE_JOHN_GIORNO/">I LOVE JOHN GIORNO</option>
                        <option value="/2017/06/">JUNE 2017</option>
                        <option value="/2017/05/">MAY 2017</option>
                        <option value="/2017/04/">APR 2017</option>
                        <option value="/2017/03/">MAR 2017</option>
                        <option value="/2017/02/">FEB 2017</option>
                        <option value="/2016/12/">DEC 16-JAN 17</option>
                        <option value="/2016/11/">NOV 2016</option>
                        <option value="/2016/10/">OCT 2016</option>
                        <option value="/2016/09/">SEPT 2016</option>
                        <option value="/2016/07/">JUL-AUG 2016</option>
                        <option value="/2016/06/">JUNE 2016</option>
                        <option value="/2016/05/">MAY 2016</option>
                        <option value="/2016/04/">APR 2016</option>
                        <option value="/2016/03/">MAR 2016</option>
                        <option value="/2016/02/">FEB 2016</option>
                        <option value="/2015/12/">DEC 15-JAN 16</option>
                        <option value="/2015/11/">NOV 2015</option>
                        <option value="/2015/10/">OCT 2015</option>
                        <option value="/2015/09/">SEPT 2015</option>
                        <option value="/2015/07/">JUL-AUG 2015</option>
                        <option value="/2015/06/">JUNE 2015</option>
                        <option value="/2015/05/">MAY 2015</option>
                        <option value="/2015/04/">APR 2015</option>
                        <option value="/2015/03/">MAR 2015</option>
                        <option value="/2015/02/">FEB 2015</option>
                        <option value="/2014/12/">DEC 14-JAN 15</option>
                        <option value="/2014/11/">NOV 2014</option>
                        <option value="/2014/10/">OCT 2014</option>
                        <option value="/2014/09/">SEPT 2014</option>
                        <option value="/2014/07/">JUL-AUG 2014</option>
                        <option value="/2014/06/">JUNE 2014</option>
                        <option value="/2014/05/">MAY 2014</option>
                        <option value="/special/ART_CRIT_EUROPE/">ART CRIT EUROPE</option>
                        <option value="/2014/04/">APR 2014</option>
                        <option value="/2014/03/">MAR 2014</option>
                        <option value="/2014/02/">FEB 2014</option>
                        <option value="/special/AD_REINHARDT/">AD REINHARDT</option>
                        <option value="/2013/12/">DEC 13-JAN 14</option>
                        <option value="/2013/11/">NOV 2013</option>
                        <option value="/2013/10/">OCT 2013</option>
                        <option value="/2013/09/">SEPT 2013</option>
                        <option value="/2013/07/">JUL-AUG 2013</option>
                        <option value="/2013/06/">JUNE 2013</option>
                        <option value="/2013/05/">MAY 2013</option>
                        <option value="/2013/04/">APR 2013</option>
                        <option value="/2013/03/">MAR 2013</option>
                        <option value="/2013/02/">FEB 2013</option>
                        <option value="/2012/12/">DEC 12-JAN 13</option>
                        <option value="/2012/11/">NOV 2012</option>
                        <option value="/2012/10/">OCT 2012</option>
                        <option value="/2012/09/">SEPT 2012</option>
                        <option value="/2012/08/">JUL-AUG 2012</option>
                        <option value="/2012/06/">JUNE 2012</option>
                        <option value="/2012/05/">MAY 2012</option>
                        <option value="/2012/04/">APR 2012</option>
                        <option value="/2012/03/">MAR 2012</option>
                        <option value="/2012/02/">FEB 2012</option>
                        <option value="/2011/12/">DEC 11-JAN 12</option>
                        <option value="/2011/11/">NOV 2011</option>
                        <option value="/2011/10/">OCT 2011</option>
                        <option value="/2011/09/">SEPT 2011</option>
                        <option value="/2011/07/">JUL-AUG 2011</option>
                        <option value="/2011/06/">JUNE 2011</option>
                        <option value="/2011/05/">MAY 2011</option>
                        <option value="/2011/04/">APR 2011</option>
                        <option value="/2011/03/">MAR 2011</option>
                        <option value="/2011/02/">FEB 2011</option>
                        <option value="/2010/12/">DEC 10-JAN 11</option>
                        <option value="/2010/11/">NOV 2010</option>
                        <option value="/2010/10/">OCT 2010</option>
                        <option value="/2010/09/">SEPT 2010</option>
                        <option value="/2010/07/">JUL-AUG 2010</option>
                        <option value="/2010/06/">JUNE 2010</option>
                        <option value="/2010/05/">MAY 2010</option>
                        <option value="/2010/04/">APR 2010</option>
                        <option value="/2010/03/">MAR 2010</option>
                        <option value="/2010/02/">FEB 2010</option>
                        <option value="/2009/12/">DEC 09-JAN 10</option>
                        <option value="/2009/11/">NOV 2009</option>
                        <option value="/2009/10/">OCT 2009</option>
                        <option value="/2009/09/">SEPT 2009</option>
                        <option value="/2009/07/">JUL-AUG 2009</option>
                        <option value="/2009/06/">JUNE 2009</option>
                        <option value="/2009/05/">MAY 2009</option>
                        <option value="/2009/04/">APRIL 2009</option>
                        <option value="/2009/03/">MARCH 2009</option>
                        <option value="/2009/02/">FEB 2009</option>
                        <option value="/2008/12/">DEC 08-JAN 09</option>
                        <option value="/2008/11/">NOV 2008</option>
                        <option value="/2008/10/">OCT 2008</option>
                        <option value="/2008/09/">SEPT 2008</option>
                        <option value="/2008/07/">JUL-AUG 2008</option>
                        <option value="/2008/06/">JUN 2008</option>
                        <option value="/2008/05/">MAY 2008</option>
                        <option value="/2008/04/">APR 2008</option>
                        <option value="/2008/03/">MAR 2008</option>
                        <option value="/2008/02/">FEB 2008</option>
                        <option value="/2007/12/">DEC 07-JAN 08</option>
                        <option value="/2007/11/">NOV 2007</option>
                        <option value="/2007/10/">OCT 2007</option>
                        <option value="/2007/09/">SEPT 2007</option>
                        <option value="/2007/07/">JUL-AUG 2007</option>
                        <option value="/2007/06/">JUN 2007</option>
                        <option value="/2007/05/">MAY 2007</option>
                        <option value="/2007/04/">APR 2007</option>
                        <option value="/2007/03/">MAR 2007</option>
                        <option value="/2007/02/">FEB 2007</option>
                        <option value="/2006/12/">DEC 06-JAN 07</option>
                        <option value="/2006/11/">NOV 2006</option>
                        <option value="/2006/10/">OCT 2006</option>
                        <option value="/2006/09/">SEPT 2006</option>
                        <option value="/2006/07/">JUL-AUG 2006</option>
                        <option value="/2006/06/">JUN 2006</option>
                        <option value="/2006/05/">MAY 2006</option>
                        <option value="/2006/04/">APR 2006</option>
                        <option value="/2006/03/">MAR 2006</option>
                        <option value="/2006/02/">FEB 2006</option>
                        <option value="/2005/12/">DEC 05-JAN 06</option>
                        <option value="/2005/11/">NOV 2005</option>
                        <option value="/2005/10/">OCT 2005</option>
                        <option value="/2005/09/">SEPT 2005</option>
                        <option value="/2005/07/">JUL-AUG 2005</option>
                        <option value="/2005/06/">JUN 2005</option>
                        <option value="/2005/05/">MAY 2005</option>
                        <option value="/2005/04/">APR 2005</option>
                        <option value="/2005/03/">MAR 2005</option>
                        <option value="/2005/02/">FEB 2005</option>
                        <option value="/2005/01/">DEC 04-JAN 05</option>
                        <option value="/2004/11/">NOV 2004</option>
                        <option value="/2004/10/">OCT 2004</option>
                        <option value="/2004/09/">SEPT 2004</option>
                        <option value="/2004/07/">JUL-AUG 2004</option>
                        <option value="/2004/06/">JUN 2004</option>
                        <option value="/2004/05/">MAY 2004</option>
                        <option value="/2004/04/">APR 2004</option>
                        <option value="/2004/03/">MAR 2004</option>
                        <option value="/2004/02/">FEB 2004</option>
                        <option value="/2004/01/">DEC 03-JAN 04</option>
                        <option value="/2003/12/">WINTER 2003</option>
                        <option value="/2003/11/">NOV 2003</option>
                        <option value="/2003/10/">OCT 2003</option>
                        <option value="/2003/08/">AUG-SEPT 2003</option>
                        <option value="/2003/07/">SUMMER 03</option>
                        <option value="/2003/06/">JUN-JUL 2003</option>
                        <option value="/2003/04/">APR-MAY 2003</option>
                        <option value="/2002/10/">AUTUMN 2002</option>
                        <option value="/2002/08/">AUG-SEPT 2002</option>
                        <option value="/2002/07/">EARLY SUMMER 2002</option>
                        <option value="/2002/03/">MARCH-APRIL 2002</option>
                        <option value="/2002/01/">JAN-FEB 2002</option>
                        <option value="/2001/10/">OCT-NOV 01</option>
                        <option value="/2001/08/">JULY-AUG 2001</option>
                        <option value="/2001/05/">MAY-JUNE 2001</option>
                        <option value="/2001/02/">FEB-MARCH 2001</option>
                        <option value="/2000/12/">DEC 00-JAN 01</option>
                        <option value="/2000/10/">OCT-NOV 2000</option>
                      </select>
                      <CoverImage {...coverImageProps} />
                    </div>

                    <CurrentSections {...props} />

                    <a className="search_btn" href="/search" title="Search All Issues">
                      <span>Search</span> <i className="fas fa-search"></i>
                    </a>
                    <a className="archives_btn" href="/archives" title="View Archive">
                      <span>View Archive</span>
                    </a>

                    <div className="related rail_projects">
                      <a href="https://shop.brooklynrail.org/collections/books" target="out-rail">
                        <img src="/images/banners-left/Rail-Ed-WEB.jpg" />
                      </a>

                      <a href="http://curatorialprojects.brooklynrail.org/occupy-mana" target="out-rail">
                        <img src="/images/banners-left/rail_curatorial_projects_logo.png" />
                      </a>

                      <a href="https://brooklynrail.org/special/RIVER_RAIL/">
                        <img src="/images/banners-left/river-rail-logo.png" />
                      </a>

                      <a href="http://miamirail.org/" target="out-rail">
                        <img src="/images/banners-left/miami_rail_logo.png" />
                      </a>

                      <a href="http://thirdrailquarterly.org/" target="out-rail">
                        <img src="/images/banners-left/third_rail_logo.jpg" />
                      </a>
                    </div>

                    <div className="related rail_partners">
                      <a href="https://www.metabolicstudio.org/" target="out-rail">
                        <img src="/images/banners-left/metabolic-studio.png" width="162" />
                      </a>

                      <a href="https://www.philipguston.org/home" target="out-rail">
                        <img src="/images/banners-left/guston-foundation.jpg" width="162" />
                      </a>

                      <a href="http://louiscomforttiffanyfoundation.org/" target="out-rail">
                        <img src="/images/banners-left/LCTF_darkgrey_6.png" width="162" />
                      </a>

                      <a href="https://www.dedalusfoundation.org/" target="out-rail">
                        <img src="/images/banners-left/DEDALUS_FOUNDATION_Logotype2.jpg" width="162" />
                      </a>

                      <a href="https://www.ulae.com/" target="out-rail">
                        <img src="/images/banners-left/ulae-logo.png" width="162" />
                      </a>

                      <a href="http://anthologyfilmarchives.org/" target="out-rail">
                        <img src="/images/banners-left/AFALogotypeWhite.jpg" width="162" />
                      </a>

                      <a href="https://thestudioprogram.com/?br" target="out-rail">
                        <img src="/images/banners-left/sharpe-walentas.jpg" width="162" />
                      </a>

                      <a href="https://www.glasserienyc.com/?br" target="out-rail">
                        <img src="/images/banners-left/glasserie-card.png" width="162" />
                      </a>

                      <a href="http://studioinaschool.org/" target="out-rail">
                        <img src="/images/banners-left/STUDIO_LOGO_COLOR.jpg" width="162" />
                      </a>

                      <a href="https://secondshiftstudiospace.org/" target="out-rail">
                        <img src="/images/banners-left/second_shift_ad.jpg" width="162" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="grid-col-8">
                  <div className="grid-row">
                    <div className="grid-col-12">
                      <div id="bannercontainer">
                        <div id="banner">
                          <div id="bannerimg-container">
                            <a className="banner" href="/2024/02/art/Paul-Pfeiffer-with-Jonathan-TD-Neil">
                              <img
                                className="bannerimg"
                                src="https://storage.googleapis.com/rail-legacy-media/production/content/article/banner_image/20851/pfeiffer-homepage.jpg"
                                style={{ display: "none" }}
                              />
                            </a>
                            <a className="banner" href="/2024/02/art/Kyungmi-Shin-with-Andrew-Woolbright">
                              <img
                                className="bannerimg"
                                style={{ display: "none" }}
                                src="https://storage.googleapis.com/rail-legacy-media/production/content/article/banner_image/20853/shin-homepage.jpg"
                              />
                            </a>
                            <a className="banner" href="/2024/02/art/Christopher-Rothko-with-Phong-H-Bui">
                              <img
                                className="bannerimg"
                                style={{ display: "none" }}
                                src="https://storage.googleapis.com/rail-legacy-media/production/content/article/banner_image/20889/rothko-homepage.jpg"
                              />
                            </a>
                            <a className="banner" href="/2024/02/art/James-Welling-with-Robert-Slifkin">
                              <img
                                className="bannerimg"
                                style={{ display: "none" }}
                                src="https://storage.googleapis.com/rail-legacy-media/production/content/article/banner_image/20852/welling-homepage.jpg"
                              />
                            </a>
                            <a className="banner" href="/2024/02/art/In-Conversation-Sherman-Sam-with-Barry-Schwabsky">
                              <img
                                className="bannerimg"
                                src="https://storage.googleapis.com/rail-legacy-media/production/content/article/banner_image/20914/sam-homepage.jpg"
                              />
                            </a>
                          </div>

                          <div
                            id="banner-prev"
                            className="bannercontrols"
                            style={{ display: "none", overflow: "hidden" }}
                          >
                            <img width="25" src="/images/banner-prev.png" />
                          </div>

                          <div
                            id="banner-next"
                            className="bannercontrols"
                            style={{ display: "none", overflow: "hidden" }}
                          >
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
                    </div>
                  </div>

                  <div className="grid-row grid-gap-4">
                    <div className="grid-col-6">
                      <InConversation {...props} />
                    </div>
                    <div className="grid-col-6">
                      <div className="collection">
                        <h3>From the Publisher &amp; Artistic Director</h3>

                        <div className="promo promo-thumb">
                          <h4>
                            <a href="/2024/02/publishersmessage/Dear-Friends-and-Readers-feb-24" itemProp="name">
                              Dear Friends and Readers
                            </a>
                          </h4>

                          <cite className="byline">By Phong Bui </cite>

                          <p className="excerpt" itemProp="about">
                            Though the advent of social media has created a brilliant democratic openness, those same
                            social media also carry a lot of destructive tendencies. Many of us remember that we once
                            received thoughtful letters from people who agreed or disagreed with what we may have voiced
                            in an essay, an exhibition, or a lecture; and we knew that those complimentary or dissenting
                            responses each required a certain amount of time to compose.{" "}
                          </p>
                        </div>
                      </div>

                      <div className="collection">
                        <h3>Editor's Message</h3>

                        <div className="promo promo-thumb">
                          <div className="media media-thumb">
                            <a href="/2024/02/editorsmessage/Captives-of-Heartbrache">
                              <img
                                src="https://brooklynrail.imgix.net/content/article/thumb_image/20893/soboleva-ksenia-thmb.jpg?"
                                alt=""
                              />
                            </a>
                          </div>

                          <h4>
                            <a href="/2024/02/editorsmessage/Captives-of-Heartbrache" itemProp="name">
                              Captives of Heartbr(ache)
                            </a>
                          </h4>

                          <cite className="byline">By Ksenia Soboleva </cite>

                          <p className="excerpt" itemProp="about">
                            I’m writing the introduction to this month’s Critics Page as the year 2023 is coming to an
                            end, a year in which I’ve spent much time with the idea of queer heartbr(ache). It began
                            when my friend and cosmic mirror (our birthdays are exactly six months apart) Le’Andra
                            LeSeur and I had our first significant heart to heart about recent breakups that had left us
                            tender.
                          </p>
                        </div>
                      </div>

                      <div className="collection">
                        <h3>Critics Page</h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Borderlands" itemProp="name">
                                Borderlands{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Andrea Geyer </cite>
                          </li>

                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Knotted-Lives" itemProp="name">
                                Knotted Lives{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Cassie Packard </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Untitled-M4U-The-Eulogists" itemProp="name">
                                Untitled (M4U: The Eulogists){" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Elliott Jerome Brown Jr. </cite>
                          </li>

                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Wasnt-there-always-a-war" itemProp="name">
                                Wasn’t there always a war?{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Gala Mukomolova </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Dear-Lina" itemProp="name">
                                Dear Lina,{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Jill H. Casid </cite>
                          </li>

                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/That-body-of-a-reflection-of-the-sky" itemProp="name">
                                That body of (a reflection of the sky){" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Le’Andra LeSeur </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Slow-Abandon" itemProp="name">
                                Slow Abandon{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Mev Luna </cite>
                          </li>

                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Insufficient-Memory" itemProp="name">
                                Insufficient Memory{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Sean Fader </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/A-White-Rose-in-a-Mirror-of-Silver" itemProp="name">
                                A White Rose in a Mirror of Silver{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Rachel Stern </cite>
                          </li>

                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Nancy-Brooks-Brody-1" itemProp="name">
                                Nancy Brooks Brody{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By fierce pussy </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/The-ant" itemProp="name">
                                The ant{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Timmy Straw </cite>
                          </li>

                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Complicity-1" itemProp="name">
                                Complicity #1{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Wendy Lotterman </cite>
                          </li>
                        </ul>
                      </div>

                      <div className="collection">
                        <h3>ArtSeen</h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Faith-Ringgold-American-People-Baker" itemProp="name">
                                Faith Ringgold:<em> American People</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Chenoa Baker </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/James-Welling-Thought-Objects" itemProp="name">
                                James Welling: <em>Thought Objects</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Michael Shorris </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/George-Rickey-Wall-Reliefs-and-Mark-Yang-Birth" itemProp="name">
                                George Rickey: <em>Wall Reliefs</em> <br />
                                and Mark Yang: <em>Birth</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Mary Ann Caws </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Tamara-Gonzales-Amplifiers" itemProp="name">
                                Tamara Gonzales: <em>Amplifiers</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Charles Schultz </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Daniel-Guzmn-the-man-who-should-be-dead-notes-on-the-dead-house-the-fire-and-the-tale"
                                itemProp="name"
                              >
                                Daniel Guzmán:{" "}
                                <em>the man who should be dead: notes on the dead house, the fire and the tale</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Nicholas Heskes </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Raphaela-Vogel-In-The-Expanded-Penalty-Box-Did-You-Happen-to-See-the-Most-Beautiful-Fox"
                                itemProp="name"
                              >
                                Raphaela Vogel:{" "}
                                <em>In The Expanded Penalty Box: Did You Happen to See the Most Beautiful Fox?</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Cassie Packard </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Sarah-Rosalena-In-All-Directions" itemProp="name">
                                Sarah Rosalena:<em> In All Directions </em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Lindsay Caplan </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/John-Hoyland-Thresholds-Paintings-1965-1970" itemProp="name">
                                John Hoyland: <em>Thresholds: Paintings 1965-1970</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Alex Grimley </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Richard-Artschwager-Boxed-In-Celebrating-the-Artists-Centennial"
                                itemProp="name"
                              >
                                Richard Artschwager:{" "}
                                <em>
                                  Boxed In <br /> Celebrating the Artist’s Centennial
                                </em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Alfred Mac Adam </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Chicago-Architectural-Biennial-5-This-is-a-Rehearsal"
                                itemProp="name"
                              >
                                <em>Chicago Architectural Biennial 5: This is a Rehearsal</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Pia Singh </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Ed-Ruscha-Works-on-Paper" itemProp="name">
                                Ed Ruscha: <em>Works on Paper</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Ekin Erkan </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Stephen-Antonakos-Neon-and-Geometry" itemProp="name">
                                Stephen Antonakos: <em>Neon and Geometry</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Vincent Katz </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Trespassers-James-Prosek-and-the-Texas-Prairie" itemProp="name">
                                <em>Trespassers: James Prosek and the Texas Prairie</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Andrew Paul Woolbright </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Mark-Rothko-Paintings-on-Paper" itemProp="name">
                                Mark Rothko: <em>Paintings on Paper</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Amanda Millet-Sorsa </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Amy-Butowicz-Rapture-in-the-Fold" itemProp="name">
                                Amy Butowicz: <em>Rapture in the Fold</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Elizabeth Buhe </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Lois-Dodd-Outside-In" itemProp="name">
                                Lois Dodd: <em>Outside In</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Louis Block </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Abstract-Flash-Unseen-Andrew-Wyeth" itemProp="name">
                                <em>Abstract Flash: Unseen Andrew Wyeth</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By James Welling </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Saul-Leiter-Centennial" itemProp="name">
                                Saul Leiter: <em>Centennial</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Michael Shorris </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Sandra-Cinto-May-I-Know-How-to-be-the-Sun-on-Cloudy-Days"
                                itemProp="name"
                              >
                                Sandra Cinto: <em>May I Know How to be the Sun on Cloudy Days</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Annabel Keenan </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Suneil-Sanzgiri-Here-the-Earth-Grows-Gold" itemProp="name">
                                Suneil Sanzgiri: <em>Here the Earth Grows Gold</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Dina A. Ramadan </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Ash-Arder-Flesh-Tones" itemProp="name">
                                Ash Arder: <em>Flesh Tones</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Steve Panton </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Eileen-Agar-Flowering-of-a-Wing-Works-19361989" itemProp="name">
                                Eileen Agar: <em>Flowering of a Wing, Works: 1936–1989</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Ann C. Collins </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Carey-Young-Appearance-1" itemProp="name">
                                Carey Young: <em>Appearance</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By William Corwin </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Julian-Charrire-Buried-Sunshine" itemProp="name">
                                Julian Charrière: <em>Buried Sunshine</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Ekin Erkan </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/This-Isnt-Who-It-Would-Be-If-It-Wasnt-Who-It-Is"
                                itemProp="name"
                              >
                                <em>This Isn’t Who It Would Be, If It Wasn’t Who It Is</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Alfred Mac Adam </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Yoonhee-Ryoony-Suh-Memory-Gap" itemProp="name">
                                Yoonhee Ryoony Suh: <em>Memory Gap</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Jessica Holmes </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Leon-Polk-Smith-1940-1961" itemProp="name">
                                <em>Leon Polk Smith: 1940–1961</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Tom McGlynn </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Robert-Grosvenor-1" itemProp="name">
                                Robert Grosvenor{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By William Corwin </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/David-Rhodes-ALETHEIA" itemProp="name">
                                David Rhodes: <em>Aletheia</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Saul Ostrow </cite>
                          </li>
                          <li className="promo promo-slim promo-slim-alt" itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/John-OConnor-Man-Bites-Dog-Bites-Man" itemProp="name">
                                John O’Connor: <em>Man Bites Dog Bites Man</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Andrew Paul Woolbright </cite>
                          </li>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Stanley-Whitney-Dear-Paris" itemProp="name">
                                Stanley Whitney: <em>Dear Paris</em>{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Jacob Bromberg </cite>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid-row">
                    <div className="grid-col-12">
                      <div className="collection table-of-contents">
                        <h2>Table of Contents</h2>

                        <h3>
                          <a href="/2024/2/publishersmessage" title="Go to Publisher's Message">
                            Publisher's Message
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/publishersmessage/Dear-Friends-and-Readers-feb-24" itemProp="name">
                                Dear Friends and Readers{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Phong Bui </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/editorsmessage" title="Go to Editor's Message">
                            Editor's Message
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/editorsmessage/Captives-of-Heartbrache" itemProp="name">
                                Captives of Heartbr(ache){" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Ksenia Soboleva </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/art" title="Go to Art">
                            Art
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art/In-Conversation-Sherman-Sam-with-Barry-Schwabsky" itemProp="name">
                                Sherman Sam with Barry Schwabsky{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art/Christopher-Rothko-with-Phong-H-Bui" itemProp="name">
                                Christopher Rothko with Phong H. Bui{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art/Paul-Pfeiffer-with-Jonathan-TD-Neil" itemProp="name">
                                Paul Pfeiffer with Jonathan T.D. Neil{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art/James-Welling-with-Robert-Slifkin" itemProp="name">
                                James Welling with Robert Slifkin{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art/Kyungmi-Shin-with-Andrew-Woolbright" itemProp="name">
                                Kyungmi Shin with Andrew Woolbright{" "}
                              </a>
                            </h4>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/artseen" title="Go to ArtSeen">
                            ArtSeen
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Faith-Ringgold-American-People-Baker" itemProp="name">
                                Faith Ringgold: American People{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Chenoa Baker </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/James-Welling-Thought-Objects" itemProp="name">
                                James Welling: Thought Objects{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Michael Shorris </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/George-Rickey-Wall-Reliefs-and-Mark-Yang-Birth" itemProp="name">
                                George Rickey: Wall Reliefs and Mark Yang: Birth{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Mary Ann Caws </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Tamara-Gonzales-Amplifiers" itemProp="name">
                                Tamara Gonzales: Amplifiers{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Charles Schultz </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Daniel-Guzmn-the-man-who-should-be-dead-notes-on-the-dead-house-the-fire-and-the-tale"
                                itemProp="name"
                              >
                                Daniel Guzmán: the man who should be dead: notes on the dead house, the fire and the
                                tale{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Nicholas Heskes </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Raphaela-Vogel-In-The-Expanded-Penalty-Box-Did-You-Happen-to-See-the-Most-Beautiful-Fox"
                                itemProp="name"
                              >
                                Raphaela Vogel: In The Expanded Penalty Box: Did You Happen to See the Most Beautiful
                                Fox?{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Cassie Packard </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Sarah-Rosalena-In-All-Directions" itemProp="name">
                                Sarah Rosalena: In All Directions{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Lindsay Caplan </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/John-Hoyland-Thresholds-Paintings-1965-1970" itemProp="name">
                                John Hoyland: Thresholds: Paintings 1965-1970{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Alex Grimley </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Richard-Artschwager-Boxed-In-Celebrating-the-Artists-Centennial"
                                itemProp="name"
                              >
                                Richard Artschwager: Boxed In Celebrating the Artist’s Centennial{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Alfred Mac Adam </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Chicago-Architectural-Biennial-5-This-is-a-Rehearsal"
                                itemProp="name"
                              >
                                Chicago Architectural Biennial 5: This is a Rehearsal{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Pia Singh </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Ed-Ruscha-Works-on-Paper" itemProp="name">
                                Ed Ruscha: Works on Paper{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Ekin Erkan </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Stephen-Antonakos-Neon-and-Geometry" itemProp="name">
                                Stephen Antonakos: Neon and Geometry{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Vincent Katz </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Trespassers-James-Prosek-and-the-Texas-Prairie" itemProp="name">
                                Trespassers: James Prosek and the Texas Prairie{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Andrew Paul Woolbright </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Mark-Rothko-Paintings-on-Paper" itemProp="name">
                                Mark Rothko: Paintings on Paper{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Amanda Millet-Sorsa </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Amy-Butowicz-Rapture-in-the-Fold" itemProp="name">
                                Amy Butowicz: Rapture in the Fold{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Elizabeth Buhe </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Lois-Dodd-Outside-In" itemProp="name">
                                Lois Dodd: Outside In{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Louis Block </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Abstract-Flash-Unseen-Andrew-Wyeth" itemProp="name">
                                Abstract Flash: Unseen Andrew Wyeth{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By James Welling </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Saul-Leiter-Centennial" itemProp="name">
                                Saul Leiter: Centennial{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Michael Shorris </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/Sandra-Cinto-May-I-Know-How-to-be-the-Sun-on-Cloudy-Days"
                                itemProp="name"
                              >
                                Sandra Cinto: May I Know How to be the Sun on Cloudy Days{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Annabel Keenan </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Suneil-Sanzgiri-Here-the-Earth-Grows-Gold" itemProp="name">
                                Suneil Sanzgiri: Here the Earth Grows Gold{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Dina A. Ramadan </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Ash-Arder-Flesh-Tones" itemProp="name">
                                Ash Arder: Flesh Tones{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Steve Panton </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Eileen-Agar-Flowering-of-a-Wing-Works-19361989" itemProp="name">
                                Eileen Agar: Flowering of a Wing, Works: 1936–1989{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Ann C. Collins </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Carey-Young-Appearance-1" itemProp="name">
                                Carey Young: Appearance{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By William Corwin </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Julian-Charrire-Buried-Sunshine" itemProp="name">
                                Julian Charrière: Buried Sunshine{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Ekin Erkan </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/artseen/This-Isnt-Who-It-Would-Be-If-It-Wasnt-Who-It-Is"
                                itemProp="name"
                              >
                                This Isn’t Who It Would Be, If It Wasn’t Who It Is{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Alfred Mac Adam </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Yoonhee-Ryoony-Suh-Memory-Gap" itemProp="name">
                                Yoonhee Ryoony Suh: Memory Gap{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Jessica Holmes </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Leon-Polk-Smith-1940-1961" itemProp="name">
                                Leon Polk Smith: 1940–1961{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Tom McGlynn </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Robert-Grosvenor-1" itemProp="name">
                                Robert Grosvenor{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By William Corwin </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/David-Rhodes-ALETHEIA" itemProp="name">
                                David Rhodes: Aletheia{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Saul Ostrow </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/John-OConnor-Man-Bites-Dog-Bites-Man" itemProp="name">
                                John O’Connor: Man Bites Dog Bites Man{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Andrew Paul Woolbright </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/artseen/Stanley-Whitney-Dear-Paris" itemProp="name">
                                Stanley Whitney: Dear Paris{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Jacob Bromberg </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/1by1" title="Go to 1x1">
                            1x1
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/1by1/Joel-Danilewitz-on-Bettina" itemProp="name">
                                Joel Danilewitz on Bettina{" "}
                              </a>
                            </h4>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/criticspage" title="Go to Critics Page">
                            Critics Page
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Borderlands" itemProp="name">
                                Borderlands{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Andrea Geyer </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Knotted-Lives" itemProp="name">
                                Knotted Lives{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Cassie Packard </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Untitled-M4U-The-Eulogists" itemProp="name">
                                Untitled (M4U: The Eulogists){" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Elliott Jerome Brown Jr. </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Wasnt-there-always-a-war" itemProp="name">
                                Wasn’t there always a war?{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Gala Mukomolova </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Dear-Lina" itemProp="name">
                                Dear Lina,{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Jill H. Casid </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/That-body-of-a-reflection-of-the-sky" itemProp="name">
                                That body of (a reflection of the sky){" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Le’Andra LeSeur </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Slow-Abandon" itemProp="name">
                                Slow Abandon{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Mev Luna </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Insufficient-Memory" itemProp="name">
                                Insufficient Memory{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Sean Fader </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/A-White-Rose-in-a-Mirror-of-Silver" itemProp="name">
                                A White Rose in a Mirror of Silver{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Rachel Stern </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Nancy-Brooks-Brody-1" itemProp="name">
                                Nancy Brooks Brody{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By fierce pussy </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/The-ant" itemProp="name">
                                The ant{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Timmy Straw </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/criticspage/Complicity-1" itemProp="name">
                                Complicity #1{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Wendy Lotterman </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/books" title="Go to Books">
                            Books
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/books/Tyriek-White-with-Elizabeth-Lothian-and-Joseph-Salvatore"
                                itemProp="name"
                              >
                                Tyriek White with Elizabeth Lothian and Joseph Salvatore{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Nina-MacLaughlins-Winter-Solstice" itemProp="name">
                                ​​Nina MacLaughlin’s Winter Solstice{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Olivia Kate Cerrone </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Richard-Shiffs-Jack-Whitten-Cosmic-Soul" itemProp="name">
                                Richard Shiff’s Jack Whitten: Cosmic Soul{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Tom McGlynn </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/nci-Atrek-with-Amy-Omar" itemProp="name">
                                İnci Atrek with Amy Omar{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Megan-Nolans-Ordinary-Human-Failings" itemProp="name">
                                Megan Nolan’s Ordinary Human Failings{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Meghan Racklin </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Sheila-Hetis-Alphabetical-Diaries" itemProp="name">
                                Sheila Heti’s Alphabetical Diaries{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Loré Yessuff </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Kaveh-Akbars-Martyr-A-Novel" itemProp="name">
                                Kaveh Akbar’s Martyr! A Novel{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Mandana Chaffa </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Shoji-Morimotos-Rental-Person-Who-Does-Nothing" itemProp="name">
                                Shoji Morimoto’s Rental Person Who Does Nothing{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Naomi Elias </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Fourteen-Days-A-Collaborative-Novel" itemProp="name">
                                Fourteen Days: A Collaborative Novel{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Yvonne C. Garrett </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Isabel-Waidners-Corey-Fah-Does-Social-Mobility" itemProp="name">
                                Isabel Waidner’s Corey Fah Does Social Mobility{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By John Domini </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Megan-Nolans-Ordinary-Human-Failings-2" itemProp="name">
                                Megan Nolan’s Ordinary Human Failings{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Tom Deignan </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/books/Anne-Carsons-Wrong-Norma" itemProp="name">
                                Anne Carson’s Wrong Norma{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Amber Sparks </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/music" title="Go to Music">
                            Music
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/music/The-Notebooks-of-Sonny-Rollins" itemProp="name">
                                The Notebooks of Sonny Rollins{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By George Grella </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/music/Soundtrack-To-Disasters" itemProp="name">
                                Soundtrack To Disasters{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Andrey Henkin </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/music/Traces" itemProp="name">
                                Traces{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Adolf Alzuphar </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/music/Shimmers-in-the-Void" itemProp="name">
                                Shimmers in the Void{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Scott Gutterman </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/dance" title="Go to Dance">
                            Dance
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/dance/Aileys-Future-Leans-Retro" itemProp="name">
                                Ailey’s Future Leans Retro{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Susan Yung </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/dance/Ligia-Lewis-with-Amit-Noy" itemProp="name">
                                Ligia Lewis with Amit Noy{" "}
                              </a>
                            </h4>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/film" title="Go to Film">
                            Film
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/film/Mohamed-Kordofanis-Goodbye-Julia" itemProp="name">
                                Mohamed Kordofani’s Goodbye Julia{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Farah Abdessamad </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/film/Justine-Triets-Anatomy-of-a-Fall" itemProp="name">
                                Justine Triet’s Anatomy of a Fall{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Nat Hartman </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/film/Inter-Gulf-War-American-Cinema" itemProp="name">
                                Inter-Gulf War American Cinema{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Anders J. Lee </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/film/Blake-Williamss-Laberint-Sequences" itemProp="name">
                                Blake Williams’s Laberint Sequences{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Frank Falisi </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/theater" title="Go to Theater">
                            Theater
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/theater/Joey-Merlo-with-Jess-Barbagallo" itemProp="name">
                                Joey Merlo with Jess Barbagallo{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/theater/In-Sarah-Ganchers-Plays-the-Joke-is-on-the-World"
                                itemProp="name"
                              >
                                In Sarah Gancher’s Plays, the Joke is on the World{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Kally Patz </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/theater/Process-as-Performance-Two-New-Works-Assert-Unseen-Unpaid-Artmaking-is-Art"
                                itemProp="name"
                              >
                                Process as Performance: Two New Works Assert Unseen, Unpaid Artmaking is Art{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Billy McEntee </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/fiction" title="Go to Fiction">
                            Fiction
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/fiction/from-We-Are-a-Haunting" itemProp="name">
                                from We Are a Haunting{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Tyriek Rashawn White </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/fiction/from-The-House-Of-Plain-Truth" itemProp="name">
                                from The House Of Plain Truth{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Donna Hemans </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/poetry" title="Go to Poetry">
                            Poetry
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Sky-Hopinka" itemProp="name">
                                Sky Hopinka{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/David-Trinidad" itemProp="name">
                                David Trinidad{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Clare-Schneider" itemProp="name">
                                Clare Schneider{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Ashley-D-Escobar" itemProp="name">
                                Ashley D Escobar{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Tony-Leuzzi-2024" itemProp="name">
                                Tony Leuzzi{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Erin-Perez" itemProp="name">
                                Erin Pérez{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Sandra-Simonds-2024" itemProp="name">
                                Sandra Simonds{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Carol-Mirakove-2024" itemProp="name">
                                Carol Mirakove{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Connie-Mae-Concepcion-Oliver" itemProp="name">
                                Connie Mae Concepción Oliver{" "}
                              </a>
                            </h4>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Eileen-Myless-a-Working-Life" itemProp="name">
                                Eileen Myles’s a “Working Life”{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Camille Roy </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/poetry/Jeffrey-Grunthaner-with-Ben-Tripp" itemProp="name">
                                Jeffrey Grunthaner with Ben Tripp{" "}
                              </a>
                            </h4>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/art_books" title="Go to Art Books">
                            Art Books
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/art_books/Always-Reaching-The-Selected-Writings-of-Anne-Truitt"
                                itemProp="name"
                              >
                                Always Reaching: The Selected Writings of Anne Truitt{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Beryl Gilothwest </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art_books/Jay-DeFeo-Photographic-Work" itemProp="name">
                                Jay DeFeo: Photographic Work{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Nate Mickelson </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art_books/Cyrilla-Mozenter-and-Philip-Perkiss-ar" itemProp="name">
                                Cyrilla Mozenter and Philip Perkis’s ar{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Nancy Romines Walters </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art_books/Stuff-Instead-of-a-Memoir" itemProp="name">
                                Stuff: Instead of a Memoir{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Megan N. Liberty </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/art_books/Ethan-Philbricks-Group-Works" itemProp="name">
                                Ethan Philbrick’s Group Works{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Macaella Gray and Zoe Roden </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/in-memoriam" title="Go to In Memoriam">
                            In Memoriam
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/in-memoriam/A-Tribute-to-Cora-Cohen" itemProp="name">
                                A Tribute to Cora Cohen{" "}
                              </a>
                            </h4>
                            <cite className="byline">– </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/special-report" title="Go to Special Report">
                            Special Report
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/special-report/New-Art-Center-CAHH-opens-in-Valencia" itemProp="name">
                                New Art Center CAHH opens in Valencia{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Jurriaan Benschop </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/special-report/A-LETTER-FROM-VENICE" itemProp="name">
                                A LETTER FROM VENICE{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Kathy Brew </cite>
                          </li>
                        </ul>

                        <h3>
                          <a href="/2024/2/field-notes" title="Go to Field Notes">
                            Field Notes
                          </a>
                        </h3>
                        <ul>
                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/field-notes/What-is-to-be-done-1" itemProp="name">
                                What is to be done?{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Jared Joseph </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a href="/2024/02/field-notes/The-dictatorship-of-the-bosses" itemProp="name">
                                The dictatorship of the bosses{" "}
                              </a>
                            </h4>
                            <cite className="byline">– By Amir Hernandez </cite>
                          </li>

                          <li className="promo promo-slim " itemType="http://schema.org/Article">
                            <h4>
                              <a
                                href="/2024/02/field-notes/Understanding-Inflation-Friends-of-the-Classless-Society-speak-with-Paul-Mattick"
                                itemProp="name"
                              >
                                Understanding Inflation: Paul Mattick with Friends of the Classless Society{" "}
                              </a>
                            </h4>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="grid-row">
                    <div className="grid-col-12">
                      <div style={{ margin: "25px 0px 25px 30px" }}>
                        <a href="/subscribe">
                          <img src="/images/subscribe-footer.png" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ad_column grid-col-2">
                  <div id="extra">
                    <div id="ads">
                      <div className="ad_label">ADVERTISEMENTS</div>
                      <div className="ads_container">
                        <div className="ad">
                          <a
                            href="http://www.bettycuninghamgallery.com/exhibitions/the-last-picture-show"
                            target="_blank"
                          >
                            <img
                              className="image_desktop"
                              alt="Advertisement: Cuningham"
                              src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/2iAKMbRwT7h2oI3V3IRHVw/iIAv9DZGzJkvaHQP3DOCDjNdrodVFxgOqQ5LMKg8kiYyKMUk8oGSRSfCxfKrQtvDnF-zuI9xCHmlwvB_XXDMP0bwBuzAi4qDqqoUBpcArNYkcCZGUhEMN9QH1blEKw_lp9jMk2TKD7hZUzKLdDtxvHboGw8dNuEMCmWuLd7Cpy0/X6xdEnJ5Jbhkz3DQP8cgRnW0iFCxBS-WhnUTqyCAySo"
                            />
                          </a>
                        </div>
                        <div className="ad">
                          <a href="https://fairfield.edu/museum/christy-rupp/" target="_blank">
                            <img
                              className="image_desktop"
                              alt="Advertisement: Fairfield University Museum"
                              src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/CZGR8AQeuZV7GmyFQ9XZ4g/o_Fi1To4gpGZsn4iEjXSqAj_r7aR9z7JlxSGEnfXxtR7RtqHVeED3U1G6FO2xfdhlgX_ZFDnac8vRdijGaKjsCh6Plq8WbpgMnrZ4FaTjPBV4eNDfrGDJyl36nducFMj9kJlGxk0XTur3MF6UDiRAhmtX1muAvW8z7fSZOFWsov5aNcY71jjez8sIadwv_cI/PYK3WRaMXsseWImlYjOR8pfQoVUop6BowTIcfRGiaW8"
                            />
                          </a>
                        </div>
                        <div className="ad">
                          <a href="https://www.highnoongallery.com/aletheia" target="_blank">
                            <img
                              className="image_desktop"
                              alt="Advertisement: High Noon"
                              src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/U1RHmy8vJFeP3Qyenb_Suw/9g4dtT4sSroc7FWuSMG1C1EBITIBgtTEPDlyxJKTk5vzibdqrPHgGdVZOp33F_XIiyoK5HPpGuAQbUQbKUNd2CF9dhcHm8Gs044BGoRGAc-xVStEw5hAiUikrjnOGd8yR5tNY70WxnBCv1HuCNsipC82GBEY-2vmRhXB5Q6HCk4/4puBUFLplFpcHlrHqKKFq-M4W3HOiRbbyscPcuiuXe8"
                            />
                          </a>
                        </div>
                        <div className="ad">
                          <a href="https://www.studioinstitute.org/" target="_blank">
                            <img
                              className="image_desktop"
                              alt="Advertisement: studio"
                              src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/2MR6sLBeBiGaEj39J77LVw/BNF9Uat0oFuDvVbS5ZSbADYqNKYQBCQTiXX1d0N4B8WlEes_pEBfSwD_BWfgUbTRy3giVgG0IVzzAu1Rc1HEL7IaBenvQ6V1cViHabCbbErKnKpS6SLK_zqv8tcweCx_ABbdqUYBdnl83Q7qI8oK7eup3v3yPdksG_iHG-xaR-YpEhyKat0j0fSiskG2Qkz_/rnxZkZ8o7Wl4VeGF1gFqajKaVYRbRSr0Gf5Z8t5mmSE"
                            />
                          </a>
                        </div>
                        <div className="ad">
                          <a href="https://www.tibordenagy.com/exhibitions/ken-aptekar" target="_blank">
                            <img
                              className="image_desktop"
                              alt="Advertisement: Tibor De Nagy"
                              src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/nfEsxm42_lGy4hG3eP5LBQ/SAq1-gJ3mrN5EIFydCES1wTKOPhMTpqzF9b1I1nC5wCZG85YBWBCQu6XijZSBu6pb1vFUtuozI4OUrCQeOnCCJPNQRlcjU1oEdppAoIlNkzFqBSMwg8XzO0NTv_UqIG4ENkhK85Xsf1maMlbW5a1AQ/AJ-Oh9ycE8eveM_TTO4pu_F7xqPkgIqO7Fbc1nhwG9E"
                            />
                          </a>
                        </div>
                        <div className="ad">
                          <a href="https://www.eleventhhourart.com/george" target="_blank">
                            <img
                              className="image_desktop"
                              alt="Advertisement: Andrew george"
                              src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/ZjSeUZOFQ_dpZIqQSHIbzA/jeNXv3LBE5mZ1ajvFLcwO24wpNUs3yHygn6YNOSqrmrVOnh8pK8SaNPjzp2VADgOagrEYZ8FepdgbPVHDwEGv9miQnjYfXb-s1nOgHt1XsIKmnpuUiiySPb6jkDDH36xxDWEiX3-XLxTjv_NzVFD8A/M4_QlrQLb0nkd1NJ9ivk_Szf-vEE8qVCheKuDOZLCfg"
                            />
                          </a>
                        </div>
                        <div className="ad">
                          <a
                            href="https://www.amazon.com/Backseat-Driver-James-Croak/dp/0988393360#immersive-view_1707348212765"
                            target="_blank"
                          >
                            <img
                              className="image_desktop"
                              alt="Advertisement: James Croak"
                              src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/UuWtRiZzD5b3dSbQz8ktrw/LBm35_rN1CzRqolZsqh1NeArJ4Xh9OtBQfk8Uh2FpA8PRtpcu2XGNWh_PfI3O-wZ0dUoGqqqY-l2-6jQKEBMmD1M21A2fv9PVhnh_ZUjS3fPHsoocTOhFeuEzP2dTbg5xRkZbfpyacTK67Vk1535BA/toCBdixakPnS3X0lJiqezXMAJMzYNcAYYCFhZyhE4Do"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CoversPopup />
    </>
  )
}

export default Homepage
