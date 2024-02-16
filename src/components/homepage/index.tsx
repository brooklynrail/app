import { CoverImage } from "../issueRail"
import CoversPopup from "../issueRail/coversPopup"
import Footer from "../footer"
import InConversation from "./inConversation"
import { useState } from "react"
import { Ads, Issues } from "../../../lib/types"
import ArtSeen from "./artSeen"
import { HomepageProps } from "@/pages"
import CriticsPage from "./criticsPage"
import EditorsMessage from "./editorsMessage"
import PublishersMessage from "./publishersMessage"
import AdsTile from "./adsTile"
import IssueSelect from "./issueSelect"

const CurrentSections = (props: any) => {
  const { currentIssue, currentSections } = props
  const { year, month } = currentIssue
  const dateSlug = `${year}/${month}`

  return (
    <>
      <div className="issue_sections">
        <ul>
          <li>
            <a href={`/${dateSlug}/`} title="Go to the Issue home">
              Issue Home
            </a>
          </li>
          {currentSections.map((section: any, i: number) => {
            return (
              <li key={`${i}-${dateSlug}/${section.slug}/`}>
                <a href={`/${dateSlug}/${section.slug}/`} title={`Go to the ${section.name} section`}>
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

const Homepage = (props: HomepageProps) => {
  const allIssues = props.allIssues
  const currentIssue = props.currentIssue
  const ads = props.ads
  const { cover_1, cover_2, cover_3, cover_4, cover_5, cover_6 } = currentIssue
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
                      <IssueSelect allIssues={allIssues} />
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
                        <PublishersMessage {...props} />
                      </div>

                      <div className="collection">
                        <EditorsMessage {...props} />
                      </div>

                      <div className="collection">
                        <CriticsPage {...props} />
                      </div>

                      <div className="collection">
                        <ArtSeen {...props} />
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
                  <AdsTile ads={ads} />
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
