import Link from "next/link"
import IssueRail from "../issueRail"
const Article = (props: any) => {
  const { id, title, deck, body } = props.article

  return (
    <>
      <div className="paper">
        <div className="hatbox"></div>

        <main>
          <div className="grid-container">
            <div className="grid-row grid-gap-3">
              <div className="grid-col-12 tablet-lg:grid-col-4 desktop-lg:grid-col-3">
                <IssueRail {...props} />
              </div>

              <div className="grid-col-12 tablet-lg:grid-col-8 desktop-lg:grid-col-9">
                <header id="article_header">
                  <a className="mobile_nav_btn" href="">
                    <i className="fas fa-angle-double-left"></i> <span>{props.issues.title}</span> Issue
                  </a>

                  <nav>
                    <div>
                      <a className="btn search" href="/search" title="Search the Rail">
                        <i className="fas fa-search"></i>
                      </a>
                    </div>
                    <div>
                      <a
                        className="btn btn-sm donate"
                        href="https://brooklynrail.org/donate?a"
                        title="Donate to the Brooklyn Rail"
                      >
                        <span>Donate</span>
                      </a>
                    </div>
                  </nav>
                </header>

                <div className="ad ad_970">
                  <p>Advertisement</p>
                  <div></div>
                </div>

                <article className="article">
                  <header className="diptych">
                    <div className="grid-row grid-gap-4">
                      <div className="grid-col-12 tablet:grid-col-7">
                        <h6 className="kicker">
                          <a href="/2023/12/art" title="Go to the Art section">
                            Art{" "}
                          </a>
                          <span className="divider"></span>
                          <span>In Conversation</span>
                        </h6>

                        <h1 dangerouslySetInnerHTML={{ __html: title }} />

                        <div className="article-meta">
                          <div className="date">{props.issues.title}</div>

                          <div className="share-tools">
                            <a
                              className="twitter"
                              href="https://twitter.com/share?url=https%3A%2F%2Fbrooklynrail.org%2F2023%2F12%2Fart%2FTony-Bechara-with-Phong-H-Bui&amp;text=Tony+Bechara+with+Phong+H.+Bui"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                            <a
                              className="facebook"
                              href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fbrooklynrail.org%2F2023%2F12%2Fart%2FTony-Bechara-with-Phong-H-Bui&t=Tony+Bechara+with+Phong+H.+Bui"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="grid-col-12 tablet:grid-col-5">
                        <div className="">
                          <img
                            src="https://brooklynrail.imgix.net/content/article_image/image/38467/bechara-tony.jpg?w=440&q=80&fit=max"
                            alt="Portrait of Tony Bechara, pencil on paper by Phong H. Bui."
                          />
                          <figcaption>Portrait of Tony Bechara, pencil on paper by Phong H. Bui. </figcaption>
                        </div>
                      </div>
                    </div>
                  </header>

                  <section className="content">
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                  </section>

                  <footer>
                    <section className="contributors">
                      <h3>Contributor</h3>

                      <h4>
                        <a href="/contributor/phong-bui">Phong Bui </a>
                      </h4>
                      <p>
                        <strong>Phong H. Bui</strong> is the Publisher and Artistic Director of the{" "}
                        <em>Brooklyn Rail</em>.{" "}
                      </p>
                    </section>
                  </footer>

                  <div id="edit-tools" className="edit-tools" style={{ display: "none" }}>
                    <div className="edit-btn">
                      <a target="_blank" href="/admin/article/edit/20755" title="edit this article">
                        edit
                      </a>
                    </div>
                  </div>
                </article>

                <section></section>
              </div>
            </div>
          </div>
        </main>

        <footer id="footer">
          <div className="grid-container">
            <div className="grid-row grid-gap-4">
              <div className="grid-col-12 tablet-lg:grid-col-3">
                <a href="/">
                  <img
                    className="logo"
                    src="/images/brooklynrail-logo-white.png"
                    alt="The Brooklyn Rail"
                    title="Brooklyn Rail Home"
                  />
                </a>
                <p className="sub-head">Critical Perspectives on Art, Politics and Culture</p>
              </div>
              <div className="grid-col-6 tablet-lg:grid-col-3 tablet-lg:grid-offset-1 desktop:grid-col-2 desktop:grid-offset-3">
                <h5>The RAIL</h5>
                <ul>
                  <li>
                    <a href="/about/?f">About the Rail</a>
                  </li>
                  <li>
                    <a href="/staff/?f">Staff</a>
                  </li>
                  <li>
                    <a href="/our-supporters/?f">Our Supporters</a>
                  </li>
                  <li>
                    <a href="/contributors/?f">Contributors</a>
                  </li>
                  <li>
                    <a href="https://shop.brooklynrail.org?f">Store</a>
                  </li>
                  <li>
                    <a href="/history/?f">History</a>
                  </li>
                  <li>
                    <a href="/archives/?f">Archives</a>
                  </li>
                  <li>
                    <a href="/contact/?f">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="grid-col-6 tablet-lg:grid-col-3 desktop:grid-col-2">
                <h5>Get Involved</h5>
                <ul>
                  <li>
                    <a href="https://mailchi.mp/brooklynrail/join/?f">Sign up for our newsletter</a>
                  </li>
                  <li>
                    <a href="/subscribe/?f">Subscribe</a>
                  </li>
                  <li>
                    <a href="https://brooklynrail.org/donate?f">Donate</a>
                  </li>
                  <li>
                    <a href="/advertise/?f">Advertise</a>
                  </li>
                  <li>
                    <a href="/submissions/?f">Submissions</a>
                  </li>
                </ul>
              </div>
              <div className="grid-col-12 tablet-lg:grid-col-2">
                <h5>Follow</h5>
                <ul>
                  <li>
                    <a href="https://www.instagram.com/brooklynrail/" title="Follow @brooklynrail on Instagram">
                      <i className="fab fa-instagram"></i> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/thebrooklynrail" title="Follow @thebrooklynrail on Twitter">
                      <i className="fab fa-twitter-square"></i> Twitter
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/thebrooklynrail" title="Like The Brooklyn Rail on Facebook">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </a>
                  </li>
                  <li>
                    <a href="/rss" title="The Brooklyn Rail RSS feed">
                      <i className="fas fa-rss"></i> RSS
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid-row grid-gap-4">
              <div className="grid-col-12">
                <p className="copyright">&#169; Copyright 2000-2024 The Brooklyn Rail</p>
              </div>
            </div>
          </div>
        </footer>

        <div className="screen"></div>

        <div className="mobile_nav">
          <a className="close" href="#">
            close <i className="fas fa-arrow-circle-right"></i>
          </a>
          <nav className="main_nav">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about/">About the Rail</a>
              </li>
              <li>
                <a href="/subscribe">Subscribe</a>
              </li>
              <li>
                <a href="/where-to-find-us">
                  <i className="fas fa-map-marker-alt"></i> Find the Rail in print
                </a>
              </li>
              <li>
                <a href="/mailing-list">
                  <i className="fas fa-envelope"></i> Sign up for our newsletter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/brooklynrail/">
                  <i className="fab fa-instagram"></i> Follow us on Instagram
                </a>
              </li>
              <li>
                <a href="https://shop.brooklynrail.org/">Store</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
            </ul>
          </nav>

          <section id="rail">
            <header id="rail-header">
              <h2>
                <a href="/">
                  <img src="/images/brooklynrail-logo.svg" alt="The Brooklyn Rail" title="Brooklyn Rail Home" />
                </a>
              </h2>
            </header>

            <header className="issue-header">
              <h3 className="issue-name">
                <a href={`/${props.issues.slug}/`}>{props.issues.title}</a>
              </h3>

              <a className="archive" href="/archive" title="All Issues Archive">
                <span>All Issues</span> <i className="fas fa-angle-double-right"></i>
              </a>
            </header>

            <nav className="issue-index">
              <div className="issue-details">
                <div className="grid-row">
                  <div className="grid-col-4">
                    <div className="issue-covers">
                      <Link href={`/${props.issues.slug}/`}>
                        <img
                          className="cover"
                          src="https://brooklynrail.imgix.net/content/issue/cover_image/241/br-dec-jan-rirkrit.jpg?w=200&q=80&fit=max"
                          alt="Rirkrit Tiravanija, &lt;em&gt;untitled 2017 (fear eats the soul) (white flag)&lt;/em&gt;, 2017. Flag, 72 feet ? 10 feet 6 inches. Courtesy the artist."
                        />
                        <img
                          className="cover2 hidden"
                          src="https://brooklynrail.imgix.net/content/issue/cover_image/241/br-dec-jan-emin.jpg?w=200&q=80&fit=max"
                          alt="Tracey Emin, &lt;em&gt;Dreaming of Another World,&lt;/em&gt; 2022. Acrylic on canvas, 36 x 48 1/16 inches. Courtesy the artist and White Cube."
                        />
                        <img
                          className="cover3 hidden"
                          src="https://brooklynrail.imgix.net/content/issue/cover_image/241/br-dec-jan-rosen.jpg?w=200&q=80&fit=max"
                          alt="Kay Rosen, &lt;em&gt;This Means War?!&lt;/em&gt;, 2016 - 2023, Billboard (1 of 10). Installation view: &lt;em&gt;Kay Rosen: Now and Then&lt;/em&gt;, Weserburg Museum for Modern Art, Bremen, Germany. Photo: Tobias Hubel."
                        />
                        <img
                          className="cover4 hidden"
                          src="https://brooklynrail.imgix.net/content/issue/cover_image/241/br-dec-jan-bechara.jpg?w=200&q=80&fit=max"
                          alt="Tony Bechara, &lt;em&gt;Random 28 (Red version),&lt;/em&gt; 2023. Acrylic on canvas, 24 x 24 inches. ? Tony Bechara. Courtesy Lisson Gallery."
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="grid-col-8">
                    <div className="issue-links">
                      <div className="related">
                        <p>
                          <a href="/where-to-find-us">
                            <strong>
                              Find <em>the RAIL</em> in print
                            </strong>
                          </a>
                        </p>
                        <p>
                          <a
                            href="https://shop.brooklynrail.org/products/subscription"
                            title="Subscribe to the Rail in Print"
                          >
                            <strong>Subscribe now</strong>
                          </a>
                        </p>
                      </div>

                      <p>
                        <a
                          href="/2023/12/publishersmessage/Dear-Friends-and-Readers-dec-23"
                          title="A message from Publisher and Artistic Director, Phong Bui"
                        >
                          <strong>A message from Phong Bui</strong>
                        </a>
                        <br />
                        <em>Publisher and Artistic Director</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Art</h3>
              <ul>
                <li className="article current">
                  <h4>
                    <a href="/2023/12/art/Tony-Bechara-with-Phong-H-Bui">Tony Bechara with Phong H. Bui</a>
                  </h4>

                  <a className="overlay" href="/2023/12/art/Tony-Bechara-with-Phong-H-Bui">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/art/Tracey-Emin-with-Charles-M-Schultz">Tracey Emin with Charles M. Schultz</a>
                  </h4>

                  <a className="overlay" href="/2023/12/art/Tracey-Emin-with-Charles-M-Schultz">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/art/Kay-Rosen-with-Terry-R-Myers">Kay Rosen with Terry R. Myers</a>
                  </h4>

                  <a className="overlay" href="/2023/12/art/Kay-Rosen-with-Terry-R-Myers">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/art/Rirkrit-Tiravanija-with-David-Ross">Rirkrit Tiravanija with David Ross</a>
                  </h4>

                  <a className="overlay" href="/2023/12/art/Rirkrit-Tiravanija-with-David-Ross">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/art/Coiled-Baskets-Spiraled-Histories">Coiled Baskets, Spiraled Histories</a>
                  </h4>
                  <cite>By Jessica L. Horton</cite>

                  <a className="overlay" href="/2023/12/art/Coiled-Baskets-Spiraled-Histories">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>ArtSeen</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Cordy-Ryman-Monkey-Mind-Symphony">Cordy Ryman: Monkey Mind Symphony</a>
                  </h4>
                  <cite>By Ekin Erkan</cite>

                  <a className="overlay" href="/2023/12/artseen/Cordy-Ryman-Monkey-Mind-Symphony">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Mark-Rothko-1">Mark Rothko</a>
                  </h4>
                  <cite>By Phong Bui </cite>

                  <a className="overlay" href="/2023/12/artseen/Mark-Rothko-1">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Picasso-A-Cubist-Commission-in-Brooklyn">
                      Picasso: A Cubist Commission in Brooklyn
                    </a>
                  </h4>
                  <cite>By Pepe Karmel</cite>

                  <a className="overlay" href="/2023/12/artseen/Picasso-A-Cubist-Commission-in-Brooklyn">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/A-Foreigner-Called-Picasso">A Foreigner Called Picasso</a>
                  </h4>
                  <cite>By Mary Ann Caws</cite>

                  <a className="overlay" href="/2023/12/artseen/A-Foreigner-Called-Picasso">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/In-Dialogue-with-Picasso">In Dialogue with Picasso</a>
                  </h4>
                  <cite>By Phyllis Tuchman</cite>

                  <a className="overlay" href="/2023/12/artseen/In-Dialogue-with-Picasso">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Picasso-in-Fontainebleau">Picasso in Fontainebleau</a>
                  </h4>
                  <cite>By Rebecca Schiffman</cite>

                  <a className="overlay" href="/2023/12/artseen/Picasso-in-Fontainebleau">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Pablo-Picasso-14-Sketchbooks">14 Sketchbooks</a>
                  </h4>
                  <cite>By Saul Ostrow</cite>

                  <a className="overlay" href="/2023/12/artseen/Pablo-Picasso-14-Sketchbooks">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/The-Echo-of-Picasso">The Echo of Picasso</a>
                  </h4>
                  <cite>By Amanda Gluibizzi</cite>

                  <a className="overlay" href="/2023/12/artseen/The-Echo-of-Picasso">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Going-Dark-The-Contemporary-Figure-at-the-Edge-of-Visibility">
                      Going Dark: The Contemporary Figure at the Edge of Visibility
                    </a>
                  </h4>
                  <cite>By Zo&euml; Hopkins</cite>

                  <a
                    className="overlay"
                    href="/2023/12/artseen/Going-Dark-The-Contemporary-Figure-at-the-Edge-of-Visibility"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Marilyn-Lerner-Memory-is-a-Fickle-Thing">
                      Marilyn Lerner: Memory is a Fickle Thing
                    </a>
                  </h4>
                  <cite>By Mary Jones</cite>

                  <a className="overlay" href="/2023/12/artseen/Marilyn-Lerner-Memory-is-a-Fickle-Thing">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Lola-Montes-Cirica">Lola Montes: Cirica </a>
                  </h4>
                  <cite>By Barbara A. MacAdam</cite>

                  <a className="overlay" href="/2023/12/artseen/Lola-Montes-Cirica">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Hans-Jrg-Mayer">Hans-J&ouml;rg Mayer</a>
                  </h4>
                  <cite>By Jason Rosenfeld</cite>

                  <a className="overlay" href="/2023/12/artseen/Hans-Jrg-Mayer">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Adrian-Ghenie-The-Brave-New-World">Adrian Ghenie: The Brave New World</a>
                  </h4>
                  <cite>By Charles Moore</cite>

                  <a className="overlay" href="/2023/12/artseen/Adrian-Ghenie-The-Brave-New-World">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Tales-of-Brave-Ulysses">Tales of Brave Ulysses</a>
                  </h4>
                  <cite>By Andrew Paul Woolbright</cite>

                  <a className="overlay" href="/2023/12/artseen/Tales-of-Brave-Ulysses">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Bonnards-Worlds">Bonnard&#146;s Worlds</a>
                  </h4>
                  <cite>By Phyllis Tuchman</cite>

                  <a className="overlay" href="/2023/12/artseen/Bonnards-Worlds">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Rineke-Dijkstra-Night-Watching-and-Pictures-from-the-Archive">
                      Rineke Dijkstra: Night Watching and Pictures from the Archive
                    </a>
                  </h4>
                  <cite>By Ann C. Collins</cite>

                  <a
                    className="overlay"
                    href="/2023/12/artseen/Rineke-Dijkstra-Night-Watching-and-Pictures-from-the-Archive"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Marta-Minujn-Arte-Arte-Arte">Marta Minuj&iacute;n: Arte! Arte! Arte!</a>
                  </h4>
                  <cite>By Lyle Rexer</cite>

                  <a className="overlay" href="/2023/12/artseen/Marta-Minujn-Arte-Arte-Arte">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Mark-Grotjahn-Skulls-20162023">Mark Grotjahn: Skulls 2016&ndash;2023</a>
                  </h4>
                  <cite>By David Rhodes</cite>

                  <a className="overlay" href="/2023/12/artseen/Mark-Grotjahn-Skulls-20162023">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Puppies-Puppies-Jade-Guanaro-Kuriki-Olivo-Nothing-New">
                      Puppies Puppies (Jade Guanaro Kuriki-Olivo): Nothing New
                    </a>
                  </h4>
                  <cite>By Cassie Packard</cite>

                  <a className="overlay" href="/2023/12/artseen/Puppies-Puppies-Jade-Guanaro-Kuriki-Olivo-Nothing-New">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Anish-Kapoor">Anish Kapoor</a>
                  </h4>
                  <cite>By Raphy Sarkissian</cite>

                  <a className="overlay" href="/2023/12/artseen/Anish-Kapoor">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Mark-Rothko-Gierowska">Mark Rothko</a>
                  </h4>
                  <cite>By Natalia Gierowska</cite>

                  <a className="overlay" href="/2023/12/artseen/Mark-Rothko-Gierowska">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Melvin-Smith-Rose-Smith-Recollections-of-Rondo">
                      Melvin Smith & Rose Smith: Recollections of Rondo
                    </a>
                  </h4>
                  <cite>By Annabel Keenan</cite>

                  <a className="overlay" href="/2023/12/artseen/Melvin-Smith-Rose-Smith-Recollections-of-Rondo">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Henry-Taylor-From-Sugar-to-Shit">Henry Taylor: From Sugar to Shit </a>
                  </h4>
                  <cite>By Bruna Shapira</cite>

                  <a className="overlay" href="/2023/12/artseen/Henry-Taylor-From-Sugar-to-Shit">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Lutz-Bacher-AYE">Lutz Bacher: AYE!</a>
                  </h4>
                  <cite>By Maximiliane Leuschner</cite>

                  <a className="overlay" href="/2023/12/artseen/Lutz-Bacher-AYE">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Kapwani-Kiwanga-Remediation">Kapwani Kiwanga: Remediation</a>
                  </h4>
                  <cite>By Tak Pham</cite>

                  <a className="overlay" href="/2023/12/artseen/Kapwani-Kiwanga-Remediation">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/50-Paintings">50 Paintings</a>
                  </h4>
                  <cite>By Saul Ostrow</cite>

                  <a className="overlay" href="/2023/12/artseen/50-Paintings">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Charles-LeDray-Shiner">Charles LeDray: Shiner</a>
                  </h4>
                  <cite>By Louis Bury</cite>

                  <a className="overlay" href="/2023/12/artseen/Charles-LeDray-Shiner">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Frank-Morrison-Brilliance-Behind-the-Line-and-Wonder-World">
                      Frank Morrison: Brilliance Behind the Line and Wonder World
                    </a>
                  </h4>
                  <cite>By Charles Moore</cite>

                  <a
                    className="overlay"
                    href="/2023/12/artseen/Frank-Morrison-Brilliance-Behind-the-Line-and-Wonder-World"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Nicholas-Galanin-In-every-language-there-is-Land-En-cada-lengua-hay-una-Tierra">
                      Nicholas Galanin: In every language there is Land / En cada lengua hay una Tierra
                    </a>
                  </h4>
                  <cite>By Davida Fern&aacute;ndez-Barkan</cite>

                  <a
                    className="overlay"
                    href="/2023/12/artseen/Nicholas-Galanin-In-every-language-there-is-Land-En-cada-lengua-hay-una-Tierra"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Hannah-Beerman-Paintings">Hannah Beerman: Paintings</a>
                  </h4>
                  <cite>By Ksenia Soboleva</cite>

                  <a className="overlay" href="/2023/12/artseen/Hannah-Beerman-Paintings">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Tecla-Tofano-This-Body-of-Mine">Tecla Tofano: This Body of Mine</a>
                  </h4>
                  <cite>By Clara Maria Apostolatos</cite>

                  <a className="overlay" href="/2023/12/artseen/Tecla-Tofano-This-Body-of-Mine">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Diana-Al-Hadid-Women-Bronze-and-Dangerous-Things">
                      Diana Al-Hadid: Women, Bronze, and Dangerous Things
                    </a>
                  </h4>
                  <cite>By Elizabeth Buhe</cite>

                  <a className="overlay" href="/2023/12/artseen/Diana-Al-Hadid-Women-Bronze-and-Dangerous-Things">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Copy-Machine-Manifestos-Artists-Who-Make-Zines">
                      Copy Machine Manifestos: Artists Who Make Zines
                    </a>
                  </h4>
                  <cite>By Cassie Packard</cite>

                  <a className="overlay" href="/2023/12/artseen/Copy-Machine-Manifestos-Artists-Who-Make-Zines">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Hyong-Nam-Ahn-Absolute-Space-No-Longer-in-Time">
                      Hyong Nam Ahn: Absolute Space (No Longer in Time)
                    </a>
                  </h4>
                  <cite>By Robert C. Morgan</cite>

                  <a className="overlay" href="/2023/12/artseen/Hyong-Nam-Ahn-Absolute-Space-No-Longer-in-Time">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Georg-Baselitz-The-Painter-in-His-Bed">
                      Georg Baselitz: The Painter in His Bed
                    </a>
                  </h4>
                  <cite>By Alfred Mac Adam</cite>

                  <a className="overlay" href="/2023/12/artseen/Georg-Baselitz-The-Painter-in-His-Bed">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Hanna-Hur-Two-Angels">Hanna Hur: Two Angels</a>
                  </h4>
                  <cite>By Suzanne Hudson</cite>

                  <a className="overlay" href="/2023/12/artseen/Hanna-Hur-Two-Angels">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Shilpa-Gupta-I-did-not-tell-you-what-I-saw-but-only-what-I-dreamt">
                      Shilpa Gupta: I did not tell you what I saw, but only what I dreamt
                    </a>
                  </h4>
                  <cite>By Priya Gandhi</cite>

                  <a
                    className="overlay"
                    href="/2023/12/artseen/Shilpa-Gupta-I-did-not-tell-you-what-I-saw-but-only-what-I-dreamt"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Dana-Schutz-Jupiters-Lottery">Dana Schutz: Jupiter&#146;s Lottery</a>
                  </h4>
                  <cite>By William Corwin</cite>

                  <a className="overlay" href="/2023/12/artseen/Dana-Schutz-Jupiters-Lottery">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Tadaaki-Kuwayama-1932-2023">Tadaaki Kuwayama: 1932-2023</a>
                  </h4>
                  <cite>By William Corwin</cite>

                  <a className="overlay" href="/2023/12/artseen/Tadaaki-Kuwayama-1932-2023">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Ad-Reinhardt-1">Ad Reinhardt</a>
                  </h4>
                  <cite>By David Rhodes</cite>

                  <a className="overlay" href="/2023/12/artseen/Ad-Reinhardt-1">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Paul-Pfeiffer-Prologue-to-the-Story-of-the-Birth-of-Freedom">
                      Paul Pfeiffer: Prologue to the Story of the Birth of Freedom{" "}
                    </a>
                  </h4>
                  <cite>By Terry R. Myers</cite>

                  <a
                    className="overlay"
                    href="/2023/12/artseen/Paul-Pfeiffer-Prologue-to-the-Story-of-the-Birth-of-Freedom"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Eric-N-Mack">Eric N. Mack</a>
                  </h4>
                  <cite>By David Whelan</cite>

                  <a className="overlay" href="/2023/12/artseen/Eric-N-Mack">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Katherine-Bradford-Arms-and-the-Sea">
                      Katherine Bradford: Arms and the Sea
                    </a>
                  </h4>
                  <cite>By Jason Drill</cite>

                  <a className="overlay" href="/2023/12/artseen/Katherine-Bradford-Arms-and-the-Sea">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Eiko-Otake-I-Invited-Myself-Vol-III-Duets">
                      Eiko Otake: I Invited Myself, Vol. III: Duets
                    </a>
                  </h4>
                  <cite>By Jacinda S. Tran</cite>

                  <a className="overlay" href="/2023/12/artseen/Eiko-Otake-I-Invited-Myself-Vol-III-Duets">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Spineless-A-Glass-Menagerie-of-Blaschka-Marine-Invertebrates">
                      Spineless: A Glass Menagerie of Blaschka Marine Invertebrates
                    </a>
                  </h4>
                  <cite>By Annabel Keenan</cite>

                  <a
                    className="overlay"
                    href="/2023/12/artseen/Spineless-A-Glass-Menagerie-of-Blaschka-Marine-Invertebrates"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Woven-Histories-Textiles-and-Modern-Abstraction">
                      Woven Histories: Textiles and Modern Abstraction
                    </a>
                  </h4>
                  <cite>By Suzanne Hudson</cite>

                  <a className="overlay" href="/2023/12/artseen/Woven-Histories-Textiles-and-Modern-Abstraction">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Anne-Patterson-Divine-Pathways">Anne Patterson: Divine Pathways</a>
                  </h4>
                  <cite>By Amanda Millet-Sorsa</cite>

                  <a className="overlay" href="/2023/12/artseen/Anne-Patterson-Divine-Pathways">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Skilled-Labor-Black-Realism-in-Detroit">
                      Skilled Labor: Black Realism in Detroit{" "}
                    </a>
                  </h4>
                  <cite>By Charles Moore</cite>

                  <a className="overlay" href="/2023/12/artseen/Skilled-Labor-Black-Realism-in-Detroit">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Life-Cycles-The-Materials-of-Contemporary-Design">
                      Life Cycles: The Materials of Contemporary Design
                    </a>
                  </h4>
                  <cite>By Joanna Seifter</cite>

                  <a className="overlay" href="/2023/12/artseen/Life-Cycles-The-Materials-of-Contemporary-Design">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Mood-of-the-moment-Gaby-Aghion-and-the-house-of-Chlo">
                      Mood of the moment: Gaby Aghion and the house of Chlo&eacute;
                    </a>
                  </h4>
                  <cite>By Ruby Redstone</cite>

                  <a className="overlay" href="/2023/12/artseen/Mood-of-the-moment-Gaby-Aghion-and-the-house-of-Chlo">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Joanna-Pousette-Dart-Line-Moving-Through-Light">
                      Joanna Pousette-Dart: Line Moving Through Light
                    </a>
                  </h4>
                  <cite>By David Rhodes</cite>

                  <a className="overlay" href="/2023/12/artseen/Joanna-Pousette-Dart-Line-Moving-Through-Light">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Ann-Craven-Night">Ann Craven: Night</a>
                  </h4>
                  <cite>By Charles Schultz</cite>

                  <a className="overlay" href="/2023/12/artseen/Ann-Craven-Night">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/artseen/Mara-Magdalena-Campos-Pons-Behold">
                      Mar&iacute;a Magdalena Campos-Pons: Behold
                    </a>
                  </h4>
                  <cite>By Ann McCoy</cite>

                  <a className="overlay" href="/2023/12/artseen/Mara-Magdalena-Campos-Pons-Behold">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>1x1</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/1by1/Louis-Block-on-Kern-Samuel">Louis Block on Kern Samuel</a>
                  </h4>

                  <a className="overlay" href="/2023/12/1by1/Louis-Block-on-Kern-Samuel">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Critics Page</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a
                      href="/2023/12/editorsmessage/Still-Striking-Art-and-Aging"
                      title="Still Striking: Art and Aging"
                    >
                      Still Striking: Art and Aging{" "}
                    </a>
                  </h4>
                  <cite>
                    <strong>Guest Critic:</strong> Douglas Dreishpoon
                  </cite>
                  <a className="overlay" href="/2023/12/editorsmessage/Still-Striking-Art-and-Aging">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/Images">Images</a>
                  </h4>
                  <cite>By Michael Brenson</cite>

                  <a className="overlay" href="/2023/12/criticspage/Images">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/The-Miraculous-Jonas-Mekas">The Miraculous Jonas Mekas</a>
                  </h4>
                  <cite>By Phong Bui </cite>

                  <a className="overlay" href="/2023/12/criticspage/The-Miraculous-Jonas-Mekas">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/Still-Here">Still Here</a>
                  </h4>
                  <cite>By Douglas Dreishpoon and William Tass Jones</cite>

                  <a className="overlay" href="/2023/12/criticspage/Still-Here">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/At-Last">At Last</a>
                  </h4>
                  <cite>By Nancy Princenthal</cite>

                  <a className="overlay" href="/2023/12/criticspage/At-Last">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/Old-Enough">Old Enough</a>
                  </h4>
                  <cite>By Anna Raverat</cite>

                  <a className="overlay" href="/2023/12/criticspage/Old-Enough">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/Agelessness">Agelessness</a>
                  </h4>
                  <cite>By Richard Shiff</cite>

                  <a className="overlay" href="/2023/12/criticspage/Agelessness">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/Playing-it-Out">Playing it Out</a>
                  </h4>
                  <cite>By Jeanne Silverthorne</cite>

                  <a className="overlay" href="/2023/12/criticspage/Playing-it-Out">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/A-Special-Kind-of-Breathing">A Special Kind of Breathing</a>
                  </h4>
                  <cite>By Douglas Dreishpoon and Bob Stewart</cite>

                  <a className="overlay" href="/2023/12/criticspage/A-Special-Kind-of-Breathing">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/Weaving-it-all-together-the-better-to-pull-the-threads-again">
                      Weaving it all together the better to pull the threads again. . .
                    </a>
                  </h4>
                  <cite>By Douglas Dreishpoon and Robert Storr</cite>

                  <a
                    className="overlay"
                    href="/2023/12/criticspage/Weaving-it-all-together-the-better-to-pull-the-threads-again"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/Parallel-Paths">Parallel Paths</a>
                  </h4>
                  <cite>By Paul Hayes Tucker</cite>

                  <a className="overlay" href="/2023/12/criticspage/Parallel-Paths">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/criticspage/Golubs-Catastrophes">Golub&#146;s Catastrophes</a>
                  </h4>
                  <cite>By David Levi Strauss</cite>

                  <a className="overlay" href="/2023/12/criticspage/Golubs-Catastrophes">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Books</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Joseph-Mashecks-Faith-in-Art-Religion-Aesthetics-and-Early-Abstraction">
                      Joseph Masheck&rsquo;s Faith in Art: Religion, Aesthetics, and Early Abstraction
                    </a>
                  </h4>
                  <cite>By Donato Loia</cite>

                  <a
                    className="overlay"
                    href="/2023/12/books/Joseph-Mashecks-Faith-in-Art-Religion-Aesthetics-and-Early-Abstraction"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Rust-and-Rot-50-Years-of-State-of-Grace">
                      Rust and Rot: 50 Years of State of Grace
                    </a>
                  </h4>
                  <cite>By Vincent Scarpa</cite>

                  <a className="overlay" href="/2023/12/books/Rust-and-Rot-50-Years-of-State-of-Grace">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Ben-Fama-with-Elizabeth-Lothian">Ben Fama with Elizabeth Lothian</a>
                  </h4>

                  <a className="overlay" href="/2023/12/books/Ben-Fama-with-Elizabeth-Lothian">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Kate-Briggss-The-Long-Form">Kate Briggs&#146;s The Long Form</a>
                  </h4>
                  <cite>By M&aacute;na Taylor</cite>

                  <a className="overlay" href="/2023/12/books/Kate-Briggss-The-Long-Form">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Mattilda-Bernstein-Sycamores-Touching-the-Art">
                      Mattilda Bernstein Sycamore&#146;s Touching the Art
                    </a>
                  </h4>
                  <cite>By Daniel Allen Cox</cite>

                  <a className="overlay" href="/2023/12/books/Mattilda-Bernstein-Sycamores-Touching-the-Art">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Meg-Pokrass-and-Aimee-Parkisons-Disappearing-Debutantes">
                      Meg Pokrass and Aimee Parkison&#146;s Disappearing Debutantes
                    </a>
                  </h4>
                  <cite>By John Domini</cite>

                  <a className="overlay" href="/2023/12/books/Meg-Pokrass-and-Aimee-Parkisons-Disappearing-Debutantes">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Tony-Ardizzones-In-Brunos-Shadow">
                      Tony Ardizzone&#146;s In Bruno&#146;s Shadow
                    </a>
                  </h4>
                  <cite>By Samuele F.S. Pardini</cite>

                  <a className="overlay" href="/2023/12/books/Tony-Ardizzones-In-Brunos-Shadow">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Marie-Helene-Bertinos-Beautyland">Marie-Helene Bertino&#146;s Beautyland</a>
                  </h4>
                  <cite>By Madison Ford</cite>

                  <a className="overlay" href="/2023/12/books/Marie-Helene-Bertinos-Beautyland">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/books/Suzanne-Braun-Levine-with-Frank-Pizzoli">
                      Suzanne Braun Levine with Frank Pizzoli
                    </a>
                  </h4>

                  <a className="overlay" href="/2023/12/books/Suzanne-Braun-Levine-with-Frank-Pizzoli">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Music</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/music/You-Got-to-Have-Kef-New-Yorks-Balkan-Music-Scene">
                      You Got to Have Kef: New York&#146;s Balkan Music Scene
                    </a>
                  </h4>
                  <cite>By Josh Klasco</cite>

                  <a className="overlay" href="/2023/12/music/You-Got-to-Have-Kef-New-Yorks-Balkan-Music-Scene">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/music/BALKANMOST">BALKAN:MOST</a>
                  </h4>
                  <cite>By Martin Longley</cite>

                  <a className="overlay" href="/2023/12/music/BALKANMOST">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/music/Death-at-the-Opera">Death at the Opera</a>
                  </h4>
                  <cite>By George Grella</cite>

                  <a className="overlay" href="/2023/12/music/Death-at-the-Opera">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/music/Days-of-Our-Lives">Days of Our Lives</a>
                  </h4>
                  <cite>By Scott Gutterman</cite>

                  <a className="overlay" href="/2023/12/music/Days-of-Our-Lives">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Dance</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/dance/Playing-the-Instrument-of-the-Body">Playing the Instrument of the Body</a>
                  </h4>
                  <cite>By Luna Beller-Tadiar</cite>

                  <a className="overlay" href="/2023/12/dance/Playing-the-Instrument-of-the-Body">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/dance/The-Labor-of-Grief">The Labor of Grief</a>
                  </h4>
                  <cite>By Candice Thompson</cite>

                  <a className="overlay" href="/2023/12/dance/The-Labor-of-Grief">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/dance/Dancing-Along-an-Unlikely-Path">Dancing Along an Unlikely Path</a>
                  </h4>
                  <cite>By Susan Yung</cite>

                  <a className="overlay" href="/2023/12/dance/Dancing-Along-an-Unlikely-Path">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Film</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/film/Francesco-Casettis-Screening-Fears-On-Protective-Media">
                      Francesco Casetti&#146;s Screening Fears: On Protective Media
                    </a>
                  </h4>
                  <cite>By Ewan Wallace</cite>

                  <a className="overlay" href="/2023/12/film/Francesco-Casettis-Screening-Fears-On-Protective-Media">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/film/Maryam-Keshavarzs-The-Persian-Version">
                      Maryam Keshavarz&#146;s The Persian Version{" "}
                    </a>
                  </h4>
                  <cite>By Mandy Taheri</cite>

                  <a className="overlay" href="/2023/12/film/Maryam-Keshavarzs-The-Persian-Version">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/film/Wim-Wenderss-Perfect-Days">Wim Wenders&#146;s Perfect Days</a>
                  </h4>
                  <cite>By Nolan Kelly</cite>

                  <a className="overlay" href="/2023/12/film/Wim-Wenderss-Perfect-Days">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/film/The-20th-Noir-City-Film-Festival">The 20th Noir City Film Festival</a>
                  </h4>
                  <cite>By Harrison Blackman</cite>

                  <a className="overlay" href="/2023/12/film/The-20th-Noir-City-Film-Festival">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Theater</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/theater/Conversations-I-Want-People-to-Have-After-Seeing-How-to-Dance-in-Ohio">
                      Conversations I Want People to Have After Seeing How to Dance in Ohio
                    </a>
                  </h4>
                  <cite>By Dave Osmundsen</cite>

                  <a
                    className="overlay"
                    href="/2023/12/theater/Conversations-I-Want-People-to-Have-After-Seeing-How-to-Dance-in-Ohio"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/theater/Thirty-Five">Thirty-Five</a>
                  </h4>
                  <cite>by Catherine Filloux, illustrations by Luba Lukova</cite>

                  <a className="overlay" href="/2023/12/theater/Thirty-Five">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/theater/In-cryptochrome-a-New-Way-of-Seeing">
                      In cryptochrome, a New Way of Seeing
                    </a>
                  </h4>
                  <cite>By Billy McEntee</cite>

                  <a className="overlay" href="/2023/12/theater/In-cryptochrome-a-New-Way-of-Seeing">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Fiction</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/fiction/E-v-i-d-e-n-c-e">E v i d e n c e</a>
                  </h4>
                  <cite>By Chin-Sun Lee</cite>

                  <a className="overlay" href="/2023/12/fiction/E-v-i-d-e-n-c-e">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/fiction/from-Wings-of-Red">from Wings of Red</a>
                  </h4>
                  <cite>By James W. Jennings</cite>

                  <a className="overlay" href="/2023/12/fiction/from-Wings-of-Red">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Poetry</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Haleh-Liza-Gafori">Haleh Liza Gafori</a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Haleh-Liza-Gafori">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Cliff-Fyman">Cliff Fyman</a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Cliff-Fyman">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Mark-Hyatt">Mark Hyatt</a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Mark-Hyatt">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Jose-Padua">Jose Padua</a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Jose-Padua">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Rodger-Kamenetz">Rodger Kamenetz</a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Rodger-Kamenetz">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Jo-Barchi">Jo Barchi</a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Jo-Barchi">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Eleni-Sikelianos">Eleni Sikelianos</a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Eleni-Sikelianos">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Kimberly-Alidio-with-Irene-Hsu">Kimberly Alidio with Irene Hsu</a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Kimberly-Alidio-with-Irene-Hsu">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Carlos-Soto-Romns-11">Carlos Soto Rom&aacute;n&rsquo;s 11</a>
                  </h4>
                  <cite>By Judah Rubin</cite>

                  <a className="overlay" href="/2023/12/poetry/Carlos-Soto-Romns-11">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/rage-love-on-Patricia-Spears-Joness-The-Beloved-Community">
                      &ldquo;rage & love&rdquo;: on Patricia Spears Jones&rsquo;s The Beloved Community
                    </a>
                  </h4>
                  <cite>By Rona Cran</cite>

                  <a
                    className="overlay"
                    href="/2023/12/poetry/rage-love-on-Patricia-Spears-Joness-The-Beloved-Community"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Trying-to-Find-a-Place-to-Live-A-Two-Way-Interview-Conversation-by-Alexander-Dickow-and-Jay-Besemer">
                      Trying to Find a Place to Live: A Two-Way Interview Conversation by Alexander Dickow and Jay
                      Besemer
                    </a>
                  </h4>

                  <a
                    className="overlay"
                    href="/2023/12/poetry/Trying-to-Find-a-Place-to-Live-A-Two-Way-Interview-Conversation-by-Alexander-Dickow-and-Jay-Besemer"
                  >
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/poetry/Eleni-Sikelianos-with-Rosa-Alcal">
                      Eleni Sikelianos with Rosa Alcal&aacute;
                    </a>
                  </h4>

                  <a className="overlay" href="/2023/12/poetry/Eleni-Sikelianos-with-Rosa-Alcal">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Art Books</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/art_books/The-Best-Art-Books-of-2023">The Best Art Books of 2023</a>
                  </h4>
                  <cite></cite>

                  <a className="overlay" href="/2023/12/art_books/The-Best-Art-Books-of-2023">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/art_books/Louise-Nevelsons-Sculpture">Louise Nevelson&#146;s Sculpture</a>
                  </h4>
                  <cite>By Jennie Waldow</cite>

                  <a className="overlay" href="/2023/12/art_books/Louise-Nevelsons-Sculpture">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/art_books/Bindi-Voras-Mountain-of-Salt">Bindi Vora&#146;s Mountain of Salt</a>
                  </h4>
                  <cite>By Renee Hudson</cite>

                  <a className="overlay" href="/2023/12/art_books/Bindi-Voras-Mountain-of-Salt">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/art_books/Queer-Networks-Ray-Johnsons-Correspondence-Art">
                      Queer Networks: Ray Johnson&#146;s Correspondence Art
                    </a>
                  </h4>
                  <cite>By Phillip Griffith</cite>

                  <a className="overlay" href="/2023/12/art_books/Queer-Networks-Ray-Johnsons-Correspondence-Art">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/art_books/An-Indigenous-Present">An Indigenous Present</a>
                  </h4>
                  <cite>By Maymanah Farhat</cite>

                  <a className="overlay" href="/2023/12/art_books/An-Indigenous-Present">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>ArTonic</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/artonic/Franklin-Furnace">Franklin Furnace</a>
                  </h4>
                  <cite>By Megan N. Liberty</cite>

                  <a className="overlay" href="/2023/12/artonic/Franklin-Furnace">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Special Report</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/special-report/Field-Notes-from-a-Press-Preview-at-the-Met">
                      Field Notes from a Press Preview at the Met
                    </a>
                  </h4>
                  <cite>By Oliver Katz</cite>

                  <a className="overlay" href="/2023/12/special-report/Field-Notes-from-a-Press-Preview-at-the-Met">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Field Notes</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/field-notes/Gaza-An-Extreme-Militarization-of-the-Class-War">
                      Gaza: An Extreme Militarization of the Class War
                    </a>
                  </h4>
                  <cite>By E. Minassian</cite>

                  <a className="overlay" href="/2023/12/field-notes/Gaza-An-Extreme-Militarization-of-the-Class-War">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/field-notes/Phil-Neel-with-Komite-Part-II">Phil Neel with Komite (Part II)</a>
                  </h4>

                  <a className="overlay" href="/2023/12/field-notes/Phil-Neel-with-Komite-Part-II">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>The Miraculous</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/miraculous/56-Late-19th-Early-20th-Centuries-Aleppo">
                      56. Late 19th-Early 20th Centuries, Aleppo
                    </a>
                  </h4>
                  <cite>By Raphael Rubinstein</cite>

                  <a className="overlay" href="/2023/12/miraculous/56-Late-19th-Early-20th-Centuries-Aleppo">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/miraculous/57-20th-century-Cairo">57. 20th century, Cairo</a>
                  </h4>
                  <cite>By Raphael Rubinstein</cite>

                  <a className="overlay" href="/2023/12/miraculous/57-20th-century-Cairo">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/miraculous/58-1933-New-York-City">58. 1933, New York City</a>
                  </h4>
                  <cite>By Raphael Rubinstein</cite>

                  <a className="overlay" href="/2023/12/miraculous/58-1933-New-York-City">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/miraculous/59-1999-and-later-Weimar-Germany">
                      59. 1999 (and later), Weimar, Germany
                    </a>
                  </h4>
                  <cite>By Raphael Rubinstein</cite>

                  <a className="overlay" href="/2023/12/miraculous/59-1999-and-later-Weimar-Germany">
                    <span></span>
                  </a>
                </li>

                <li className="article ">
                  <h4>
                    <a href="/2023/12/miraculous/60-November-13-2015-Paris">60. November 13, 2015, Paris</a>
                  </h4>
                  <cite>By Raphael Rubinstein</cite>

                  <a className="overlay" href="/2023/12/miraculous/60-November-13-2015-Paris">
                    <span></span>
                  </a>
                </li>
              </ul>
              <h3>Art and Technology</h3>
              <ul>
                <li className="article ">
                  <h4>
                    <a href="/2023/12/art-technology/Speculative-Seeds-for-a-Vanishing-Point-An-Early-Modern-Encounter-for-our-Postmodern">
                      Speculative Seeds for a Vanishing Point: An Early Modern Encounter for our Postmodern
                    </a>
                  </h4>
                  <cite>By Charlotte Kent</cite>

                  <a
                    className="overlay"
                    href="/2023/12/art-technology/Speculative-Seeds-for-a-Vanishing-Point-An-Early-Modern-Encounter-for-our-Postmodern"
                  >
                    <span></span>
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </div>

      <div id="rail_popup">
        <div className="popup-overlay"></div>
        <div className="popup-frame">
          <div className="popup-close">
            <div>
              <span>Close</span> <i>&#215;</i>
            </div>
          </div>
          <div className="popup">
            <div className="head">
              Donate to the <em>Brooklyn Rail</em>
            </div>
            <div className="deck">
              <p>
                Help us raise <span>$200,000</span> to keep the <em>Rail</em> independent, relevant, and free!
              </p>
            </div>
            <div className="progress-bar">
              <div className="amt" style={{ width: "38%" }}>
                <span></span>
              </div>
            </div>
            <div className="text">
              <p>
                We&#8217;ve received{" "}
                <span>
                  $<span className="donation_amt">76,085</span>
                </span>{" "}
                from <span className="donation_count">179 donors</span>!
              </p>
            </div>

            <a className="btn btn-donate" href="/donate" title="Donate to the Brooklyn Rail">
              <span>Donate today</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Article
